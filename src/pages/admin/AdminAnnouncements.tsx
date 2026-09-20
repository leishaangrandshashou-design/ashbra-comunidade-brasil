import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAnnouncements, useCreateAnnouncement, useUpdateAnnouncement, useDeleteAnnouncement } from '@/hooks/useSupabase';
import { Plus, Edit, Trash2, Search, Bell, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const priorityColors: Record<string, string> = {
  baixa: 'bg-gray-100 text-gray-700',
  normal: 'bg-blue-100 text-blue-700',
  alta: 'bg-orange-100 text-orange-700',
  urgente: 'bg-red-100 text-red-700',
};

const AdminAnnouncements = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingAnn, setEditingAnn] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', content: '', category: '', priority: 'normal',
    target_audience: '', image_url: '', link_url: '', link_text: '',
    published_at: '', expires_at: '', is_active: true, is_pinned: false,
  });

  const { data: announcements, isLoading, refetch } = useAnnouncements();
  const createAnnouncement = useCreateAnnouncement();
  const updateAnnouncement = useUpdateAnnouncement();
  const deleteAnnouncement = useDeleteAnnouncement();

  const filteredAnn = announcements?.filter(a =>
    (statusFilter === 'all' || (statusFilter === 'active' ? a.is_active : !a.is_active)) &&
    (a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleOpenEdit = (ann: any) => {
    setEditingAnn(ann);
    setFormData({
      title: ann.title, content: ann.content, category: ann.category,
      priority: ann.priority, target_audience: ann.target_audience?.join(', ') || '',
      image_url: ann.image_url || '', link_url: ann.link_url || '',
      link_text: ann.link_text || '', published_at: ann.published_at ? ann.published_at.split('T')[0] : '',
      expires_at: ann.expires_at ? ann.expires_at.split('T')[0] : '',
      is_active: ann.is_active, is_pinned: ann.is_pinned,
    });
  };

  const handleCloseDialog = () => { setEditingAnn(null); setFormData({ title: '', content: '', category: '', priority: 'normal', target_audience: '', image_url: '', link_url: '', link_text: '', published_at: '', expires_at: '', is_active: true, is_pinned: false }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      target_audience: formData.target_audience.split(',').map(s => s.trim()).filter(Boolean),
      published_at: formData.published_at ? new Date(formData.published_at).toISOString() : null,
      expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
    };
    if (editingAnn) { await updateAnnouncement.mutateAsync({ id: editingAnn.id, ...payload }); toast({ title: 'Comunicado atualizado!' }); }
    else { await createAnnouncement.mutateAsync(payload); toast({ title: 'Comunicado criado!' }); }
    handleCloseDialog(); refetch();
  };

  const handleDelete = async (id: string) => { if (confirm('Excluir este comunicado?')) { await deleteAnnouncement.mutateAsync(id); toast({ title: 'Comunicado excluído!' }); refetch(); } };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div><h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><Bell className="h-8 w-8 text-orange-500" /> Gerenciar Comunicados</h1><p className="text-gray-600 mt-1">Cadastre e gerencie comunicados e avisos</p></div>
            <Dialog open={!!editingAnn} onOpenChange={handleCloseDialog}>
              <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Novo Comunicado</Button></DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingAnn ? 'Editar Comunicado' : 'Novo Comunicado'}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Título *</label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Categoria *</label><Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Ex: Geral, Urgente, Evento" required /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Conteúdo *</label><textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={4} className="w-full p-2 border rounded-lg" required /></div>
                    <div><label className="block text-sm font-medium mb-1">Prioridade *</label><Select value={formData.priority} onValueChange={v => setFormData({...formData, priority: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="baixa">Baixa</SelectItem><SelectItem value="normal">Normal</SelectItem><SelectItem value="alta">Alta</SelectItem><SelectItem value="urgente">Urgente</SelectItem></SelectContent></Select></div>
                    <div><label className="block text-sm font-medium mb-1">Público-alvo (vírgula)</label><Input value={formData.target_audience} onChange={e => setFormData({...formData, target_audience: e.target.value})} placeholder="community, volunteer, partner" /></div>
                    <div><label className="block text-sm font-medium mb-1">URL imagem</label><Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">URL link</label><Input value={formData.link_url} onChange={e => setFormData({...formData, link_url: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Texto do link</label><Input value={formData.link_text} onChange={e => setFormData({...formData, link_text: e.target.value})} placeholder="Saiba mais" /></div>
                    <div><label className="block text-sm font-medium mb-1">Publicado em</label><Input type="date" value={formData.published_at} onChange={e => setFormData({...formData, published_at: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Expira em</label><Input type="date" value={formData.expires_at} onChange={e => setFormData({...formData, expires_at: e.target.value})} /></div>
                  </div>
                  <div className="flex items-center gap-4 border-t pt-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="rounded border-gray-300 text-orange-500" /><span className="text-sm">Ativo</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_pinned} onChange={e => setFormData({...formData, is_pinned: e.target.checked})} className="rounded border-gray-300 text-orange-500" /><span className="text-sm">Fixado no topo</span></label>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-4"><Button type="button" variant="outline" onClick={handleCloseDialog}><X className="h-4 w-4 mr-1" /> Cancelar</Button><Button type="submit" disabled={createAnnouncement.isPending || updateAnnouncement.isPending}><Save className="h-4 w-4 mr-1" /> {editingAnn ? 'Atualizar' : 'Criar'}</Button></div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-6"><CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1"><Input placeholder="Buscar comunicados..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" /></div>
              <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="active">Ativos</SelectItem><SelectItem value="inactive">Inativos</SelectItem></SelectContent></Select>
            </div>
          </CardContent></Card>

          <Card>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : filteredAnn.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum comunicado encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Comunicado</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Categoria</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Prioridade</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Público</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Fixado</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAnn.map(ann => (
                        <tr key={ann.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3"><p className="font-medium">{ann.title}</p><p className="text-sm text-gray-500 line-clamp-1">{ann.content}</p></td>
                          <td className="p-3">{ann.category}</td>
                          <td className="p-3"><Badge className={priorityColors[ann.priority]}>{ann.priority}</Badge></td>
                          <td className="p-3 text-sm text-gray-500">{ann.target_audience?.join(', ')}</td>
                          <td className="p-3"><Badge variant={ann.is_active ? 'default' : 'outline'}>{ann.is_active ? 'Ativo' : 'Inativo'}</Badge></td>
                          <td className="p-3"><Badge variant={ann.is_pinned ? 'default' : 'outline'}>{ann.is_pinned ? 'Sim' : 'Não'}</Badge></td>
                          <td className="p-3 text-right"><div className="flex items-center justify-end gap-1"><Button variant="ghost" size="sm" onClick={() => handleOpenEdit(ann)}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(ann.id)}><Trash2 className="h-4 w-4" /></Button></div></td>
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

export default AdminAnnouncements;
