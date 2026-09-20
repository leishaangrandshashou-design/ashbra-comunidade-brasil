import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCourses, COURSE_MODALITIES, COURSE_LEVELS } from '@/hooks/useSupabase';
import { GraduationCap, Calendar, Clock, Award, MapPin, Monitor, Smartphone, DollarSign, BookOpen } from 'lucide-react';

const modalityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  presencial: MapPin,
  online: Monitor,
  hibrido: Smartphone,
};

const modalityLabels: Record<string, string> = {
  presencial: 'Presencial',
  online: 'Online',
  hibrido: 'Híbrido',
};

const levelColors: Record<string, string> = {
  basico: 'bg-green-500/10 text-green-600 border-green-500/20',
  intermediario: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  avancado: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  tecnico: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  superior: 'bg-red-500/10 text-red-600 border-red-500/20',
  'pos-graduacao': 'bg-pink-500/10 text-pink-600 border-pink-500/20',
};

const formatPrice = (cost: number | null, currency: string) => {
  if (!cost || cost === 0) return 'Gratuito';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(cost);
};

const Courses = () => {
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: courses, isLoading } = useCourses({
    modality: selectedModality !== 'all' ? selectedModality : undefined,
    level: selectedLevel !== 'all' ? selectedLevel : undefined,
  });

  const filteredCourses = courses?.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const isEnrollmentOpen = (deadline: string | null) => {
    if (!deadline) return true;
    return new Date(deadline).getTime() > Date.now();
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-ashbra-yellow via-haiti-blue to-ashbra-green">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Cursos e <span className="text-white">Capacitação</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Desenvolva suas habilidades com cursos de instituições parceiras e conquiste novas oportunidades
            </p>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Buscar cursos por título, instituição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  aria-label="Buscar cursos"
                />
              </div>
              <Select value={selectedModality} onValueChange={setSelectedModality} className="w-full md:w-40">
                <SelectTrigger aria-label="Filtrar por modalidade">
                  <SelectValue placeholder="Modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {COURSE_MODALITIES.map(mode => (
                    <SelectItem key={mode.value} value={mode.value}>{mode.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel} className="w-full md:w-40">
                <SelectTrigger aria-label="Filtrar por nível">
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {COURSE_LEVELS.map(level => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Courses Grid */}
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
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum curso encontrado</h3>
                <p className="text-gray-500">Tente alterar os filtros ou a busca</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const ModalityIcon = modalityIcons[course.modality] || MapPin;
                  const levelColor = levelColors[course.level] || levelColors.basico;
                  const enrollmentOpen = isEnrollmentOpen(course.enrollment_deadline);
                  const hasStarted = course.start_date && new Date(course.start_date).getTime() <= Date.now();
                  const hasEnded = course.end_date && new Date(course.end_date).getTime() < Date.now();

                  return (
                    <Card key={course.id} className="hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border-l-4 border-ashbra-yellow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{course.category}</Badge>
                          {course.is_featured && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Destaque</Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
                        <p className="text-ashbra-yellow font-semibold">{course.institution}</p>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-gray-600 mb-4 flex-1">{course.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <ModalityIcon className="h-4 w-4" />
                            <span>{modalityLabels[course.modality]}</span>
                          </div>
                          <Badge className={levelColor}>{COURSE_LEVELS.find(l => l.value === course.level)?.label}</Badge>
                          {course.duration_hours && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration_hours} horas</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>{formatPrice(course.cost, course.currency)}</span>
                          </div>
                          {course.certificate && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <Award className="h-4 w-4" />
                              <span>Certificado incluso</span>
                            </div>
                          )}
                          {course.start_date && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Início: {new Date(course.start_date).toLocaleDateString('pt-BR')}
                                {course.end_date && ` - Fim: ${new Date(course.end_date).toLocaleDateString('pt-BR')}`}
                              </span>
                            </div>
                          )}
                          {course.enrollment_deadline && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span className={enrollmentOpen ? 'text-gray-600' : 'text-red-600'}>
                                Inscrições até: {new Date(course.enrollment_deadline).toLocaleDateString('pt-BR')}
                                {!enrollmentOpen && ' (Encerradas)'}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.prerequisites?.slice(0, 2).map((req, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{req}</Badge>
                          ))}
                          {(course.prerequisites?.length || 0) > 2 && (
                            <Badge variant="outline" className="text-xs">+{course.prerequisites.length - 2} mais</Badge>
                          )}
                        </div>

                        <Button 
                          variant={!enrollmentOpen || hasEnded ? "outline" : "default"} 
                          className="w-full mt-auto"
                          disabled={!enrollmentOpen || hasEnded}
                          onClick={() => window.location.href = `/cursos/${course.id}`}
                        >
                          {!enrollmentOpen || hasEnded ? 'Inscrições Encerradas' : 'Inscrever-se'}
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
        <section className="py-16 bg-haiti-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Instituição de ensino? Parceria conosco!</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ofereça seus cursos para a comunidade imigrante. A ASHBRA conecta sua instituição a alunos motivados.
            </p>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-haiti-blue px-8 py-3">
              Seja Parceiro
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
