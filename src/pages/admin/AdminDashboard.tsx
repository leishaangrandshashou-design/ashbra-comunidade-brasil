import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { useProfile, useServices, useJobs, useCourses, useEvents, useDocuments, useAnnouncements, useTestimonials, useUsers } from '@/hooks/useSupabase';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Briefcase, GraduationCap, Calendar, Heart, 
  FileText, TrendingUp, Target, AlertCircle, CheckCircle,
  MapPin, Mail, Bell, ChevronRight, Plus, Edit, Trash2,
  Eye, Filter, Download, Upload, Settings, Shield
} from 'lucide-react';

const AdminDashboard = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const { data: allServices } = useServices();
  const { data: allJobs } = useJobs();
  const { data: allCourses } = useCourses();
  const { data: allEvents } = useEvents();
  const { data: allDocuments } = useDocuments();
  const { data: allAnnouncements } = useAnnouncements();
  const { data: allTestimonials } = useTestimonials();
  const { data: allUsers } = useUsers();

  const stats = {
    services: { total: allServices?.length || 0, active: allServices?.filter(s => s.is_active).length || 0, featured: allServices?.filter(s => s.is_featured).length || 0 },
    jobs: { total: allJobs?.length || 0, active: allJobs?.filter(j => j.is_active).length || 0, featured: allJobs?.filter(j => j.is_featured).length || 0 },
    courses: { total: allCourses?.length || 0, active: allCourses?.filter(c => c.is_active).length || 0, featured: allCourses?.filter(c => c.is_featured).length || 0 },
    events: { total: allEvents?.length || 0, active: allEvents?.filter(e => e.is_active).length || 0, featured: allEvents?.filter(e => e.is_featured).length || 0 },
    documents: { total: allDocuments?.length || 0, public: allDocuments?.filter(d => d.is_public).length || 0 },
    announcements: { total: allAnnouncements?.length || 0, active: allAnnouncements?.filter(a => a.is_active).length || 0, pinned: allAnnouncements?.filter(a => a.is_pinned).length || 0 },
    testimonials: { total: allTestimonials?.length || 0, approved: allTestimonials?.filter(t => t.is_approved).length || 0, featured: allTestimonials?.filter(t => t.is_featured).length || 0 },
    users: { total: allUsers?.length || 0, active: allUsers?.filter(u => u.status === 'active').length || 0, pending: allUsers?.filter(u => u.status === 'pending').length || 0 },
  };

  const recentActivity = [
    ...(allServices?.slice(0, 3).map(s => ({ type: 'service', title: s.title, date: s.created_at, action: 'Criado' })) || []),
    ...(allJobs?.slice(0, 3).map(j => ({ type: 'job', title: j.title, date: j.created_at, action: 'Criado' })) || []),
    ...(allCourses?.slice(0, 3).map(c => ({ type: 'course', title: c.title, date: c.created_at, action: 'Criado' })) || []),
    ...(allEvents?.slice(0, 3).map(e => ({ type: 'event', title: e.title, date: e.created_at, action: 'Criado' })) || []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const quickActions = [
    { label: 'Novo Serviço', icon: Heart, href: '/admin/servicos/novo', color: 'haiti-blue' },
    { label: 'Nova Vaga', icon: Briefcase, href: '/admin/vagas/novo', color: 'ashbra-green' },
    { label: 'Novo Curso', icon: GraduationCap, href: '/admin/cursos/novo', color: 'ashbra-yellow' },
    { label: 'Novo Evento', icon: Calendar, href: '/admin/eventos/novo', color: 'haiti-red' },
    { label: 'Novo Documento', icon: FileText, href: '/admin/documentos/novo', color: 'purple' },
    { label: 'Novo Comunicado', icon: Bell, href: '/admin/comunicados/novo', color: 'orange' },
    { label: 'Gerenciar Usuários', icon: Users, href: '/admin/usuarios', color: 'blue' },
    { label: 'Configurações', icon: Settings, href: '/admin/config', color: 'gray' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Admin Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Shield className="h-8 w-8 text-haiti-blue" />
                    Painel Administrativo
                  </h1>
                  <p className="text-gray-600 mt-1">Gerencie todo o conteúdo da plataforma ASHBRA</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    <ChevronRight className="h-4 w-4 mr-2" /> Voltar ao Dashboard
                  </Button>
                </div>
              </div>

              {/* Alerts */}
              {(stats.users.pending > 0 || stats.testimonials.total - stats.testimonials.approved > 0) && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex flex-wrap gap-4">
                    {stats.users.pending > 0 && (
                      <div className="flex items-center gap-2 text-yellow-800">
                        <AlertCircle className="h-5 w-5" />
                        <span>{stats.users.pending} usuários aguardando aprovação</span>
                        <Button variant="outline" size="sm" className="ml-2" onClick={() => navigate('/admin/usuarios')}>
                          Ver
                        </Button>
                      </div>
                    )}
                    {stats.testimonials.total - stats.testimonials.approved > 0 && (
                      <div className="flex items-center gap-2 text-yellow-800">
                        <AlertCircle className="h-5 w-5" />
                        <span>{stats.testimonials.total - stats.testimonials.approved} depoimentos pendentes</span>
                        <Button variant="outline" size="sm" className="ml-2" onClick={() => navigate('/admin/depoimentos')}>
                          Ver
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
              <AdminStatCard title="Serviços" total={stats.services.total} active={stats.services.active} featured={stats.services.featured} icon={Heart} color="haiti-blue" href="/admin/servicos" />
              <AdminStatCard title="Vagas" total={stats.jobs.total} active={stats.jobs.active} featured={stats.jobs.featured} icon={Briefcase} color="ashbra-green" href="/admin/vagas" />
              <AdminStatCard title="Cursos" total={stats.courses.total} active={stats.courses.active} featured={stats.courses.featured} icon={GraduationCap} color="ashbra-yellow" href="/admin/cursos" />
              <AdminStatCard title="Eventos" total={stats.events.total} active={stats.events.active} featured={stats.events.featured} icon={Calendar} color="haiti-red" href="/admin/eventos" />
              <AdminStatCard title="Documentos" total={stats.documents.total} active={stats.documents.public} icon={FileText} color="purple" href="/admin/documentos" />
              <AdminStatCard title="Comunicados" total={stats.announcements.total} active={stats.announcements.active} featured={stats.announcements.pinned} icon={Bell} color="orange" href="/admin/comunicados" />
              <AdminStatCard title="Depoimentos" total={stats.testimonials.total} active={stats.testimonials.approved} featured={stats.testimonials.featured} icon={CheckCircle} color="green" href="/admin/depoimentos" />
              <AdminStatCard title="Usuários" total={stats.users.total} active={stats.users.active} featured={stats.users.pending} icon={Users} color="blue" href="/admin/usuarios" />
            </div>

            {/* Quick Actions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="h-6 w-6 text-haiti-blue" />
                Ações Rápidas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map(action => (
                  <Card key={action.label} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate(action.href)}>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${action.color}/10 text-${action.color} group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{action.label}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="content">Conteúdo</TabsTrigger>
                <TabsTrigger value="users">Usuários</TabsTrigger>
                <TabsTrigger value="engagement">Engajamento</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-haiti-blue" />
                      Atividade Recente
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/admin/atividade')}>
                      Ver tudo <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {recentActivity.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Nenhuma atividade recente</p>
                    ) : (
                      <div className="space-y-3">
                        {recentActivity.map((activity, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                activity.type === 'service' ? 'bg-haiti-blue/10 text-haiti-blue' :
                                activity.type === 'job' ? 'bg-ashbra-green/10 text-ashbra-green' :
                                activity.type === 'course' ? 'bg-ashbra-yellow/10 text-ashbra-yellow' :
                                'bg-haiti-red/10 text-haiti-red'
                              }`}>
                                {activity.type === 'service' && <Heart className="h-4 w-4" />}
                                {activity.type === 'job' && <Briefcase className="h-4 w-4" />}
                                {activity.type === 'course' && <GraduationCap className="h-4 w-4" />}
                                {activity.type === 'event' && <Calendar className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{activity.title}</p>
                                <p className="text-sm text-gray-500">{activity.action} • {new Date(activity.date).toLocaleDateString('pt-BR')}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${activity.type === 'service' ? 'haiti-blue' : activity.type === 'job' ? 'ashbra-green' : activity.type === 'course' ? 'ashbra-yellow' : 'haiti-red'}/10 text-${activity.type === 'service' ? 'haiti-blue' : activity.type === 'job' ? 'ashbra-green' : activity.type === 'course' ? 'ashbra-yellow' : 'haiti-red'}`}>
                              {activity.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* System Health */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-green-500" />
                        Saúde do Sistema
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <HealthItem label="Serviços ativos" value={`${stats.services.active}/${stats.services.total}`} status={stats.services.active === stats.services.total ? 'good' : stats.services.active > stats.services.total * 0.7 ? 'warning' : 'bad'} />
                      <HealthItem label="Vagas ativas" value={`${stats.jobs.active}/${stats.jobs.total}`} status={stats.jobs.active === stats.jobs.total ? 'good' : stats.jobs.active > stats.jobs.total * 0.7 ? 'warning' : 'bad'} />
                      <HealthItem label="Cursos ativos" value={`${stats.courses.active}/${stats.courses.total}`} status={stats.courses.active === stats.courses.total ? 'good' : stats.courses.active > stats.courses.total * 0.7 ? 'warning' : 'bad'} />
                      <HealthItem label="Eventos futuros" value={`${allEvents?.filter(e => new Date(e.start_date) >= new Date()).length || 0}/${stats.events.total}`} status="good" />
                      <HealthItem label="Usuários ativos" value={`${stats.users.active}/${stats.users.total}`} status={stats.users.active === stats.users.total ? 'good' : stats.users.active > stats.users.total * 0.7 ? 'warning' : 'bad'} />
                      <HealthItem label="Depoimentos aprovados" value={`${stats.testimonials.approved}/${stats.testimonials.total}`} status={stats.testimonials.approved === stats.testimonials.total ? 'good' : 'warning'} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-purple-500" />
                        Filtros Rápidos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <QuickFilter label="Serviços inativos" count={stats.services.total - stats.services.active} href="/admin/servicos?filter=inactive" color="haiti-blue" />
                      <QuickFilter label="Vagas expiradas" count={allJobs?.filter(j => j.application_deadline && new Date(j.application_deadline) < new Date()).length || 0} href="/admin/vagas?filter=expired" color="ashbra-green" />
                      <QuickFilter label="Cursos com inscrições abertas" count={allCourses?.filter(c => c.enrollment_deadline && new Date(c.enrollment_deadline) > new Date()).length || 0} href="/admin/cursos?filter=open" color="ashbra-yellow" />
                      <QuickFilter label="Eventos esta semana" count={allEvents?.filter(e => new Date(e.start_date) >= new Date() && new Date(e.start_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length || 0} href="/admin/eventos?filter=week" color="haiti-red" />
                      <QuickFilter label="Usuários pendentes" count={stats.users.pending} href="/admin/usuarios?filter=pending" color="blue" />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AdminContentSection 
                    title="Serviços" 
                    items={allServices || []}
                    columns={[{ key: 'title', label: 'Título' }, { key: 'category', label: 'Categoria' }, { key: 'is_active', label: 'Status' }]}
                    renderActions={(item) => (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/servicos/${item.id}/editar`)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                    addHref="/admin/servicos/novo"
                    addLabel="Novo Serviço"
                  />
                  <AdminContentSection 
                    title="Vagas" 
                    items={allJobs || []}
                    columns={[{ key: 'title', label: 'Título' }, { key: 'company', label: 'Empresa' }, { key: 'job_type', label: 'Tipo' }, { key: 'is_active', label: 'Status' }]}
                    renderActions={(item) => (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/vagas/${item.id}/editar`)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                    addHref="/admin/vagas/novo"
                    addLabel="Nova Vaga"
                  />
                  <AdminContentSection 
                    title="Cursos" 
                    items={allCourses || []}
                    columns={[{ key: 'title', label: 'Título' }, { key: 'institution', label: 'Instituição' }, { key: 'modality', label: 'Modalidade' }, { key: 'is_active', label: 'Status' }]}
                    renderActions={(item) => (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/cursos/${item.id}/editar`)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                    addHref="/admin/cursos/novo"
                    addLabel="Novo Curso"
                  />
                  <AdminContentSection 
                    title="Eventos" 
                    items={allEvents || []}
                    columns={[{ key: 'title', label: 'Título' }, { key: 'start_date', label: 'Data' }, { key: 'category', label: 'Categoria' }, { key: 'is_active', label: 'Status' }]}
                    renderActions={(item) => (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/eventos/${item.id}/editar`)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                    addHref="/admin/eventos/novo"
                    addLabel="Novo Evento"
                  />
                </div>
              </TabsContent>

              <TabsContent value="users">
                <AdminContentSection 
                  title="Usuários" 
                  items={allUsers || []}
                  columns={[{ key: 'full_name', label: 'Nome' }, { key: 'email', label: 'E-mail' }, { key: 'role', label: 'Perfil' }, { key: 'status', label: 'Status' }, { key: 'created_at', label: 'Cadastro' }]}
                  renderActions={(item) => (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/usuarios/${item.id}`)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/usuarios/${item.id}/editar`)}><Edit className="h-4 w-4" /></Button>
                    </div>
                    )}
                />
              </TabsContent>

              <TabsContent value="engagement">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AdminContentSection 
                    title="Comunicados" 
                    items={allAnnouncements || []}
                    columns={[{ key: 'title', label: 'Título' }, { key: 'category', label: 'Categoria' }, { key: 'priority', label: 'Prioridade' }, { key: 'is_active', label: 'Status' }]}
                    renderActions={(item) => (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/comunicados/${item.id}/editar`)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                    addHref="/admin/comunicados/novo"
                    addLabel="Novo Comunicado"
                  />
                  <AdminContentSection 
                    title="Depoimentos" 
                    items={allTestimonials || []}
                    columns={[{ key: 'author_name', label: 'Autor' }, { key: 'rating', label: 'Nota' }, { key: 'is_approved', label: 'Aprovado' }, { key: 'is_featured', label: 'Destaque' }]}
                    renderActions={(item) => (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/depoimentos/${item.id}/editar`)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-haiti-blue" />
                        Configurações Gerais
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <SettingItem label="Nome da organização" value="ASHBRA - Associação para Solidariedade dos Haitianos no Brasil" />
                      <SettingItem label="E-mail de contato" value="contato@ashbra.org.br" />
                      <SettingItem label="Telefone/WhatsApp" value="(41) 99813-6033" />
                      <SettingItem label="Endereço" value="Curitiba, PR - Brasil" />
                      <SettingItem label="Timezone" value="America/Sao_Paulo" />
                      <SettingItem label="Idioma padrão" value="Português (Brasil)" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        Permissões e Roles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RoleConfig role="community" label="Comunidade" permissions={['Ver serviços', 'Solicitar serviços', 'Candidatar vagas', 'Inscrever cursos', 'Inscrever eventos', 'Ver perfil']} />
                      <RoleConfig role="volunteer" label="Voluntário" permissions={['Tudo da comunidade', 'Ver todos usuários', 'Gerenciar eventos', 'Moderar depoimentos']} />
                      <RoleConfig role="partner" label="Parceiro" permissions={['Tudo da comunidade', 'Publicar vagas', 'Publicar cursos', 'Ver métricas']} />
                      <RoleConfig role="admin" label="Administrador" permissions={['Acesso total', 'Gerenciar usuários', 'Configurações', 'Analytics', 'Backup']} />
                    </CardContent>
                  </Card>
                </div>
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
const AdminStatCard = ({ title, total, active, featured, icon: Icon, color, href }: any) => (
  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = href}>
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{total}</p>
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span>Ativos: <span className="font-medium text-green-600">{active}</span></span>
            {featured !== undefined && <span>Destaque: <span className="font-medium text-yellow-600">{featured}</span></span>}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}/10 text-${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const HealthItem = ({ label, value, status }: any) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <span className="text-gray-600">{label}</span>
    <div className="flex items-center gap-3">
      <span className="font-mono font-medium text-gray-900">{value}</span>
      <span className={`w-2 h-2 rounded-full ${status === 'good' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} />
    </div>
  </div>
);

const QuickFilter = ({ label, count, href, color }: any) => (
  <a href={href} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <span className="text-gray-600">{label}</span>
    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${color}/10 text-${color}`}>{count}</span>
  </a>
);

interface AdminContentSectionProps {
  title: string;
  items: any[];
  columns: { key: string; label: string }[];
  renderActions: (item: any) => React.ReactNode;
  addHref: string;
  addLabel: string;
}

const AdminContentSection = ({ title, items, columns, renderActions, addHref, addLabel }: AdminContentSectionProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>{title}</CardTitle>
      <Button size="sm" onClick={() => window.location.href = addHref}>
        <Plus className="h-4 w-4 mr-1" /> {addLabel}
      </Button>
    </CardHeader>
    <CardContent>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Nenhum {title.toLowerCase()} cadastrado</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map(col => <th key={col.key} className="text-left p-3 text-sm font-medium text-gray-500">{col.label}</th>)}
                <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.slice(0, 10).map((item, i) => (
                <tr key={item.id || i} className="border-b border-gray-100 hover:bg-gray-50">
                  {columns.map(col => (
                    <td key={col.key} className="p-3 text-sm text-gray-900">
                      {col.key === 'is_active' ? (
                        <Badge variant={item[col.key] ? 'default' : 'outline'}>{item[col.key] ? 'Ativo' : 'Inativo'}</Badge>
                      ) : col.key === 'is_approved' ? (
                        <Badge variant={item[col.key] ? 'default' : 'outline'}>{item[col.key] ? 'Sim' : 'Não'}</Badge>
                      ) : col.key === 'is_featured' ? (
                        <Badge variant={item[col.key] ? 'default' : 'outline'}>{item[col.key] ? 'Sim' : 'Não'}</Badge>
                      ) : col.key === 'is_pinned' ? (
                        <Badge variant={item[col.key] ? 'default' : 'outline'}>{item[col.key] ? 'Sim' : 'Não'}</Badge>
                      ) : col.key === 'rating' ? (
                        <span>{'★'.repeat(item[col.key] || 0)}{'☆'.repeat(5 - (item[col.key] || 0))}</span>
                      ) : col.key === 'start_date' || col.key === 'created_at' ? (
                        <span>{new Date(item[col.key]).toLocaleDateString('pt-BR')}</span>
                      ) : (
                        String(item[col.key] || '-')
                      )}
                    </td>
                  ))}
                  <td className="p-3 text-right">{renderActions(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length > 10 && (
            <div className="text-center mt-4">
              <Button variant="outline" size="sm">Ver mais ({items.length} total)</Button>
            </div>
          )}
        </div>
      )}
    </CardContent>
  </Card>
);

interface SettingItemProps {
  label: string;
  value: string;
}

const SettingItem = ({ label, value }: SettingItemProps) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <span className="text-gray-600">{label}</span>
    <span className="font-mono text-sm text-gray-900 bg-white px-3 py-1 rounded border">{value}</span>
  </div>
);

interface RoleConfigProps {
  role: string;
  label: string;
  permissions: string[];
}

const RoleConfig = ({ role, label, permissions }: RoleConfigProps) => (
  <div className="p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <span className="font-medium text-gray-900 capitalize">{label}</span>
      <Badge variant={role === 'admin' ? 'destructive' : role === 'partner' ? 'default' : 'outline'}>{role}</Badge>
    </div>
    <div className="flex flex-wrap gap-2">
      {permissions.map((p, i) => (
        <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
      ))}
    </div>
  </div>
);

export default AdminDashboard;
