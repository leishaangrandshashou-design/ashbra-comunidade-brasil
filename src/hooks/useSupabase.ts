import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Service = Tables<'services'>;
type ServiceInsert = TablesInsert<'services'>;
type ServiceUpdate = TablesUpdate<'services'>;

type Job = Tables<'jobs'>;
type JobInsert = TablesInsert<'jobs'>;
type JobUpdate = TablesUpdate<'jobs'>;

type Course = Tables<'courses'>;
type CourseInsert = TablesInsert<'courses'>;
type CourseUpdate = TablesUpdate<'courses'>;

type Event = Tables<'events'>;
type EventInsert = TablesInsert<'events'>;
type EventUpdate = TablesUpdate<'events'>;

type Document = Tables<'documents'>;
type DocumentInsert = TablesInsert<'documents'>;
type DocumentUpdate = TablesUpdate<'documents'>;

type Profile = Tables<'profiles'>;
type ProfileInsert = TablesInsert<'profiles'>;
type ProfileUpdate = TablesUpdate<'profiles'>;

type Announcement = Tables<'announcements'>;
type AnnouncementInsert = TablesInsert<'announcements'>;
type AnnouncementUpdate = TablesUpdate<'announcements'>;

type Testimonial = Tables<'testimonials'>;
type TestimonialInsert = TablesInsert<'testimonials'>;
type TestimonialUpdate = TablesUpdate<'testimonials'>;

type UserService = Tables<'user_services'>;
type UserServiceInsert = TablesInsert<'user_services'>;

type UserJobApplication = Tables<'user_job_applications'>;
type UserJobApplicationInsert = TablesInsert<'user_job_applications'>;

type UserCourseEnrollment = Tables<'user_course_enrollments'>;
type UserCourseEnrollmentInsert = TablesInsert<'user_course_enrollments'>;

type UserEventRegistration = Tables<'user_event_registrations'>;
type UserEventRegistrationInsert = TablesInsert<'user_event_registrations'>;

export function useServices(category?: string, featured?: boolean) {
  return useQuery({
    queryKey: ['services', category, featured],
    queryFn: async () => {
      let query = supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }
      if (featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Service[];
    },
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Service;
    },
    enabled: !!id,
  });
}

export function useJobs(filters?: {
  job_type?: string;
  work_mode?: string;
  location?: string;
  featured?: boolean;
}) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (filters?.job_type) {
        query = query.eq('job_type', filters.job_type);
      }
      if (filters?.work_mode) {
        query = query.eq('work_mode', filters.work_mode);
      }
      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Job[];
    },
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Job;
    },
    enabled: !!id,
  });
}

export function useCourses(filters?: {
  category?: string;
  modality?: string;
  level?: string;
  featured?: boolean;
}) {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      let query = supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.modality) {
        query = query.eq('modality', filters.modality);
      }
      if (filters?.level) {
        query = query.eq('level', filters.level);
      }
      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Course[];
    },
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Course;
    },
    enabled: !!id,
  });
}

export function useEvents(filters?: {
  category?: string;
  featured?: boolean;
  upcoming?: boolean;
}) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('start_date', { ascending: true });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }
      if (filters?.upcoming) {
        query = query.gte('start_date', new Date().toISOString().split('T')[0]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Event[];
    },
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Event;
    },
    enabled: !!id,
  });
}

export function useDocuments(category?: string) {
  return useQuery({
    queryKey: ['documents', category],
    queryFn: async () => {
      let query = supabase
        .from('documents')
        .select('*')
        .eq('is_active', true)
        .eq('is_public', true)
        .order('order_index', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Document[];
    },
  });
}

export function useAnnouncements(targetAudience?: string[]) {
  return useQuery({
    queryKey: ['announcements', targetAudience],
    queryFn: async () => {
      let query = supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('is_pinned', { ascending: false })
        .order('priority', { ascending: false })
        .order('published_at', { ascending: false });

      if (targetAudience && targetAudience.length > 0) {
        query = query.overlaps('target_audience', targetAudience);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Announcement[];
    },
  });
}

export function useTestimonials(featured?: boolean) {
  return useQuery({
    queryKey: ['testimonials', featured],
    queryFn: async () => {
      let query = supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('order_index', { ascending: true });

      if (featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Testimonial[];
    },
  });
}

export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data as Profile | null;
    },
    enabled: !!userId,
  });
}

export function useUserServices(userId?: string) {
  return useQuery({
    queryKey: ['user-services', userId],
    queryFn: async () => {
      if (!userId) return [];
      const profile = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (!profile.data) return [];

      const { data, error } = await supabase
        .from('user_services')
        .select(`
          *,
          services (*)
        `)
        .eq('user_id', profile.data.id);
      if (error) throw error;
      return data as (UserService & { services: Service })[];
    },
    enabled: !!userId,
  });
}

