-- Admin role + RLS lockdown.
-- Adds is_admin to profiles, a SECURITY DEFINER helper so RLS policies
-- can check admin status without recursing through profiles RLS, and
-- rewrites write policies on deals + deal-images so only admins can
-- insert/update/delete. Public SELECT stays public.

-- 1. Admin flag on profiles
alter table public.profiles
  add column if not exists is_admin boolean not null default false;

-- 2. Helper for RLS policies
create or replace function public.is_admin_user()
returns boolean
language sql
security definer
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;
grant execute on function public.is_admin_user() to authenticated;

-- 3. Seed the first admin. auth.users already contains the user record.
insert into public.profiles (id, email, is_admin)
select u.id, u.email, true
from auth.users u
where u.email = 'sruligutter@gmail.com'
on conflict (id) do update set is_admin = true;

-- 4. Replace deals write policies (SELECT stays public)
drop policy if exists "auth insert" on public.deals;
drop policy if exists "auth update" on public.deals;
drop policy if exists "auth delete" on public.deals;

create policy "admin insert" on public.deals
  for insert to authenticated
  with check (public.is_admin_user());
create policy "admin update" on public.deals
  for update to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());
create policy "admin delete" on public.deals
  for delete to authenticated
  using (public.is_admin_user());

-- 5. Same treatment for deal-images storage (public read stays)
drop policy if exists "deal-images auth insert" on storage.objects;
drop policy if exists "deal-images auth update" on storage.objects;
drop policy if exists "deal-images auth delete" on storage.objects;

create policy "deal-images admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'deal-images' and public.is_admin_user());
create policy "deal-images admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'deal-images' and public.is_admin_user())
  with check (bucket_id = 'deal-images' and public.is_admin_user());
create policy "deal-images admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'deal-images' and public.is_admin_user());
