-- ServiceFlow core schema
create extension if not exists "pgcrypto";

create type app_role as enum ('owner','manager','staff');
create type lead_status as enum ('new','contacted','interested','quoted','follow_up','converted','lost');
create type case_status as enum ('new','contacted','waiting_client','quoted','invoice_sent','payment_pending','in_progress','submitted','waiting_response','completed','cancelled','lost');
create type task_status as enum ('pending','in_progress','done','cancelled');
create type priority_level as enum ('low','medium','high','urgent');
create type document_required_status as enum ('required','received','approved','rejected');
create type invoice_status as enum ('not_created','draft','sent','viewed','paid','overdue','cancelled');
create type created_mode as enum ('auto','manual');

create table if not exists organizations (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, phone text, email text, address text, currency text not null default 'USD', created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists profiles (id uuid primary key references auth.users(id) on delete cascade, organization_id uuid not null references organizations(id) on delete cascade, full_name text not null, role app_role not null default 'staff', phone text, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists leads (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, full_name text not null, phone text not null, whatsapp text, email text, company_name text, nationality text, id_number text, passport_number text, source text, interested_service text, assigned_staff_id uuid references profiles(id), priority priority_level not null default 'medium', follow_up_date date, status lead_status not null default 'new', notes text, created_by uuid not null references profiles(id), converted_client_id uuid, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists clients (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, full_name text not null, phone text not null, whatsapp text, email text, company_name text, nationality text, id_number text, passport_number text, notes text, assigned_staff_id uuid references profiles(id), created_from_lead_id uuid references leads(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists services (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, name text not null, category text, default_price numeric(12,2), estimated_duration_days integer, requires_documents boolean not null default false, active boolean not null default true, notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists service_cases (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, client_id uuid not null references clients(id), service_id uuid references services(id), assigned_staff_id uuid references profiles(id), priority priority_level not null default 'medium', status case_status not null default 'new', follow_up_date date, start_date date, due_date date, quoted_amount numeric(12,2), expected_cost numeric(12,2), invoice_mode created_mode not null default 'manual', invoice_number text, invoice_amount numeric(12,2), auto_invoice_created boolean not null default false, payment_status text not null default 'unpaid', progress_notes text, last_contacted_at timestamptz, next_action text, created_by uuid not null references profiles(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists case_notes (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, case_id uuid references service_cases(id), client_id uuid references clients(id), lead_id uuid references leads(id), note text not null, note_type text, created_by uuid not null references profiles(id), created_at timestamptz not null default now());
create table if not exists activities (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, entity_type text not null, entity_id uuid not null, action_type text not null, message text not null, created_by uuid not null references profiles(id), created_at timestamptz not null default now());
create table if not exists tasks (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, title text not null, assigned_to uuid references profiles(id), linked_entity_type text, linked_entity_id uuid, due_date date, priority priority_level not null default 'medium', status task_status not null default 'pending', notes text, created_by uuid not null references profiles(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists documents (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, client_id uuid references clients(id), case_id uuid references service_cases(id), document_type text not null, file_url text, required_status document_required_status not null default 'required', uploaded_by uuid references profiles(id), uploaded_at timestamptz, notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists invoices (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, case_id uuid references service_cases(id), client_id uuid references clients(id), invoice_number text not null, amount numeric(12,2) not null default 0, tax_amount numeric(12,2) not null default 0, discount_amount numeric(12,2) not null default 0, total_amount numeric(12,2) not null default 0, due_date date, issue_date date, created_mode created_mode not null default 'manual', file_url text, status invoice_status not null default 'draft', notes text, created_by uuid not null references profiles(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists payments (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, case_id uuid references service_cases(id), client_id uuid references clients(id), invoice_id uuid references invoices(id), amount numeric(12,2) not null, payment_date date not null default current_date, payment_method text, reference text, recorded_by uuid not null references profiles(id), notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists service_requirements (id uuid primary key default gen_random_uuid(), organization_id uuid not null references organizations(id) on delete cascade, service_id uuid not null references services(id) on delete cascade, requirement_name text not null, required boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
alter table leads add constraint leads_converted_client_fk foreign key (converted_client_id) references clients(id);

create or replace function current_organization_id() returns uuid language sql stable security definer set search_path=public as $$ select organization_id from profiles where id = auth.uid(); $$;
create or replace function current_user_role() returns app_role language sql stable security definer set search_path=public as $$ select role from profiles where id = auth.uid(); $$;
create or replace function is_owner_or_manager() returns boolean language sql stable security definer set search_path=public as $$ select coalesce(current_user_role() in ('owner','manager'), false); $$;

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table leads enable row level security;
alter table clients enable row level security;
alter table services enable row level security;
alter table service_cases enable row level security;
alter table case_notes enable row level security;
alter table activities enable row level security;
alter table tasks enable row level security;
alter table documents enable row level security;
alter table invoices enable row level security;
alter table payments enable row level security;
alter table service_requirements enable row level security;

create policy org_select_profiles on profiles for select using (organization_id = current_organization_id());
create policy org_update_profiles on profiles for update using (id = auth.uid() or is_owner_or_manager());
create policy org_access_organizations on organizations for select using (id = current_organization_id());
create policy org_update_organizations on organizations for update using (id = current_organization_id() and current_user_role() = 'owner');
create policy org_select_leads on leads for select using (organization_id = current_organization_id());
create policy org_write_leads on leads for all using (organization_id = current_organization_id() and (is_owner_or_manager() or assigned_staff_id = auth.uid() or created_by = auth.uid())) with check (organization_id = current_organization_id());
create policy org_scoped_clients on clients for all using (organization_id = current_organization_id()) with check (organization_id = current_organization_id());
create policy org_scoped_services on services for all using (organization_id = current_organization_id()) with check (organization_id = current_organization_id());
create policy org_scoped_cases on service_cases for all using (organization_id = current_organization_id() and (is_owner_or_manager() or assigned_staff_id = auth.uid() or created_by = auth.uid())) with check (organization_id = current_organization_id());
create policy org_scoped_case_notes on case_notes for all using (organization_id = current_organization_id()) with check (organization_id = current_organization_id());
create policy org_scoped_activities on activities for all using (organization_id = current_organization_id()) with check (organization_id = current_organization_id());
create policy org_scoped_tasks on tasks for all using (organization_id = current_organization_id() and (is_owner_or_manager() or assigned_to = auth.uid() or created_by = auth.uid())) with check (organization_id = current_organization_id());
create policy org_scoped_documents on documents for all using (organization_id = current_organization_id()) with check (organization_id = current_organization_id());
create policy org_scoped_invoices on invoices for all using (organization_id = current_organization_id()) with check (organization_id = current_organization_id());
create policy org_scoped_payments on payments for all using (organization_id = current_organization_id()) with check (organization_id = current_organization_id());
create policy org_scoped_requirements on service_requirements for all using (organization_id = current_organization_id()) with check (organization_id = current_organization_id());
