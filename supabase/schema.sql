-- Sydney trip planner: shared data behind a trip code.
-- Tables are closed to the API (RLS on, no policies, grants revoked); every read and
-- write goes through a SECURITY DEFINER function that checks the trip code first.

create extension if not exists pgcrypto with schema extensions;

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code_hash text not null,
  created_at timestamptz not null default now()
);

create table public.trip_checklist (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  category text not null default '기타',
  label text not null check (char_length(label) between 1 and 200),
  done boolean not null default false,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table public.trip_expenses (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  day int not null check (day between 0 and 30),
  category text not null,
  title text not null check (char_length(title) between 1 and 200),
  amount_aud numeric(10,2) not null check (amount_aud >= 0 and amount_aud < 100000),
  paid_by text,
  created_at timestamptz not null default now()
);

create table public.trip_progress (
  trip_id uuid not null references public.trips(id) on delete cascade,
  item_key text not null,
  done boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (trip_id, item_key)
);

create table public.trip_notes (
  trip_id uuid not null references public.trips(id) on delete cascade,
  day int not null check (day between 0 and 30),
  body text not null default '' check (char_length(body) <= 5000),
  updated_at timestamptz not null default now(),
  primary key (trip_id, day)
);

create index on public.trip_checklist (trip_id);
create index on public.trip_expenses (trip_id);

alter table public.trips enable row level security;
alter table public.trip_checklist enable row level security;
alter table public.trip_expenses enable row level security;
alter table public.trip_progress enable row level security;
alter table public.trip_notes enable row level security;
revoke all on public.trips, public.trip_checklist, public.trip_expenses, public.trip_progress, public.trip_notes from anon, authenticated;

create function public._trip_id(p_code text) returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare v uuid;
begin
  select id into v from public.trips
   where code_hash = extensions.crypt(coalesce(p_code, ''), code_hash);
  if v is null then
    raise exception 'invalid trip code' using errcode = '28000';
  end if;
  return v;
end $$;
revoke all on function public._trip_id(text) from public, anon, authenticated;

create function public.trip_load(p_code text) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare t uuid := public._trip_id(p_code);
begin
  return jsonb_build_object(
    'name', (select name from public.trips where id = t),
    'checklist', coalesce((select jsonb_agg(c order by c.category, c.sort, c.created_at)
                           from public.trip_checklist c where c.trip_id = t), '[]'),
    'expenses', coalesce((select jsonb_agg(e order by e.day, e.created_at)
                          from public.trip_expenses e where e.trip_id = t), '[]'),
    'progress', coalesce((select jsonb_object_agg(p.item_key, p.done)
                          from public.trip_progress p where p.trip_id = t), '{}'),
    'notes', coalesce((select jsonb_object_agg(n.day::text, n.body)
                       from public.trip_notes n where n.trip_id = t), '{}'));
end $$;

create function public.trip_checklist_add(p_code text, p_category text, p_label text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare t uuid := public._trip_id(p_code); r public.trip_checklist;
begin
  insert into public.trip_checklist (trip_id, category, label, sort)
  values (t, left(coalesce(nullif(trim(p_category), ''), '기타'), 40), trim(p_label),
          (select coalesce(max(sort), 0) + 1 from public.trip_checklist where trip_id = t))
  returning * into r;
  return to_jsonb(r);
end $$;

create function public.trip_checklist_toggle(p_code text, p_id uuid, p_done boolean) returns void
language plpgsql security definer set search_path = '' as $$
declare t uuid := public._trip_id(p_code);
begin
  update public.trip_checklist set done = p_done where id = p_id and trip_id = t;
end $$;

create function public.trip_checklist_delete(p_code text, p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare t uuid := public._trip_id(p_code);
begin
  delete from public.trip_checklist where id = p_id and trip_id = t;
end $$;

create function public.trip_expense_add(p_code text, p_day int, p_category text, p_title text,
                                        p_amount numeric, p_paid_by text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare t uuid := public._trip_id(p_code); r public.trip_expenses;
begin
  insert into public.trip_expenses (trip_id, day, category, title, amount_aud, paid_by)
  values (t, p_day, left(p_category, 40), trim(p_title), p_amount, left(nullif(trim(p_paid_by), ''), 40))
  returning * into r;
  return to_jsonb(r);
end $$;

create function public.trip_expense_delete(p_code text, p_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare t uuid := public._trip_id(p_code);
begin
  delete from public.trip_expenses where id = p_id and trip_id = t;
end $$;

create function public.trip_progress_set(p_code text, p_key text, p_done boolean) returns void
language plpgsql security definer set search_path = '' as $$
declare t uuid := public._trip_id(p_code);
begin
  insert into public.trip_progress (trip_id, item_key, done, updated_at)
  values (t, left(p_key, 80), p_done, now())
  on conflict (trip_id, item_key) do update set done = excluded.done, updated_at = now();
end $$;

create function public.trip_note_set(p_code text, p_day int, p_body text) returns void
language plpgsql security definer set search_path = '' as $$
declare t uuid := public._trip_id(p_code);
begin
  insert into public.trip_notes (trip_id, day, body, updated_at)
  values (t, p_day, p_body, now())
  on conflict (trip_id, day) do update set body = excluded.body, updated_at = now();
end $$;

revoke all on function public.trip_load(text),
  public.trip_checklist_add(text,text,text), public.trip_checklist_toggle(text,uuid,boolean),
  public.trip_checklist_delete(text,uuid), public.trip_expense_add(text,int,text,text,numeric,text),
  public.trip_expense_delete(text,uuid), public.trip_progress_set(text,text,boolean),
  public.trip_note_set(text,int,text) from public;
grant execute on function public.trip_load(text),
  public.trip_checklist_add(text,text,text), public.trip_checklist_toggle(text,uuid,boolean),
  public.trip_checklist_delete(text,uuid), public.trip_expense_add(text,int,text,text,numeric,text),
  public.trip_expense_delete(text,uuid), public.trip_progress_set(text,text,boolean),
  public.trip_note_set(text,int,text) to anon, authenticated;
