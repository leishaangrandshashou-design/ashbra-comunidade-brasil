import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useProfile, useUpdateProfile, useUploadAvatar, useUserServices, useUserJobApplications, useUserCourseEnrollments, useUserEventRegistrations } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Heart, Shield, Camera, Loader2, Save, AlertCircle, CheckCircle } from 'lucide-react';

const educationLevels = [
  'Ensino Fundamental Incompleto', 'Ensino Fundamental Completo',
  'Ensino Médio Incompleto', 'Ensino Médio Completo',
  'Técnico Incompleto', 'Técnico Completo',
  'Superior Incompleto', 'Superior Completo',
  'Pós-Graduação', 'Mestrado', 'Doutorado'
];

const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const roleLabels: Record<string, string> = {
  community: 'Comunidade',
  volunteer: 'Voluntário',
  partner: 'Parceiro',
  admin: 'Administrador',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  active: 'Ativo',
  inactive: 'Inativo',
  suspended: 'Suspenso',
};

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { data: profileData, isLoading: profileLoading } = useProfile(user?.id);
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  const { data: services } = useUserServices(user?.id);
  const { data: jobs } = useUserJobApplications(user?.id);
  const { data: courses } = useUserCourseEnrollments(user?.id);
  const { data: events } = useUserEventRegistrations(user?.id);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    full_name: '',
    cpf: '',
    phone: '',
    birth_date: '',
    nationality: 'Haitiana',
    address: '',
    city: 'Curitiba',
    state: 'PR',
    zip_code: '',
    education_level: '',
    profession: '',
    skills: '',
    bio: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.full_name || '',
        cpf: profileData.cpf || '',
        phone: profileData.phone || '',
        birth_date: profileData.birth_date || '',
        nationality: profileData.nationality || 'Haitiana',
        address: profileData.address || '',
        city: profileData.city || 'Curitiba',
        state: profileData.state || 'PR',
        zip_code: profileData.zip_code || '',
        education_level: profileData.education_level || '',
        profession: profileData.profession || '',
        skills: profileData.skills?.join(', ') || '',
        bio: profileData.bio || '',
      });
      if (profileData.avatar_url) setAvatarPreview(profileData.avatar_url);
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: 'Arquivo muito grande', description: 'Máximo 2MB', variant: 'destructive' });
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast({ title: 'Tipo inválido', description: 'Apenas imagens são permitidas', variant: 'destructive' });
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    
    const { error } = await updateProfile.mutateAsync({
      full_name: formData.full_name,
      cpf: formData.cpf || null,
      phone: formData.phone,
      birth_date: formData.birth_date || null,
      nationality: formData.nationality,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip_code,
      education_level: formData.education_level,
      profession: formData.profession,
      skills: skillsArray.length > 0 ? skillsArray : null,
      bio: formData.bio,
    });

    if (!error) {
      if (avatarFile) {
        await uploadAvatar.mutateAsync(avatarFile);
      }
      await refreshProfile();
      toast({ title: 'Perfil salvo!', description: 'Suas informações foram atualizadas.' });
    }
    setSaving(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 pb-16 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-haiti-blue" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="py-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-28 w-28">
                      <AvatarImage src={avatarPreview || undefined} alt={formData.full_name || 'Avatar'} />
                      <AvatarFallback className="text-3xl font-bold bg-haiti-blue text-white">
                        {formData.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute bottom-0 right-0 bg-haiti-blue text-white p-2 rounded-full hover:bg-haiti-blue/90 transition-colors cursor-pointer" htmlFor="avatar-upload">
                      <Camera className="h-5 w-5" />
                    </label>
                    <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">{formData.full_name || 'Usuário'}</h1>
                    <p className="text-gray-500">{user?.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(profileData?.status || 'pending')} text-white`}>
                        {statusLabels[profileData?.status || 'pending']}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-haiti-blue/10 text-haiti-blue border border-haiti-blue/20">
                        {roleLabels[profileData?.role || 'community']}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="services">Serviços ({services?.length || 0})</TabsTrigger>
                <TabsTrigger value="jobs">Vagas ({jobs?.length || 0})</TabsTrigger>
                <TabsTrigger value="courses">Cursos ({courses?.length || 0})</TabsTrigger>
                <TabsTrigger value="events">Eventos ({events?.length || 0})</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informações Pessoais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_name">Nome completo *</Label>
                        <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" maxLength={14} />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(41) 99999-9999" required />
                      </div>
                      <div>
                        <Label htmlFor="birth_date">Data de nascimento</Label>
                        <Input id="birth_date" name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nacionalidade</Label>
                        <Select value={formData.nationality} onValueChange={(v) => setFormData(p => ({ ...p, nationality: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Haitiana">Haitiana</SelectItem>
                            <SelectItem value="Brasileira">Brasileira</SelectItem>
                            <SelectItem value="Venezuelana">Venezuelana</SelectItem>
                            <SelectItem value="Outra">Outra</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Endereço</Label>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <Input name="address" value={formData.address} onChange={handleChange} placeholder="Rua, número, complemento" />
                        </div>
                        <div>
                          <Input name="city" value={formData.city} onChange={handleChange} placeholder="Cidade" />
                        </div>
                        <div>
                          <Select value={formData.state} onValueChange={(v) => setFormData(p => ({ ...p, state: v }))}>
                            <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                            <SelectContent>
                              {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Input name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="CEP" maxLength={9} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Formação e Experiência
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="education_level">Nível de escolaridade</Label>
                        <Select value={formData.education_level} onValueChange={(v) => setFormData(p => ({ ...p, education_level: v }))}>
                          <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                          <SelectContent>
                            {educationLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="profession">Profissão/Ocupação</Label>
                        <Input id="profession" name="profession" value={formData.profession} onChange={handleChange} placeholder="Ex: Auxiliar administrativo" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="skills">Habilidades (separadas por vírgula)</Label>
                      <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="Português, Informática, Atendimento ao cliente" />
                    </div>
                    <div>
                      <Label htmlFor="bio">Sobre mim</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                        placeholder="Conte um pouco sobre você, seus objetivos, experiências..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => window.location.reload()} disabled={saving}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {saving ? 'Salvando...' : 'Salvar alterações'}
                  </Button>
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-4">
                {services?.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">Nenhuma solicitação de serviço</h3>
                      <p className="text-gray-500 mb-4">Você ainda não solicitou nenhum serviço</p>
                      <Button onClick={() => window.location.href = '/servicos'}>Conhecer serviços</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {services.map(item => (
                      <Card key={item.id} className="border-l-4 border-ashbra-green">
                        <CardContent className="py-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <h4 className="font-semibold">{item.services.title}</h4>
                              <p className="text-sm text-gray-500">{item.services.category}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'aprovado' ? 'bg-green-100 text-green-700' :
                              item.status === 'rejeitado' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-4">
                {jobs?.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">Nenhuma candidatura</h3>
                      <p className="text-gray-500 mb-4">Você ainda não se candidatou a nenhuma vaga</p>
                      <Button onClick={() => window.location.href = '/vagas'}>Ver vagas</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {jobs.map(item => (
                      <Card key={item.id} className="border-l-4 border-haiti-blue">
                        <CardContent className="py-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <h4 className="font-semibold">{item.jobs.title}</h4>
                              <p className="text-sm text-gray-500">{item.jobs.company} • {item.jobs.location}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'aprovado' ? 'bg-green-100 text-green-700' :
                              item.status === 'rejeitado' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-4">
                {courses?.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">Nenhuma inscrição</h3>
                      <p className="text-gray-500 mb-4">Você ainda não se inscreveu em nenhum curso</p>
                      <Button onClick={() => window.location.href = '/cursos'}>Ver cursos</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {courses.map(item => (
                      <Card key={item.id} className="border-l-4 border-ashbra-yellow">
                        <CardContent className="py-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.courses.title}</h4>
                              <p className="text-sm text-gray-500">{item.courses.institution}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-24">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-ashbra-yellow transition-all duration-300" 
                                    style={{ width: `${item.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500 mt-1 block text-center">{item.progress}%</span>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === 'concluido' ? 'bg-green-100 text-green-700' :
                                item.status === 'cancelado' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-4">
                {events?.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">Nenhuma inscrição</h3>
                      <p className="text-gray-500 mb-4">Você ainda não se inscreveu em nenhum evento</p>
                      <Button onClick={() => window.location.href = '/eventos'}>Ver eventos</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {events.map(item => (
                      <Card key={item.id} className="border-l-4 border-haiti-red">
                        <CardContent className="py-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <h4 className="font-semibold">{item.events.title}</h4>
                              <p className="text-sm text-gray-500">
                                {new Date(item.events.start_date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                {item.events.location && ` • ${item.events.location}`}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.attended ? 'bg-green-100 text-green-700' :
                              item.status === 'cancelado' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {item.attended ? 'Presente' : item.status}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
