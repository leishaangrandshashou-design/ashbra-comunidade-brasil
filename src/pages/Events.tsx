import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEvents, EVENT_CATEGORIES } from '@/hooks/useSupabase';
import { Calendar, Clock, MapPin, Monitor, Users, Ticket, DollarSign, AlertCircle } from 'lucide-react';

const categoryColors: Record<string, string> = {
  cultural: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  educativo: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  social: 'bg-haiti-red/10 text-haiti-red border-haiti-red/20',
  esportivo: 'bg-green-500/10 text-green-600 border-green-500/20',
  capacitacao: 'bg-ashbra-yellow/10 text-ashbra-yellow border-ashbra-yellow/20',
  networking: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  outros: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

const categoryLabels: Record<string, string> = {
  cultural: 'Cultural',
  educativo: 'Educativo',
  social: 'Social',
  esportivo: 'Esportivo',
  capacitacao: 'Capacitação',
  networking: 'Networking',
  outros: 'Outros',
};

const formatPrice = (cost: number | null, currency: string) => {
  if (!cost || cost === 0) return 'Gratuito';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(cost);
};

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: events, isLoading } = useEvents({
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    upcoming: showUpcoming,
  });

  const filteredEvents = events?.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const isEventPassed = (endDate: string | null) => {
    if (!endDate) return false;
    return new Date(endDate).getTime() < Date.now();
  };

  const isEventToday = (startDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    return startDate === today;
  };

  const isEventSoon = (startDate: string) => {
    const days = (new Date(startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days <= 7 && days > 0;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-haiti-red via-haiti-blue to-ashbra-green">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Eventos <span className="text-ashbra-yellow">Comunitários</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Participe de eventos culturais, educativos e sociais que fortalecem a integração
            </p>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  aria-label="Buscar eventos"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-48">
                <SelectTrigger aria-label="Filtrar por categoria">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {EVENT_CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUpcoming}
                  onChange={(e) => setShowUpcoming(e.target.checked)}
                  className="rounded border-gray-300 text-haiti-blue focus:ring-haiti-blue"
                />
                <span className="text-sm text-gray-600">Apenas próximos</span>
              </label>
            </div>

            {/* Events Grid */}
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
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum evento encontrado</h3>
                <p className="text-gray-500">Tente alterar os filtros ou a busca</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const categoryColor = categoryColors[event.category] || categoryColors.outros;
                  const passed = isEventPassed(event.end_date || event.start_date);
                  const today = isEventToday(event.start_date);
                  const soon = isEventSoon(event.start_date);

                  return (
                    <Card key={event.id} className={`hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${passed ? 'opacity-60' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className={categoryColor}>{categoryLabels[event.category]}</Badge>
                          {event.is_featured && (
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Destaque</Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mt-2">{event.title}</CardTitle>
                        {event.organizer && <p className="text-ashbra-yellow font-semibold">{event.organizer}</p>}
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-gray-600 mb-4 flex-1">{event.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(event.start_date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                              {event.end_date && event.end_date !== event.start_date && ` a ${new Date(event.end_date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}`}
                            </span>
                          </div>
                          {event.start_time && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{event.start_time}{event.end_time && ` - ${event.end_time}`}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.address && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-4 w-4" />
                              <span>{event.address}</span>
                            </div>
                          )}
                          {event.online_url && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Monitor className="h-4 w-4" />
                              <span>Online disponível</span>
                            </div>
                          )}
                          {event.max_attendees && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="h-4 w-4" />
                              <span>Máx. {event.max_attendees} participantes</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="h-4 w-4" />
                            <span>{event.is_free ? 'Gratuito' : formatPrice(event.cost, event.currency)}</span>
                          </div>
                          {event.registration_deadline && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span className={new Date(event.registration_deadline).getTime() < Date.now() ? 'text-red-600' : 'text-gray-600'}>
                                Inscrições até: {new Date(event.registration_deadline).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          )}
                        </div>

                        {(today || soon) && !passed && (
                          <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-yellow-800">
                              <AlertCircle className="h-4 w-4" />
                              <span>{today ? 'Evento acontece HOJE!' : 'Evento esta semana!'}</span>
                            </div>
                          </div>
                        )}

                        <Button 
                          variant={passed || !showUpcoming ? "outline" : "default"} 
                          className="w-full mt-auto"
                          disabled={passed}
                          onClick={() => window.location.href = `/eventos/${event.id}`}
                        >
                          {passed ? 'Evento Encerrado' : 'Inscrever-se'}
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
        <section className="py-16 bg-haiti-red text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quer organizar um evento conosco?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              A ASHBRA apoia a realização de eventos comunitários. Entre em contato para parcerias.
            </p>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-haiti-red px-8 py-3">
              Propor Evento
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
