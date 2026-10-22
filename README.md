# maipl — public site

The public-facing maipl site only: the landing page and every page it links to —
`/`, `/how-it-works`, `/use-cases`, `/pricing`, `/context-trap`, `/security`,
`/waitlist`, `/contact`. The signed-in platform (agent runs, connectors, admin)
is not part of this codebase.

Stack: TanStack Start (React 19, SSR) + Tailwind CSS v4 + Nitro. Deploys to
Vercel with zero configuration (Vercel auto-detects TanStack Start / Nitro).

## Structure

```
src/
  routes/            one file per URL (TanStack file-based routes)
  components/landing/  all page sections and visuals
  components/ui/       button + toaster primitives
  lib/                 pricing model, agent definitions, server functions
  assets/              logo and product screenshots
```

## Backend (optional but expected)

Two public features write to a database:

- **Waitlist** (`/waitlist`) — inserts into `waitlist`.
- **Are you in a Context Trap?** (homepage + `/context-trap`) — inserts into
  `context_trap_submissions` and reads aggregated stats.

Point them at any Supabase project by setting these environment variables in
your host (see `.env.example`):

```
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
```

Without them the site still builds and renders: the Context Trap stats show as
empty, and submissions/waitlist signups return a clear "backend not configured"
error. Create the tables once with:

```sql
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  company text,
  note text,
  linkedin_url text,
  created_at timestamptz not null default now()
);
create unique index if not exists waitlist_email_key on public.waitlist (email);

create table if not exists public.context_trap_submissions (
  id uuid primary key default gen_random_uuid(),
  sources text[] not null,
  label text not null,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;
alter table public.context_trap_submissions enable row level security;

create policy "Anyone can join waitlist" on public.waitlist
  for insert to anon, authenticated with check (
    char_length(email) between 3 and 255
    and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and (name is null or char_length(name) <= 100)
    and (company is null or char_length(company) <= 100)
    and (note is null or char_length(note) <= 1000)
    and linkedin_url is not null and char_length(linkedin_url) <= 255
    and linkedin_url ~ '^https?://(www\.)?linkedin\.com/(in|company)/[A-Za-z0-9_\-%-]+/?$'
  );

create policy "anyone can submit context trap answers"
  on public.context_trap_submissions for insert to anon, authenticated
  with check (true);

grant insert on public.waitlist to anon, authenticated;
grant insert on public.context_trap_submissions to anon, authenticated;

create or replace function public.context_trap_stats()
returns jsonb language sql stable security definer
set search_path to 'public'
as $$
  select jsonb_build_object(
    'total', (select count(*) from public.context_trap_submissions),
    'sources', coalesce((
      select jsonb_object_agg(s.source, s.n) from (
        select unnest(sources) as source, count(*) as n
        from public.context_trap_submissions group by 1
      ) s
    ), '{}'::jsonb),
    'labels', coalesce((
      select jsonb_object_agg(l.label, l.n) from (
        select label, count(*) as n
        from public.context_trap_submissions group by 1
      ) l
    ), '{}'::jsonb)
  )
$$;

grant execute on function public.context_trap_stats() to anon, authenticated;
```

## Develop

```
bun install     # or npm install / pnpm install
bun run dev     # http://localhost:3000
bun run build   # production build (Nitro output in .output/)
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, import the repository — the TanStack Start preset is detected
   automatically; no build settings are needed.
3. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` under Settings →
   Environment Variables, then redeploy.
4. Add your custom domain under Settings → Domains.

## Notes

- The waitlist confirmation/notification email flow lives in the main product
  codebase; this export stores signups in the database only.
- The platform sign-in links were removed from the exported waitlist page; the
  platform is deployed separately.
- `src/routeTree.gen.ts` is generated on first `dev`/`build` — it is not committed.
