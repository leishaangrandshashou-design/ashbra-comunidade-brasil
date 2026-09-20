import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobs, JOB_TYPES, WORK_MODES } from '@/hooks/useSupabase';
import { Briefcase, MapPin, Home, Monitor, Smartphone, DollarSign, Calendar } from 'lucide-react';

const jobTypeColors: Record<string, string> = {
  clt: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  pj: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  estagio: 'bg-green-500/10 text-green-600 border-green-500/20',
  aprendiz: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  freelance: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  temporario: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
};

const workModeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  presencial: MapPin,
  remoto: Monitor,
  hibrido: Smartphone,
};

const workModeLabels: Record<string, string> = {
  presencial: 'Presencial',
  remoto: 'Remoto',
  hibrido: 'Híbrido',
};

const Jobs = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const { data: jobs, isLoading } = useJobs({
    job_type: selectedType !== 'all' ? selectedType : undefined,
    work_mode: selectedMode !== 'all' ? selectedMode : undefined,
    location: locationFilter || undefined,
  });

  const filteredJobs = jobs?.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.requirements.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const formatSalary = (range: string | null) => {
    if (!range) return 'A combinar';
    return range;
  };

  const isDeadlineSoon = (deadline: string | null) => {
    if (!deadline) return false;
    const days = (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days <= 7 && days > 0;
  };

  const isDeadlinePassed = (deadline: string | null) => {
    if (!deadline) return false;
    return new Date(deadline).getTime() < Date.now();
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-ashbra-green via-haiti-blue to-haiti-red">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Oportunidades de <span className="text-ashbra-yellow">Emprego</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Vagas de empresas parceiras que valorizam a diversidade e a inclusão de imigrantes
            </p>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Buscar vagas por cargo, empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  aria-label="Buscar vagas"
                />
              </div>
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Filtrar por cidade..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full"
                  aria-label="Filtrar por localização"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType} className="w-full md:w-40">
                <SelectTrigger aria-label="Filtrar por tipo de contrato">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {JOB_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedMode} onValueChange={setSelectedMode} className="w-full md:w-40">
                <SelectTrigger aria-label="Filtrar por modalidade">
                  <SelectValue placeholder="Modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {WORK_MODES.map(mode => (
                    <SelectItem key={mode.value} value={mode.value}>{mode.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Jobs Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-4/6" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma vaga encontrada</h3>
                <p className="text-gray-500">Tente alterar os filtros ou a busca</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                  const WorkModeIcon = workModeIcons[job.work_mode] || MapPin;
                  const typeColor = jobTypeColors[job.job_type] || jobTypeColors.clt;
                  const deadlineSoon = isDeadlineSoon(job.application_deadline);
                  const deadlinePassed = isDeadlinePassed(job.application_deadline);

                  return (
                    <Card key={job.id} className="hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border-l-4 border-ashbra-green">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className={typeColor}>{JOB_TYPES.find(t => t.value === job.job_type)?.label}</Badge>
                          {job.is_featured && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Destaque</Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mt-2">{job.title}</CardTitle>
                        <p className="text-ashbra-green font-semibold">{job.company}</p>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-gray-600 mb-4 flex-1">{job.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <WorkModeIcon className="h-4 w-4" />
                            <span>{workModeLabels[job.work_mode]}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>{formatSalary(job.salary_range)}</span>
                          </div>
                          {job.application_deadline && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span className={deadlinePassed ? 'text-red-600' : deadlineSoon ? 'text-orange-600' : 'text-gray-600'}>
                                Prazo: {new Date(job.application_deadline).toLocaleDateString('pt-BR')}
                                {deadlinePassed && ' (Encerrado)'}
                                {deadlineSoon && !deadlinePassed && ' (Urgente)'}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.requirements.slice(0, 3).map((req, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{req}</Badge>
                          ))}
                          {job.requirements.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{job.requirements.length - 3} mais</Badge>
                          )}
                        </div>

                        <Button 
                          variant={deadlinePassed ? "outline" : "default"} 
                          className="w-full mt-auto"
                          disabled={deadlinePassed}
                          onClick={() => window.location.href = `/vagas/${job.id}`}
                        >
                          {deadlinePassed ? 'Prazo Encerrado' : 'Candidatar-se'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-ashbra-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Empresa parceira? Anuncie sua vaga!</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Conecte-se com talentos diversos e comprometidos. A ASHBRA ajuda sua empresa a encontrar os melhores profissionais.
            </p>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-ashbra-green px-8 py-3">
              Anunciar Vaga
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
