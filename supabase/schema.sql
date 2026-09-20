-- ASHBRA Platform Database Schema
-- Run this in Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom types
CREATE TYPE user_role AS ENUM ('community', 'volunteer', 'partner', 'admin');
CREATE TYPE user_status AS ENUM ('pending', 'active', 'inactive', 'suspended');
CREATE TYPE service_category AS ENUM ('documentacao', 'emprego', 'educacao', 'social', 'saude', 'juridico', 'cultural', 'outros');
CREATE TYPE job_type AS ENUM ('clt', 'pj', 'estagio', 'aprendiz', 'freelance', 'temporario');
CREATE TYPE work_mode AS ENUM ('presencial', 'remoto', 'hibrido');
CREATE TYPE course_modality AS ENUM ('presencial', 'online', 'hibrido');
CREATE TYPE course_level AS ENUM ('basico', 'intermediario', 'avancado', 'tecnico', 'superior', 'pos-graduacao');
CREATE TYPE event_category AS ENUM ('cultural', 'educativo', 'social', 'esportivo', 'capacitacao', 'networking', 'outros');
CREATE TYPE document_type AS ENUM ('guia', 'formulario', 'lei', 'decreto', 'manual', 'cartilha', 'modelo', 'outros');
CREATE TYPE announcement_priority AS ENUM ('baixa', 'normal', 'alta', 'urgente');
CREATE TYPE application_status AS ENUM ('pendente', 'em_analise', 'aprovado', 'rejeitado', 'cancelado');
CREATE TYPE enrollment_status AS ENUM ('pendente', 'confirmado', 'em_andamento', 'concluido', 'cancelado', 'trancado');
CREATE TYPE registration_status AS ENUM ('confirmado', 'lista_espera', 'cancelado', 'compareceu', 'nao_compareceu');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  cpf TEXT UNIQUE,
  phone TEXT,
  birth_date DATE,
  nationality TEXT DEFAULT 'Haitiana',
  address TEXT,
  city TEXT DEFAULT 'Curitiba',
  state TEXT DEFAULT 'PR',
  zip_code TEXT,
  education_level TEXT,
  profession TEXT,
  skills TEXT[],
  bio TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'community',
  status user_status NOT NULL DEFAULT 'pending',
  email_notifications BOOLEAN DEFAULT true,
  whatsapp_notifications BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX profiles_user_id_idx ON public.profiles(user_id);
CREATE INDEX profiles_role_idx ON public.profiles(role);
CREATE INDEX profiles_status_idx ON public.profiles(status);

-- Services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category service_category NOT NULL,
  icon TEXT,
  image_url TEXT,
  requirements TEXT[],
  how_to_access TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX services_category_idx ON public.services(category);
CREATE INDEX services_is_active_idx ON public.services(is_active);
CREATE INDEX services_is_featured_idx ON public.services(is_featured);
CREATE INDEX services_order_idx ON public.services(order_index);

-- Jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[],
  salary_range TEXT,
  job_type job_type NOT NULL,
  work_mode work_mode NOT NULL,
  location TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  application_url TEXT,
  application_deadline TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX jobs_is_active_idx ON public.jobs(is_active);
CREATE INDEX jobs_is_featured_idx ON public.jobs(is_featured);
CREATE INDEX jobs_job_type_idx ON public.jobs(job_type);
CREATE INDEX jobs_work_mode_idx ON public.jobs(work_mode);
CREATE INDEX jobs_location_idx ON public.jobs(location);
CREATE INDEX jobs_order_idx ON public.jobs(order_index);
CREATE INDEX jobs_deadline_idx ON public.jobs(application_deadline);

-- Courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  institution TEXT NOT NULL,
  instructor TEXT,
  duration_hours INTEGER,
  modality course_modality NOT NULL,
  level course_level NOT NULL,
  prerequisites TEXT[],
  syllabus TEXT,
  certificate BOOLEAN DEFAULT false,
  cost NUMERIC(10,2),
  currency TEXT DEFAULT 'BRL',
  start_date DATE,
  end_date DATE,
  enrollment_deadline TIMESTAMPTZ,
  max_students INTEGER,
  image_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  enrollment_url TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX courses_is_active_idx ON public.courses(is_active);
CREATE INDEX courses_is_featured_idx ON public.courses(is_featured);
CREATE INDEX courses_category_idx ON public.courses(category);
CREATE INDEX courses_modality_idx ON public.courses(modality);
CREATE INDEX courses_level_idx ON public.courses(level);
CREATE INDEX courses_order_idx ON public.courses(order_index);
CREATE INDEX courses_dates_idx ON public.courses(start_date, end_date);

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category event_category NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  location TEXT,
  address TEXT,
  online_url TEXT,
  max_attendees INTEGER,
  image_url TEXT,
  organizer TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  registration_url TEXT,
  registration_deadline TIMESTAMPTZ,
  is_free BOOLEAN DEFAULT true,
  cost NUMERIC(10,2),
  currency TEXT DEFAULT 'BRL',
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX events_is_active_idx ON public.events(is_active);
CREATE INDEX events_is_featured_idx ON public.events(is_featured);
CREATE INDEX events_category_idx ON public.events(category);
CREATE INDEX events_dates_idx ON public.events(start_date, end_date);
CREATE INDEX events_order_idx ON public.events(order_index);

-- Documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  document_type document_type NOT NULL,
  file_url TEXT,
  external_url TEXT,
  language TEXT DEFAULT 'pt-BR',
  version TEXT,
  issuing_authority TEXT,
  valid_from DATE,
  valid_until DATE,
  tags TEXT[],
  is_public BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX documents_is_active_idx ON public.documents(is_active);
