import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEvents, EVENT_CATEGORIES, useCreateEvent, useUpdateEvent, useDeleteEvent } from '@/hooks/useSupabase';
import { Plus, Edit, Trash2, Search, Calendar, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categoryColors: Record<string, string> = {
  cultural: 'bg-purple-100 text-purple-700',
  educativo: 'bg-blue-100 text-blue-700',
  social: 'bg-red-100 text-red-700',
  esportivo: 'bg-green-100 text-green-700',
  capacitacao: 'bg-yellow-100 text-yellow-700',
  networking: 'bg-orange-100 text-orange-700',
  outros: 'bg-gray-100 text-gray-700',
};

const AdminEvents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'cultural', start_date: '', end_date: '',
    start_time: '', end_time: '', location: '', address: '', online_url: '',
    max_students: '', image_url: '', organizer: '', contact_email: '', contact_phone: '',
    registration_url: '', registration_deadline: '', is_free: true, cost: '', currency: 'BRL',
    is_active: true, is_featured: false, order_index: 0,
  });

  const { data: events, isLoading, refetch } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const filteredEvents = events?.filter(e =>
    (categoryFilter === 'all' || e.category === categoryFilter) &&
    (statusFilter === 'all' || (statusFilter === 'active' ? e.is_active : !e.is_active)) &&
    (e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleOpenEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title, description: event.description, category: event.category,
      start_date: event.start_date, end_date: event.end_date || '',
      start_time: event.start_time || '', end_time: event.end_time || '',
      location: event.location || '', address: event.address || '', online_url: event.online_url || '',
      max_students: event.max_students || '', image_url: event.image_url || '',
      organizer: event.organizer || '', contact_email: event.contact_email || '',
      contact_phone: event.contact_phone || '', registration_url: event.registration_url || '',
      registration_deadline: event.registration_deadline ? event.registration_deadline.split('T')[0] : '',
      is_free: event.is_free, cost: event.cost || '', currency: event.currency,
      is_active: event.is_active, is_featured: event.is_featured, order_index: event.order_index,
    });
  };

  const handleCloseDialog = () => { setEditingEvent(null); setFormData({ title: '', description: '', category: 'cultural', start_date: '', end_date: '', start_time: '', end_time: '', location: '', address: '', online_url: '', max_students: '', image_url: '', organizer: '', contact_email: '', contact_phone: '', registration_url: '', registration_deadline: '', is_free: true, cost: '', currency: 'BRL', is_active: true, is_featured: false, order_index: 0 }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      max_students: formData.max_students ? parseInt(formData.max_students) : null,
      cost: formData.cost ? parseFloat(formData.cost) : null,
      end_date: formData.end_date || null,
      registration_deadline: formData.registration_deadline ? new Date(formData.registration_deadline).toISOString() : null,
    };
    if (editingEvent) { await updateEvent.mutateAsync({ id: editingEvent.id, ...payload }); toast({ title: 'Evento atualizado!' }); }
    else { await createEvent.mutateAsync(payload); toast({ title: 'Evento criado!' }); }
    handleCloseDialog(); refetch();
  };

  const handleDelete = async (id: string) => { if (confirm('Excluir este evento?')) { await deleteEvent.mutateAsync(id); toast({ title: 'Evento excluído!' }); refetch(); } };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div><h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><Calendar className="h-8 w-8 text-haiti-red" /> Gerenciar Eventos</h1><p className="text-gray-600 mt-1">Cadastre e gerencie eventos comunitários</p></div>
            <Dialog open={!!editingEvent} onOpenChange={handleCloseDialog}>
              <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Novo Evento</Button></DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingEvent ? 'Editar Evento' : 'Novo Evento'}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Título *</label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Categoria *</label><Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{EVENT_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Descrição *</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-2 border rounded-lg" required /></div>
                    <div><label className="block text-sm font-medium mb-1">Data início *</label><Input type="date" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Data fim</label><Input type="date" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Hora início</label><Input type="time" value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Hora fim</label><Input type="time" value={formData.end_time} onChange={e => setFormData({...formData, end_time: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Local</label><Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Ex: Centro Comunitário" /></div>
                    <div><label className="block text-sm font-medium mb-1">Endereço completo</label><Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Rua, número, bairro" /></div>
                    <div><label className="block text-sm font-medium mb-1">URL online</label><Input value={formData.online_url} onChange={e => setFormData({...formData, online_url: e.target.value})} placeholder="https://zoom.us/..." /></div>
                    <div><label className="block text-sm font-medium mb-1">Máx. participantes</label><Input type="number" value={formData.max_students} onChange={e => setFormData({...formData, max_students: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">URL imagem</label><Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Organizador</label><Input value={formData.organizer} onChange={e => setFormData({...formData, organizer: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">E-mail contato</label><Input type="email" value={formData.contact_email} onChange={e => setFormData({...formData, contact_email: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Telefone contato</label><Input value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">URL inscrição</label><Input value={formData.registration_url} onChange={e => setFormData({...formData, registration_url: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Prazo inscrição</label><Input type="date" value={formData.registration_deadline} onChange={e => setFormData({...formData, registration_deadline: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Valor</label><Input type="number" step="0.01" value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} placeholder="0 para gratuito" /></div>
                    <div><label className="block text-sm font-medium mb-1">Moeda</label><Input value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Ordem</label><Input type="number" value={formData.order_index} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value)})} /></div>
                  </div>
                  <div className="flex items-center gap-4 border-t pt-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_free} onChange={e => setFormData({...formData, is_free: e.target.checked})} className="rounded border-gray-300 text-haiti-red" /><span className="text-sm">Gratuito</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="rounded border-gray-300 text-haiti-red" /><span className="text-sm">Ativo</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="rounded border-gray-300 text-haiti-red" /><span className="text-sm">Destaque</span></label>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-4"><Button type="button" variant="outline" onClick={handleCloseDialog}><X className="h-4 w-4 mr-1" /> Cancelar</Button><Button type="submit" disabled={createEvent.isPending || updateEvent.isPending}><Save className="h-4 w-4 mr-1" /> {editingEvent ? 'Atualizar' : 'Criar'}</Button></div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-6"><CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1"><Input placeholder="Buscar eventos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" /></div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter} className="w-full md:w-48"><SelectTrigger><SelectValue placeholder="Categoria" /></SelectTrigger><SelectContent><SelectItem value="all">Todas</SelectItem>{EVENT_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent></Select>
              <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todas</SelectItem><SelectItem value="active">Ativos</SelectItem><SelectItem value="inactive">Inativos</SelectItem></SelectContent></Select>
            </div>
          </CardContent></Card>

          <Card>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum evento encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Evento</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Categoria</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Data</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Local</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Inscrições até</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map(event => (
                        <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3"><p className="font-medium">{event.title}</p><p className="text-sm text-gray-500 line-clamp-1">{event.description}</p></td>
                          <td className="p-3"><Badge className={categoryColors[event.category]}>{EVENT_CATEGORIES.find(c => c.value === event.category)?.label}</Badge></td>
                          <td className="p-3">{new Date(event.start_date).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })} {event.start_time ? ` ${event.start_time}` : ''}</td>
                          <td className="p-3">{event.location || event.online_url ? 'Online' : 'Presencial'}</td>
                          <td className="p-3"><Badge variant={event.is_active ? 'default' : 'outline'}>{event.is_active ? 'Ativo' : 'Inativo'}</Badge></td>
                          <td className="p-3 text-sm text-gray-500">{event.registration_deadline ? new Date(event.registration_deadline).toLocaleDateString('pt-BR') : 'Não definido'}</td>
                          <td className="p-3 text-right"><div className="flex items-center justify-end gap-1"><Button variant="ghost" size="sm" onClick={() => handleOpenEdit(event)}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(event.id)}><Trash2 className="h-4 w-4" /></Button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminEvents;
