import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useServices, SERVICE_CATEGORIES, useCreateService, useUpdateService, useDeleteService } from '@/hooks/useSupabase';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter, Save, X, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminServices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'documentacao',
    icon: '',
    image_url: '',
    requirements: '',
    how_to_access: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    is_active: true,
    is_featured: false,
    order_index: 0,
  });

  const { data: services, isLoading, refetch } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const filteredServices = services?.filter(s =>
    (categoryFilter === 'all' || s.category === categoryFilter) &&
    (statusFilter === 'all' || (statusFilter === 'active' ? s.is_active : !s.is_active)) &&
    (s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleOpenEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      icon: service.icon || '',
      image_url: service.image_url || '',
      requirements: service.requirements?.join(', ') || '',
      how_to_access: service.how_to_access,
      contact_email: service.contact_email || '',
      contact_phone: service.contact_phone || '',
      contact_address: service.contact_address || '',
      is_active: service.is_active,
      is_featured: service.is_featured,
      order_index: service.order_index,
    });
  };

  const handleCloseDialog = () => {
    setEditingService(null);
    setFormData({
      title: '', description: '', category: 'documentacao', icon: '', image_url: '',
      requirements: '', how_to_access: '', contact_email: '', contact_phone: '',
      contact_address: '', is_active: true, is_featured: false, order_index: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requirementsArray = formData.requirements.split(',').map(s => s.trim()).filter(Boolean);
    
    const payload = {
      ...formData,
      requirements: requirementsArray.length > 0 ? requirementsArray : null,
    };

    if (editingService) {
      await updateService.mutateAsync({ id: editingService.id, ...payload });
      toast({ title: 'Serviço atualizado!' });
    } else {
      await createService.mutateAsync(payload);
      toast({ title: 'Serviço criado!' });
    }
    handleCloseDialog();
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      await deleteService.mutateAsync(id);
      toast({ title: 'Serviço excluído!' });
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="h-8 w-8 text-haiti-blue" />
                Gerenciar Serviços
              </h1>
              <p className="text-gray-600 mt-1">Cadastre e gerencie os serviços oferecidos pela ASHBRA</p>
            </div>
            <Dialog open={!!editingService} onOpenChange={handleCloseDialog}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-2" /> Novo Serviço</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingService ? 'Editar Serviço' : 'Novo Serviço'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Título *</label>
                      <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Categoria *</label>
                      <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {SERVICE_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Ícone (nome do ícone Lucide)</label>
                      <Input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="FileText, Briefcase, Heart..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">URL da imagem</label>
                      <Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Descrição *</label>
                      <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Como acessar *</label>
                      <textarea value={formData.how_to_access} onChange={e => setFormData({...formData, how_to_access: e.target.value})} rows={3} className="w-full p-2 border rounded-lg" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Requisitos (separados por vírgula)</label>
                      <Input value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} placeholder="CPF, Comprovante de residência, Foto 3x4" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">E-mail de contato</label>
                      <Input type="email" value={formData.contact_email} onChange={e => setFormData({...formData, contact_email: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Telefone de contato</label>
                      <Input value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Endereço de atendimento</label>
                      <Input value={formData.contact_address} onChange={e => setFormData({...formData, contact_address: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Ordem</label>
                      <Input type="number" value={formData.order_index} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value)})} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-t pt-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="rounded border-gray-300 text-haiti-blue" />
                      <span className="text-sm">Ativo</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="rounded border-gray-300 text-haiti-blue" />
                      <span className="text-sm">Destaque na home</span>
                    </label>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-4">
                    <Button type="button" variant="outline" onClick={handleCloseDialog}><X className="h-4 w-4 mr-1" /> Cancelar</Button>
                    <Button type="submit" disabled={createService.isPending || updateService.isPending}>
                      <Save className="h-4 w-4 mr-1" /> {editingService ? 'Atualizar' : 'Criar'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input placeholder="Buscar serviços..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter} className="w-full md:w-48">
                  <SelectTrigger><SelectValue placeholder="Todas categorias" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {SERVICE_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-40">
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : filteredServices.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum serviço encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Serviço</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Categoria</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Destaque</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Ordem</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredServices.map(service => (
                        <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3">
                            <p className="font-medium">{service.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{SERVICE_CATEGORIES.find(c => c.value === service.category)?.label}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant={service.is_active ? 'default' : 'outline'}>{service.is_active ? 'Ativo' : 'Inativo'}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant={service.is_featured ? 'default' : 'outline'}>{service.is_featured ? 'Sim' : 'Não'}</Badge>
                          </td>
                          <td className="p-3 text-sm text-gray-500">{service.order_index}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(service)}><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(service.id)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </td>
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

export default AdminServices;
