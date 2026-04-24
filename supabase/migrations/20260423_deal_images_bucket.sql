-- Public storage bucket for deal images. Admin uploads via the panel;
-- the public site reads via the public CDN URL.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'deal-images',
  'deal-images',
  true,
  10485760,
  array['image/jpeg','image/png','image/webp','image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Policies on storage.objects for this bucket.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'deal-images public read'
  ) then
    create policy "deal-images public read" on storage.objects
      for select to public
      using (bucket_id = 'deal-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'deal-images auth insert'
  ) then
    create policy "deal-images auth insert" on storage.objects
      for insert to authenticated
      with check (bucket_id = 'deal-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'deal-images auth update'
  ) then
    create policy "deal-images auth update" on storage.objects
      for update to authenticated
      using (bucket_id = 'deal-images')
      with check (bucket_id = 'deal-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'deal-images auth delete'
  ) then
    create policy "deal-images auth delete" on storage.objects
      for delete to authenticated
      using (bucket_id = 'deal-images');
  end if;
end $$;