export function useUserJobApplications(userId?: string) {
  return useQuery({
    queryKey: ['user-job-applications', userId],
    queryFn: async () => {
      if (!userId) return [];
      const profile = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (!profile.data) return [];

      const { data, error } = await supabase
        .from('user_job_applications')
        .select(`
          *,
          jobs (*)
        `)
        .eq('user_id', profile.data.id);
      if (error) throw error;
      return data as (UserJobApplication & { jobs: Job })[];
    },
    enabled: !!userId,
  });
}

export function useUserCourseEnrollments(userId?: string) {
  return useQuery({
    queryKey: ['user-course-enrollments', userId],
    queryFn: async () => {
      if (!userId) return [];
      const profile = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (!profile.data) return [];

      const { data, error } = await supabase
        .from('user_course_enrollments')
        .select(`
          *,
          courses (*)
        `)
        .eq('user_id', profile.data.id);
      if (error) throw error;
      return data as (UserCourseEnrollment & { courses: Course })[];
    },
    enabled: !!userId,
  });
}

export function useUserEventRegistrations(userId?: string) {
  return useQuery({
    queryKey: ['user-event-registrations', userId],
    queryFn: async () => {
      if (!userId) return [];
      const profile = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (!profile.data) return [];

      const { data, error } = await supabase
        .from('user_event_registrations')
        .select(`
          *,
          events (*)
        `)
        .eq('user_id', profile.data.id);
      if (error) throw error;
      return data as (UserEventRegistration & { events: Event })[];
    },
    enabled: !!userId,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (service: ServiceInsert) => {
      const { data, error } = await supabase
        .from('services')
        .insert(service)
        .select()
        .single();
      if (error) throw error;
      return data as Service;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Serviço criado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar serviço', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ServiceUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Service;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Serviço atualizado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar serviço', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Serviço excluído com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao excluir serviço', description: error.message, variant: 'destructive' });
    },
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (job: JobInsert) => {
      const { data, error } = await supabase
        .from('jobs')
        .insert(job)
        .select()
        .single();
      if (error) throw error;
      return data as Job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Vaga criada com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar vaga', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: JobUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Vaga atualizada com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar vaga', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Vaga excluída com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao excluir vaga', description: error.message, variant: 'destructive' });
    },
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (course: CourseInsert) => {
      const { data, error } = await supabase
        .from('courses')
        .insert(course)
        .select()
        .single();
      if (error) throw error;
      return data as Course;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Curso criado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar curso', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: CourseUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Course;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Curso atualizado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar curso', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: 'Curso excluído com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao excluir curso', description: error.message, variant: 'destructive' });
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (event: EventInsert) => {
      const { data, error } = await supabase
        .from('events')
        .insert(event)
        .select()
        .single();
      if (error) throw error;
      return data as Event;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Evento criado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar evento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: EventUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Event;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Evento atualizado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar evento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Evento excluído com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao excluir evento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useRequestService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (request: UserServiceInsert) => {
      const { data, error } = await supabase
        .from('user_services')
        .insert(request)
        .select()
        .single();
      if (error) throw error;
      return data as UserService;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-services'] });
      toast({ title: 'Solicitação enviada com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao enviar solicitação', description: error.message, variant: 'destructive' });
    },
  });
}

export function useApplyToJob() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (application: UserJobApplicationInsert) => {
      const { data, error } = await supabase
        .from('user_job_applications')
        .insert(application)
        .select()
        .single();
      if (error) throw error;
      return data as UserJobApplication;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-job-applications'] });
      toast({ title: 'Candidatura enviada com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao enviar candidatura', description: error.message, variant: 'destructive' });
    },
  });
}

export function useEnrollInCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (enrollment: UserCourseEnrollmentInsert) => {
      const { data, error } = await supabase
        .from('user_course_enrollments')
        .insert(enrollment)
        .select()
        .single();
      if (error) throw error;
      return data as UserCourseEnrollment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-course-enrollments'] });
      toast({ title: 'Inscrição realizada com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao inscrever', description: error.message, variant: 'destructive' });
    },
  });
}

export function useRegisterForEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (registration: UserEventRegistrationInsert) => {
      const { data, error } = await supabase
        .from('user_event_registrations')
        .insert(registration)
        .select()
        .single();
      if (error) throw error;
      return data as UserEventRegistration;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-event-registrations'] });
      toast({ title: 'Inscrição no evento confirmada!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao inscrever no evento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();
      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({ title: 'Perfil atualizado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar perfil', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUsers(filters?: { role?: string; status?: string }) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.role) {
        query = query.eq('role', filters.role);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Profile[];
    },
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Profile;
    },
    enabled: !!id,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, role, status }: { id: string; role?: string; status?: string }) => {
      const updates: any = {};
      if (role) updates.role = role;
      if (status) updates.status = status;
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast({ title: 'Usuário atualizado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar usuário', description: error.message, variant: 'destructive' });
    },
  });
}

