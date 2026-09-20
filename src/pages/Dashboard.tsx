import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { useProfile, useUserServices, useUserJobApplications, useUserCourseEnrollments, useUserEventRegistrations, useServices, useJobs, useCourses, useEvents, useAnnouncements } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Briefcase, GraduationCap, Calendar, Heart, 
  Clock, TrendingUp, Target, AlertCircle, CheckCircle,
  FileText, MapPin, Mail, Bell, ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const { profile, user } = useAuth();
  const { data: profileData } = useProfile(user?.id);
  const { data: services } = useUserServices(user?.id);
  const { data: jobs } = useUserJobApplications(user?.id);
  const { data: courses } = useUserCourseEnrollments(user?.id);
  const { data: events } = useUserEventRegistrations(user?.id);
  const { data: allServices } = useServices();
  const { data: allJobs } = useJobs();
  const { data: allCourses } = useCourses();
  const { data: allEvents } = useEvents();
  const { data: announcements } = useAnnouncements(profileData?.role ? [profileData.role] : undefined);
  const navigate = useNavigate();
  const { toast } = useToast();

  const stats = {
    services: { total: services?.length || 0, pending: services?.filter(s => s.status === 'pendente').length || 0, approved: services?.filter(s => s.status === 'aprovado').length || 0 },
    jobs: { total: jobs?.length || 0, pending: jobs?.filter(j => j.status === 'pendente').length || 0, approved: jobs?.filter(j => j.status === 'aprovado').length || 0 },
    courses: { total: courses?.length || 0, inProgress: courses?.filter(c => c.status === 'em_andamento').length || 0, completed: courses?.filter(c => c.status === 'concluido').length || 0 },
    events: { total: events?.length || 0, upcoming: events?.filter(e => new Date(e.events.start_date) >= new Date()).length || 0, attended: events?.filter(e => e.attended).length || 0 },
  };

  const recentAnnouncements = announcements?.slice(0, 3) || [];

  const quickActions = [
    { label: 'Novo serviço', icon: FileText, href: '/servicos', color: 'haiti-blue', desc: 'Solicitar documentação, jurídico, social' },
    { label: 'Buscar vagas', icon: Briefcase, href: '/vagas', color: 'ashbra-green', desc: 'Candidatar-se a oportunidades de emprego' },
    { label: 'Inscrever em cursos', icon: GraduationCap, href: '/cursos', color: 'ashbra-yellow', desc: 'Capacitação profissional e idiomas' },
    { label: 'Eventos próximos', icon: Calendar, href: '/eventos', color: 'haiti-red', desc: 'Cultura, networking e integração' },
  ];

  const getProgress = (completed: number, total: number) => total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Olá, {profileData?.full_name?.split(' ')[0] || 'Usuário'}! 👋</h1>
                  <p className="text-gray-600 mt-1">Acompanhe suas atividades e descubra novas oportunidades</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => navigate('/perfil')}>
                    <Users className="h-4 w-4 mr-2" /> Meu Perfil
                  </Button>
                  <Button onClick={() => navigate('/perfil')}>
                    <Target className="h-4 w-4 mr-2" /> Definir Metas
                  </Button>
                </div>
              </div>

              {/* Announcements Banner */}
              {recentAnnouncements.length > 0 && (
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-haiti-blue to-haiti-red rounded-xl p-4 text-white">
                    <div className="flex items-start gap-3">
                      <Bell className="h-6 w-6 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Novidades da ASHBRA</h3>
                        <div className="space-y-1 text-sm text-white/90">
                          {recentAnnouncements.map((ann, i) => (
                            <div key={ann.id} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-ashbra-yellow" />
                              <span>{ann.title}</span>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="mt-3 text-white border-white/30 hover:bg-white/10" size="sm">
                          Ver todas <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard 
                title="Serviços" 
                total={stats.services.total} 
                subtitle={`${stats.services.approved} aprovados • ${stats.services.pending} pendentes`}
                icon={Heart} 
                color="haiti-blue"
                progress={getProgress(stats.services.approved, stats.services.total)}
              />
              <StatCard 
                title="Vagas" 
                total={stats.jobs.total} 
                subtitle={`${stats.jobs.approved} aprovadas • ${stats.jobs.pending} pendentes`}
                icon={Briefcase} 
                color="ashbra-green"
                progress={getProgress(stats.jobs.approved, stats.jobs.total)}
              />
              <StatCard 
                title="Cursos" 
                total={stats.courses.total} 
                subtitle={`${stats.courses.completed} concluídos • ${stats.courses.inProgress} em andamento`}
                icon={GraduationCap} 
                color="ashbra-yellow"
                progress={getProgress(stats.courses.completed, stats.courses.total)}
              />
              <StatCard 
                title="Eventos" 
                total={stats.events.total} 
                subtitle={`${stats.events.attended} participados • ${stats.events.upcoming} futuros`}
                icon={Calendar} 
                color="haiti-red"
                progress={getProgress(stats.events.attended, stats.events.total)}
              />
            </div>

            {/* Quick Actions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-haiti-blue" />
                Ações Rápidas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map(action => (
                  <Card key={action.label} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate(action.href)}>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${action.color} bg-${action.color}/10 text-${action.color} group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                      <p className="text-sm text-gray-500">{action.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Tabs for Detailed Views */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="services">Serviços</TabsTrigger>
                <TabsTrigger value="jobs">Vagas</TabsTrigger>
                <TabsTrigger value="courses">Cursos</TabsTrigger>
                <TabsTrigger value="events">Eventos</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Recommended */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-haiti-blue" />
                    Recomendados para você
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {allServices?.slice(0, 1).map(s => (
                      <RecommendationCard key={s.id} type="service" item={s} />
                    ))}
                    {allJobs?.slice(0, 1).map(j => (
                      <RecommendationCard key={j.id} type="job" item={j} />
                    ))}
                    {allCourses?.slice(0, 1).map(c => (
                      <RecommendationCard key={c.id} type="course" item={c} />
                    ))}
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orange-500" />
                        Prazos Próximos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DeadlinesList 
                        jobs={allJobs?.filter(j => j.application_deadline && new Date(j.application_deadline) > new Date() && new Date(j.application_deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).slice(0, 3) || []}
                        courses={allCourses?.filter(c => c.enrollment_deadline && new Date(c.enrollment_deadline) > new Date() && new Date(c.enrollment_deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).slice(0, 3) || []}
                        events={allEvents?.filter(e => e.registration_deadline && new Date(e.registration_deadline) > new Date() && new Date(e.registration_deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).slice(0, 3) || []}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Próximos Passos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <NextSteps 
                        services={services || []}
                        jobs={jobs || []}
                        courses={courses || []}
                        events={events || []}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="services">
                <SectionList 
                  title="Minhas Solicitações"
                  items={services || []}
                  emptyMessage="Nenhuma solicitação de serviço"
                  emptyAction={{ label: 'Conhecer serviços', href: '/servicos' }}
                  renderItem={(item) => (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3">
                      <div>
                        <h4 className="font-medium">{item.services.title}</h4>
                        <p className="text-sm text-gray-500">{item.services.category}</p>
                      </div>
                      <Badge variant={item.status === 'aprovado' ? 'default' : item.status === 'rejeitado' ? 'destructive' : 'outline'}>
                        {item.status}
                      </Badge>
                    </div>
                  )}
                />
              </TabsContent>

              <TabsContent value="jobs">
                <SectionList 
                  title="Minhas Candidaturas"
                  items={jobs || []}
                  emptyMessage="Nenhuma candidatura a vagas"
                  emptyAction={{ label: 'Ver vagas', href: '/vagas' }}
                  renderItem={(item) => (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3">
                      <div>
                        <h4 className="font-medium">{item.jobs.title}</h4>
                        <p className="text-sm text-gray-500">{item.jobs.company} • {item.jobs.location}</p>
                      </div>
                      <Badge variant={item.status === 'aprovado' ? 'default' : item.status === 'rejeitado' ? 'destructive' : 'outline'}>
                        {item.status}
                      </Badge>
                    </div>
                  )}
                />
              </TabsContent>

              <TabsContent value="courses">
                <SectionList 
                  title="Minhas Inscrições"
                  items={courses || []}
                  emptyMessage="Nenhuma inscrição em cursos"
                  emptyAction={{ label: 'Ver cursos', href: '/cursos' }}
                  renderItem={(item) => (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.courses.title}</h4>
                        <p className="text-sm text-gray-500">{item.courses.institution}</p>
                        <div className="w-32 mt-2">
                          <Progress value={item.progress} className="h-1.5" />
                          <span className="text-xs text-gray-500">{item.progress}%</span>
                        </div>
                      </div>
                      <Badge variant={item.status === 'concluido' ? 'default' : item.status === 'cancelado' ? 'destructive' : 'outline'}>
                        {item.status}
                      </Badge>
                    </div>
                  )}
                />
              </TabsContent>

              <TabsContent value="events">
                <SectionList 
                  title="Meus Eventos"
                  items={events || []}
                  emptyMessage="Nenhuma inscrição em eventos"
                  emptyAction={{ label: 'Ver eventos', href: '/eventos' }}
                  renderItem={(item) => (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3">
                      <div>
                        <h4 className="font-medium">{item.events.title}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(item.events.start_date).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
                          {item.events.location && ` • ${item.events.location}`}
                        </p>
                      </div>
                      <Badge variant={item.attended ? 'default' : item.status === 'cancelado' ? 'destructive' : 'outline'}>
                        {item.attended ? 'Presente' : item.status}
                      </Badge>
                    </div>
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper Components
const StatCard = ({ title, total, subtitle, icon: Icon, color, progress }: any) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{total}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}/10 text-${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <Progress value={progress} className="mt-4 h-1.5" />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0%</span>
        <span>{progress}%</span>
        <span>100%</span>
      </div>
    </CardContent>
  </Card>
);

const RecommendationCard = ({ type, item }: any) => {
  const icons: Record<string, React.ComponentType> = { service: Heart, job: Briefcase, course: GraduationCap };
  const colors: Record<string, string> = { service: 'haiti-blue', job: 'ashbra-green', course: 'ashbra-yellow' };
  const Icon = icons[type];
  const color = colors[type];
  const href = type === 'service' ? `/servicos/${item.id}` : type === 'job' ? `/vagas/${item.id}` : `/cursos/${item.id}`;

  return (
    <Card className="border-l-4 border-l-current" style={{ borderColor: `var(--${color})` }}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded text-xs font-medium bg-${color}/10 text-${color}`}>
            {type === 'service' ? 'Serviço' : type === 'job' ? 'Vaga' : 'Curso'}
          </span>
          {item.is_featured && <Badge className="bg-yellow-100 text-yellow-700 text-xs">Destaque</Badge>}
        </div>
        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description || item.company || item.institution}</p>
        <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = href}>
          Saiba mais <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

const DeadlinesList = ({ jobs, courses, events }: any) => {
  const allDeadlines = [
    ...jobs.map((j: any) => ({ type: 'job', title: j.title, date: j.application_deadline, company: j.company })),
    ...courses.map((c: any) => ({ type: 'course', title: c.title, date: c.enrollment_deadline, institution: c.institution })),
    ...events.map((e: any) => ({ type: 'event', title: e.title, date: e.registration_deadline, location: e.location })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (allDeadlines.length === 0) {
    return <p className="text-gray-500 text-center py-4">Nenhum prazo próximo</p>;
  }

  return (
    <div className="space-y-3">
      {allDeadlines.map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-100 text-orange-600">
            <span className="font-bold">{new Date(item.date).getDate()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{item.title}</p>
            <p className="text-sm text-gray-500">{item.company || item.institution || item.location}</p>
          </div>
          <span className="text-xs text-orange-600 font-medium">
            {new Date(item.date).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
        </div>
      ))}
    </div>
  );
};

const NextSteps = ({ services, jobs, courses, events }: any) => {
  const steps = [
    ...services.filter((s: any) => s.status === 'pendente').slice(0, 2).map((s: any) => ({
      title: `Aguardando resposta: ${s.services.title}`,
      action: 'Acompanhar',
      color: 'yellow'
    })),
    ...jobs.filter((j: any) => j.status === 'pendente').slice(0, 2).map((j: any) => ({
      title: `Candidatura: ${j.jobs.title}`,
      action: 'Ver status',
      color: 'blue'
    })),
    ...courses.filter((c: any) => c.status === 'em_andamento').slice(0, 2).map((c: any) => ({
      title: `Continuar: ${c.courses.title}`,
      action: 'Acessar',
      color: 'green'
    })),
    ...events.filter((e: any) => !e.attended && new Date(e.events.start_date) >= new Date()).slice(0, 2).map((e: any) => ({
      title: `Evento: ${e.events.title}`,
      action: 'Confirmar',
      color: 'red'
    })),
  ].slice(0, 4);

  if (steps.length === 0) {
    return <p className="text-gray-500 text-center py-4">Tudo em dia! 🎉</p>;
  }

  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${step.color}-100 text-${step.color}-600`}>
            {i + 1}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{step.title}</p>
          </div>
          <Button variant="outline" size="sm">{step.action}</Button>
        </div>
      ))}
    </div>
  );
};

interface SectionListProps {
  title: string;
  items: any[];
  emptyMessage: string;
  emptyAction: { label: string; href: string };
  renderItem: (item: any) => React.ReactNode;
}

const SectionList = ({ title, items, emptyMessage, emptyAction, renderItem }: SectionListProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{emptyMessage}</p>
          <Button variant="outline" onClick={() => window.location.href = emptyAction.href}>
            {emptyAction.label}
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={item.id || i} className="border-b last:border-0">
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

export default Dashboard;
