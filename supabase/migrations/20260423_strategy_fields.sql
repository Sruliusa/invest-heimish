-- Strategy + property-type structure for deals
-- Adds a strategy enum (tenants | light | heavy) plus the strategy-specific
-- numeric columns. Property type stays a free-text column but the admin UI
-- constrains it to a fixed list.

alter table public.deals
  add column if not exists strategy text
    check (strategy in ('tenants', 'light', 'heavy')),
  add column if not exists monthly_expenses numeric,
  add column if not exists current_rent numeric,
  add column if not exists resale_price numeric;