CREATE INDEX documents_is_public_idx ON public.documents(is_public);
CREATE INDEX documents_category_idx ON public.documents(category);
CREATE INDEX documents_type_idx ON public.documents(document_type);
CREATE INDEX documents_order_idx ON public.documents(order_index);

-- User-Service requests
CREATE TABLE public.user_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  status application_status NOT NULL DEFAULT 'pendente',
  notes TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, service_id)
);

CREATE INDEX user_services_user_idx ON public.user_services(user_id);
CREATE INDEX user_services_service_idx ON public.user_services(service_id);
CREATE INDEX user_services_status_idx ON public.user_services(status);

-- User-Job applications
CREATE TABLE public.user_job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  status application_status NOT NULL DEFAULT 'pendente',
  cover_letter TEXT,
  cv_url TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

CREATE INDEX user_job_applications_user_idx ON public.user_job_applications(user_id);
CREATE INDEX user_job_applications_job_idx ON public.user_job_applications(job_id);
CREATE INDEX user_job_applications_status_idx ON public.user_job_applications(status);

-- User-Course enrollments
CREATE TABLE public.user_course_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status enrollment_status NOT NULL DEFAULT 'pendente',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX user_course_enrollments_user_idx ON public.user_course_enrollments(user_id);
CREATE INDEX user_course_enrollments_course_idx ON public.user_course_enrollments(course_id);
CREATE INDEX user_course_enrollments_status_idx ON public.user_course_enrollments(status);

-- User-Event registrations
CREATE TABLE public.user_event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  status registration_status NOT NULL DEFAULT 'confirmado',
  attended BOOLEAN DEFAULT false,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

CREATE INDEX user_event_registrations_user_idx ON public.user_event_registrations(user_id);
CREATE INDEX user_event_registrations_event_idx ON public.user_event_registrations(event_id);
CREATE INDEX user_event_registrations_status_idx ON public.user_event_registrations(status);

-- Announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  priority announcement_priority NOT NULL DEFAULT 'normal',
  target_audience user_role[] NOT NULL DEFAULT '{"community", "volunteer", "partner"}',
  image_url TEXT,
  link_url TEXT,
  link_text TEXT,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX announcements_is_active_idx ON public.announcements(is_active);
CREATE INDEX announcements_priority_idx ON public.announcements(priority);
CREATE INDEX announcements_published_idx ON public.announcements(published_at);
CREATE INDEX announcements_target_idx ON public.announcements USING GIN(target_audience);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX testimonials_approved_idx ON public.testimonials(is_approved);
CREATE INDEX testimonials_featured_idx ON public.testimonials(is_featured);
CREATE INDEX testimonials_order_idx ON public.testimonials(order_index);

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Allow profile creation during signup" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read policies for content tables
CREATE POLICY "Public can view active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active jobs" ON public.jobs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active courses" ON public.courses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active events" ON public.events
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view public documents" ON public.documents
  FOR SELECT USING (is_active = true AND is_public = true);

CREATE POLICY "Public can view active announcements" ON public.announcements
  FOR SELECT USING (is_active = true AND (published_at IS NULL OR published_at <= NOW()) AND (expires_at IS NULL OR expires_at >= NOW()));

CREATE POLICY "Public can view approved testimonials" ON public.testimonials
  FOR SELECT USING (is_approved = true);

-- User-specific policies
CREATE POLICY "Users can view own service requests" ON public.user_services
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create service requests" ON public.user_services
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view own job applications" ON public.user_job_applications
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can apply to jobs" ON public.user_job_applications
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view own course enrollments" ON public.user_course_enrollments
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can enroll in courses" ON public.user_course_enrollments
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view own event registrations" ON public.user_event_registrations
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can register for events" ON public.user_event_registrations
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

-- Admin policies for content management
CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage jobs" ON public.jobs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage courses" ON public.courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage events" ON public.events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage documents" ON public.documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage announcements" ON public.announcements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

-- Volunteer/Partner policies (can view more data)
CREATE POLICY "Volunteers and partners can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid() AND p.role IN ('volunteer', 'partner', 'admin')
    )
  );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_services_updated_at BEFORE UPDATE ON public.user_services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_job_applications_updated_at BEFORE UPDATE ON public.user_job_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_course_enrollments_updated_at BEFORE UPDATE ON public.user_course_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_event_registrations_updated_at BEFORE UPDATE ON public.user_event_registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role, status)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'community', 'pending');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage buckets (run in Supabase Dashboard > Storage)
-- INSERT INTO storage.buckets (id, name, public) VALUES 
--   ('avatars', 'avatars', true),
--   ('documents', 'documents', false),
--   ('course-materials', 'course-materials', false),
--   ('event-images', 'event-images', true),
--   ('service-images', 'service-images', true),
--   ('job-documents', 'job-documents', false);

-- Sample data for testing (optional)
-- INSERT INTO public.services (title, description, category, how_to_access, contact_email, contact_phone, is_featured, order_index) VALUES
--   ('Regularização de Documentos', 'Auxílio na emissão e renovação de CPF, Carteira de Trabalho, RNE, passaporte e outros documentos', 'documentacao', 'Agende atendimento presencial na sede da ASHBRA ou pelo WhatsApp', 'documentos@ashbra.org.br', '(41) 99813-6033', true, 1),
--   ('Encaminhamento para Vagas de Emprego', 'Intermediação com empresas parceiras para contratação de imigrantes', 'emprego', 'Cadastre-se na plataforma e candidate-se às vagas disponíveis', 'empregos@ashbra.org.br', '(41) 99813-6033', true, 2),
--   ('Cursos de Português para Imigrantes', 'Aulas de português instrumental focadas no mercado de trabalho', 'educacao', 'Inscrições abertas periodicamente. Verifique a seção de cursos.', 'cursos@ashbra.org.br', '(41) 99813-6033', true, 3);