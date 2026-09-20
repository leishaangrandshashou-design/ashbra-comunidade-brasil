import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '@/hooks/useSupabase';
import { Plus, Edit, Trash2, Search, Star, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTest, setEditingTest] = useState<any>(null);
  const [formData, setFormData] = useState({
    author_name: '', author_role: '', author_avatar_url: '',
    content: '', rating: 5, is_approved: false, is_featured: false, order_index: 0,
  });

  const { data: testimonials, isLoading, refetch } = useTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const filteredTests = testimonials?.filter(t =>
    (statusFilter === 'all' || (statusFilter === 'approved' ? t.is_approved : !t.is_approved)) &&
    (t.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleOpenEdit = (test: any) => {
    setEditingTest(test);
    setFormData({
      author_name: test.author_name, author_role: test.author_role || '',
      author_avatar_url: test.author_avatar_url || '', content: test.content,
      rating: test.rating || 5, is_approved: test.is_approved,
      is_featured: test.is_featured, order_index: test.order_index,
    });
  };

  const handleCloseDialog = () => { setEditingTest(null); setFormData({ author_name: '', author_role: '', author_avatar_url: '', content: '', rating: 5, is_approved: false, is_featured: false, order_index: 0 }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTest) { await updateTestimonial.mutateAsync({ id: editingTest.id, ...formData }); toast({ title: 'Depoimento atualizado!' }); }
    else { await createTestimonial.mutateAsync(formData); toast({ title: 'Depoimento criado!' }); }
    handleCloseDialog(); refetch();
  };

  const handleDelete = async (id: string) => { if (confirm('Excluir este depoimento?')) { await deleteTestimonial.mutateAsync(id); toast({ title: 'Depoimento excluído!' }); refetch(); } };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div><h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><Star className="h-8 w-8 text-yellow-500" /> Gerenciar Depoimentos</h1><p className="text-gray-600 mt-1">Modere e gerencie depoimentos da comunidade</p></div>
            <Dialog open={!!editingTest} onOpenChange={handleCloseDialog}>
              <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Novo Depoimento</Button></DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingTest ? 'Editar Depoimento' : 'Novo Depoimento'}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Nome do autor *</label><Input value={formData.author_name} onChange={e => setFormData({...formData, author_name: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Função/Cargo</label><Input value={formData.author_role} onChange={e => setFormData({...formData, author_role: e.target.value})} placeholder="Ex: Estudante, Trabalhador" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Depoimento *</label><textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={4} className="w-full p-2 border rounded-lg" required /></div>
                    <div><label className="block text-sm font-medium mb-1">Nota (1-5)</label><Select value={formData.rating} onValueChange={v => setFormData({...formData, rating: parseInt(v)})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{[5,4,3,2,1].map(n => <SelectItem key={n} value={n}>{'★'.repeat(n)}</SelectItem>)}</SelectContent></Select></div>
                    <div><label className="block text-sm font-medium mb-1">URL foto do autor</label><Input value={formData.author_avatar_url} onChange={e => setFormData({...formData, author_avatar_url: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Ordem</label><Input type="number" value={formData.order_index} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value)})} /></div>
                  </div>
                  <div className="flex items-center gap-4 border-t pt-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_approved} onChange={e => setFormData({...formData, is_approved: e.target.checked})} className="rounded border-gray-300 text-yellow-500" /><span className="text-sm">Aprovado</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="rounded border-gray-300 text-yellow-500" /><span className="text-sm">Destaque</span></label>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-4"><Button type="button" variant="outline" onClick={handleCloseDialog}><X className="h-4 w-4 mr-1" /> Cancelar</Button><Button type="submit" disabled={createTestimonial.isPending || updateTestimonial.isPending}><Save className="h-4 w-4 mr-1" /> {editingTest ? 'Atualizar' : 'Criar'}</Button></div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-6"><CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1"><Input placeholder="Buscar depoimentos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" /></div>
              <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="approved">Aprovados</SelectItem><SelectItem value="pending">Pendentes</SelectItem></SelectContent></Select>
            </div>
          </CardContent></Card>

          <Card>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : filteredTests.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum depoimento encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Autor</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Depoimento</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Nota</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Aprovado</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Destaque</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTests.map(test => (
                        <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3"><p className="font-medium">{test.author_name}</p><p className="text-sm text-gray-500">{test.author_role || 'Não informado'}</p></td>
                          <td className="p-3 max-w-xs"><p className="text-sm text-gray-600 line-clamp-2">{test.content}</p></td>
                          <td className="p-3">{'★'.repeat(test.rating || 0)}{'☆'.repeat(5 - (test.rating || 0))}</td>
                          <td className="p-3"><Badge variant={test.is_approved ? 'default' : 'outline'}>{test.is_approved ? 'Sim' : 'Não'}</Badge></td>
                          <td className="p-3"><Badge variant={test.is_featured ? 'default' : 'outline'}>{test.is_featured ? 'Sim' : 'Não'}</Badge></td>
                          <td className="p-3 text-right"><div className="flex items-center justify-end gap-1"><Button variant="ghost" size="sm" onClick={() => handleOpenEdit(test)}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(test.id)}><Trash2 className="h-4 w-4" /></Button></div></td>
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

export default AdminTestimonials;
