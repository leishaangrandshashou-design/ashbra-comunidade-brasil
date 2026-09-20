import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useServices, SERVICE_CATEGORIES } from '@/hooks/useSupabase';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LucideIcon, FileText, Briefcase, GraduationCap, Heart, HeartPulse, Scale, Music, MoreHorizontal } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  documentacao: FileText,
  emprego: Briefcase,
  educacao: GraduationCap,
  social: Heart,
  saude: HeartPulse,
  juridico: Scale,
  cultural: Music,
  outros: MoreHorizontal,
};

const categoryColors: Record<string, string> = {
  documentacao: 'bg-haiti-blue/10 text-haiti-blue border-haiti-blue/20',
  emprego: 'bg-ashbra-green/10 text-ashbra-green border-ashbra-green/20',
  educacao: 'bg-ashbra-yellow/10 text-ashbra-yellow border-ashbra-yellow/20',
  social: 'bg-haiti-red/10 text-haiti-red border-haiti-red/20',
  saude: 'bg-red-500/10 text-red-500 border-red-500/20',
  juridico: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  cultural: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  outros: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: services, isLoading } = useServices(selectedCategory !== 'all' ? selectedCategory : undefined);

  const filteredServices = services?.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-haiti-blue via-haiti-red to-ashbra-green">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Nossos <span className="text-ashbra-yellow">Serviços</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Conheça todos os serviços oferecidos pela ASHBRA para apoiar a comunidade haitiana e imigrantes no Brasil
            </p>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  aria-label="Buscar serviços"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-48">
                <SelectTrigger aria-label="Filtrar por categoria">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {SERVICE_CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Services Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum serviço encontrado</h3>
                <p className="text-gray-500">Tente alterar os filtros ou a busca</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => {
                  const Icon = categoryIcons[service.category] || MoreHorizontal;
                  const categoryColor = categoryColors[service.category] || categoryColors.outros;
                  const categoryLabel = SERVICE_CATEGORIES.find(c => c.value === service.category)?.label || service.category;

                  return (
                    <Card key={service.id} className="hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className={categoryColor}>{categoryLabel}</Badge>
                          {service.is_featured && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Destaque</Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mt-2">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.requirements?.slice(0, 3).map((req, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{req}</Badge>
                          ))}
                          {(service.requirements?.length || 0) > 3 && (
                            <Badge variant="outline" className="text-xs">+{service.requirements.length - 3} mais</Badge>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-auto"
                          onClick={() => window.location.href = `/servicos/${service.id}`}
                        >
                          Saiba mais
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Precisa de ajuda personalizada?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para atender você. Agende um atendimento presencial ou entre em contato pelo WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-ashbra-yellow hover:bg-ashbra-yellow/90 text-black font-semibold px-8 py-3">
                Agendar Atendimento
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-haiti-blue px-8 py-3">
                WhatsApp: (41) 99813-6033
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
