import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDocuments, DOCUMENT_TYPES, useCreateDocument, useUpdateDocument, useDeleteDocument } from '@/hooks/useSupabase';
import { Plus, Edit, Trash2, Search, FileText, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const typeColors: Record<string, string> = {
  guia: 'bg-blue-100 text-blue-700',
  formulario: 'bg-green-100 text-green-700',
  lei: 'bg-purple-100 text-purple-700',
  decreto: 'bg-red-100 text-red-700',
  manual: 'bg-orange-100 text-orange-700',
  cartilha: 'bg-pink-100 text-pink-700',
  modelo: 'bg-yellow-100 text-yellow-700',
  outros: 'bg-gray-100 text-gray-700',
};

const AdminDocuments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingDoc, setEditingDoc] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', document_type: 'guia',
    file_url: '', external_url: '', language: 'pt-BR', version: '',
    issuing_authority: '', valid_from: '', valid_until: '', tags: '',
    is_public: true, is_active: true, order_index: 0,
  });

  const { data: documents, isLoading, refetch } = useDocuments();
  const createDocument = useCreateDocument();
  const updateDocument = useUpdateDocument();
  const deleteDocument = useDeleteDocument();

  const filteredDocuments = documents?.filter(d =>
    (typeFilter === 'all' || d.document_type === typeFilter) &&
    (statusFilter === 'all' || (statusFilter === 'active' ? d.is_active : !d.is_active)) &&
    (d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleOpenEdit = (doc: any) => {
    setEditingDoc(doc);
    setFormData({
      title: doc.title, description: doc.description, category: doc.category,
      document_type: doc.document_type, file_url: doc.file_url || '',
      external_url: doc.external_url || '', language: doc.language,
      version: doc.version || '', issuing_authority: doc.issuing_authority || '',
      valid_from: doc.valid_from || '', valid_until: doc.valid_until || '',
      tags: doc.tags?.join(', ') || '', is_public: doc.is_public,
      is_active: doc.is_active, order_index: doc.order_index,
    });
  };

  const handleCloseDialog = () => { setEditingDoc(null); setFormData({ title: '', description: '', category: '', document_type: 'guia', file_url: '', external_url: '', language: 'pt-BR', version: '', issuing_authority: '', valid_from: '', valid_until: '', tags: '', is_public: true, is_active: true, order_index: 0 }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean) || null,
      valid_from: formData.valid_from || null,
      valid_until: formData.valid_until || null,
    };
    if (editingDoc) { await updateDocument.mutateAsync({ id: editingDoc.id, ...payload }); toast({ title: 'Documento atualizado!' }); }
    else { await createDocument.mutateAsync(payload); toast({ title: 'Documento criado!' }); }
    handleCloseDialog(); refetch();
  };

  const handleDelete = async (id: string) => { if (confirm('Excluir este documento?')) { await deleteDocument.mutateAsync(id); toast({ title: 'Documento excluído!' }); refetch(); } };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div><h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><FileText className="h-8 w-8 text-haiti-blue" /> Gerenciar Documentos</h1><p className="text-gray-600 mt-1">Cadastre e gerencie documentos oficiais</p></div>
            <Dialog open={!!editingDoc} onOpenChange={handleCloseDialog}>
              <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Novo Documento</Button></DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingDoc ? 'Editar Documento' : 'Novo Documento'}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Título *</label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Categoria *</label><Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Ex: Imigração, Trabalho" required /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Descrição *</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-2 border rounded-lg" required /></div>
                    <div><label className="block text-sm font-medium mb-1">Tipo *</label><Select value={formData.document_type} onValueChange={v => setFormData({...formData, document_type: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{DOCUMENT_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select></div>
                    <div><label className="block text-sm font-medium mb-1">URL do arquivo</label><Input value={formData.file_url} onChange={e => setFormData({...formData, file_url: e.target.value})} placeholder="https://..." /></div>
                    <div><label className="block text-sm font-medium mb-1">URL externa</label><Input value={formData.external_url} onChange={e => setFormData({...formData, external_url: e.target.value})} placeholder="https://..." /></div>
                    <div><label className="block text-sm font-medium mb-1">Idioma</label><Input value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Versão</label><Input value={formData.version} onChange={e => setFormData({...formData, version: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Órgão emissor</label><Input value={formData.issuing_authority} onChange={e => setFormData({...formData, issuing_authority: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Válido desde</label><Input type="date" value={formData.valid_from} onChange={e => setFormData({...formData, valid_from: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Válido até</label><Input type="date" value={formData.valid_until} onChange={e => setFormData({...formData, valid_until: e.target.value})} /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Tags (vírgula)</label><Input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="visto, trabalho, renovação" /></div>
                    <div><label className="block text-sm font-medium mb-1">Ordem</label><Input type="number" value={formData.order_index} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value)})} /></div>
                  </div>
                  <div className="flex items-center gap-4 border-t pt-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_public} onChange={e => setFormData({...formData, is_public: e.target.checked})} className="rounded border-gray-300 text-haiti-blue" /><span className="text-sm">Público</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="rounded border-gray-300 text-haiti-blue" /><span className="text-sm">Ativo</span></label>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-4"><Button type="button" variant="outline" onClick={handleCloseDialog}><X className="h-4 w-4 mr-1" /> Cancelar</Button><Button type="submit" disabled={createDocument.isPending || updateDocument.isPending}><Save className="h-4 w-4 mr-1" /> {editingDoc ? 'Atualizar' : 'Criar'}</Button></div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-6"><CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1"><Input placeholder="Buscar documentos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" /></div>
              <Select value={typeFilter} onValueChange={setTypeFilter} className="w-full md:w-48"><SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem>{DOCUMENT_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select>
              <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="active">Ativos</SelectItem><SelectItem value="inactive">Inativos</SelectItem></SelectContent></Select>
            </div>
          </CardContent></Card>

          <Card>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : filteredDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum documento encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Documento</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Tipo</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Categoria</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Público</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Validade</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map(doc => (
                        <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3"><p className="font-medium">{doc.title}</p><p className="text-sm text-gray-500 line-clamp-1">{doc.description}</p></td>
                          <td className="p-3"><Badge className={typeColors[doc.document_type]}>{DOCUMENT_TYPES.find(t => t.value === doc.document_type)?.label}</Badge></td>
                          <td className="p-3">{doc.category}</td>
                          <td className="p-3"><Badge variant={doc.is_active ? 'default' : 'outline'}>{doc.is_active ? 'Ativo' : 'Inativo'}</Badge></td>
                          <td className="p-3"><Badge variant={doc.is_public ? 'default' : 'outline'}>{doc.is_public ? 'Sim' : 'Não'}</Badge></td>
                          <td className="p-3 text-sm text-gray-500">{doc.valid_until ? new Date(doc.valid_until).toLocaleDateString('pt-BR') : 'Indeterminado'}</td>
                          <td className="p-3 text-right"><div className="flex items-center justify-end gap-1"><Button variant="ghost" size="sm" onClick={() => handleOpenEdit(doc)}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(doc.id)}><Trash2 className="h-4 w-4" /></Button></div></td>
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

export default AdminDocuments;