export function useCreateDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (doc: DocumentInsert) => {
      const { data, error } = await supabase
        .from('documents')
        .insert(doc)
        .select()
        .single();
      if (error) throw error;
      return data as Document;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({ title: 'Documento criado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar documento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: DocumentUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('documents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Document;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({ title: 'Documento atualizado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar documento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({ title: 'Documento excluído com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao excluir documento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (ann: AnnouncementInsert) => {
      const { data, error } = await supabase
        .from('announcements')
        .insert(ann)
        .select()
        .single();
      if (error) throw error;
      return data as Announcement;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({ title: 'Comunicado criado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar comunicado', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: AnnouncementUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('announcements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Announcement;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({ title: 'Comunicado atualizado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar comunicado', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast({ title: 'Comunicado excluído com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao excluir comunicado', description: error.message, variant: 'destructive' });
    },
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (test: TestimonialInsert) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(test)
        .select()
        .single();
      if (error) throw error;
      return data as Testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({ title: 'Depoimento criado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar depoimento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: TestimonialUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({ title: 'Depoimento atualizado com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar depoimento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({ title: 'Depoimento excluído com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao excluir depoimento', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({ title: 'Foto atualizada com sucesso!' });
    },
    onError: (error) => {
      toast({ title: 'Erro ao atualizar foto', description: error.message, variant: 'destructive' });
    },
  });
}

const SERVICE_CATEGORIES = [
  { value: 'documentacao', label: 'Documentação', icon: 'FileText', color: 'haiti-blue' },
  { value: 'emprego', label: 'Emprego', icon: 'Briefcase', color: 'ashbra-green' },
  { value: 'educacao', label: 'Educação', icon: 'GraduationCap', color: 'ashbra-yellow' },
  { value: 'social', label: 'Assistência Social', icon: 'Heart', color: 'haiti-red' },
  { value: 'saude', label: 'Saúde', icon: 'HeartPulse', color: 'red' },
  { value: 'juridico', label: 'Jurídico', icon: 'Scale', color: 'purple' },
  { value: 'cultural', label: 'Cultural', icon: 'Music', color: 'orange' },
  { value: 'outros', label: 'Outros', icon: 'MoreHorizontal', color: 'gray' },
];

const JOB_TYPES = [
  { value: 'clt', label: 'CLT' },
  { value: 'pj', label: 'PJ' },
  { value: 'estagio', label: 'Estágio' },
  { value: 'aprendiz', label: 'Jovem Aprendiz' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'temporario', label: 'Temporário' },
];

const WORK_MODES = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'remoto', label: 'Remoto' },
  { value: 'hibrido', label: 'Híbrido' },
];

const COURSE_MODALITIES = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'online', label: 'Online' },
  { value: 'hibrido', label: 'Híbrido' },
];

const COURSE_LEVELS = [
  { value: 'basico', label: 'Básico' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
  { value: 'tecnico', label: 'Técnico' },
  { value: 'superior', label: 'Superior' },
  { value: 'pos-graduacao', label: 'Pós-Graduação' },
];

const EVENT_CATEGORIES = [
  { value: 'cultural', label: 'Cultural' },
  { value: 'educativo', label: 'Educativo' },
  { value: 'social', label: 'Social' },
  { value: 'esportivo', label: 'Esportivo' },
  { value: 'capacitacao', label: 'Capacitação' },
  { value: 'networking', label: 'Networking' },
  { value: 'outros', label: 'Outros' },
];

const DOCUMENT_TYPES = [
  { value: 'guia', label: 'Guia' },
  { value: 'formulario', label: 'Formulário' },
  { value: 'lei', label: 'Lei' },
  { value: 'decreto', label: 'Decreto' },
  { value: 'manual', label: 'Manual' },
  { value: 'cartilha', label: 'Cartilha' },
  { value: 'modelo', label: 'Modelo' },
  { value: 'outros', label: 'Outros' },
];

export {
  SERVICE_CATEGORIES,
  JOB_TYPES,
  WORK_MODES,
  COURSE_MODALITIES,
  COURSE_LEVELS,
  EVENT_CATEGORIES,
  DOCUMENT_TYPES,
};

export type {
  Service, ServiceInsert, ServiceUpdate,
  Job, JobInsert, JobUpdate,
  Course, CourseInsert, CourseUpdate,
  Event, EventInsert, EventUpdate,
  Document, DocumentInsert, DocumentUpdate,
  Profile, ProfileInsert, ProfileUpdate,
  Announcement, AnnouncementInsert, AnnouncementUpdate,
  Testimonial, TestimonialInsert, TestimonialUpdate,
  UserService, UserServiceInsert,
  UserJobApplication, UserJobApplicationInsert,
  UserCourseEnrollment, UserCourseEnrollmentInsert,
  UserEventRegistration, UserEventRegistrationInsert,
};