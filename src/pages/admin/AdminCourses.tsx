import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCourses, COURSE_MODALITIES, COURSE_LEVELS, useCreateCourse, useUpdateCourse, useDeleteCourse } from '@/hooks/useSupabase';
import { Plus, Edit, Trash2, Search, GraduationCap, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const modalityColors: Record<string, string> = {
  presencial: 'bg-blue-100 text-blue-700',
  online: 'bg-green-100 text-green-700',
  hibrido: 'bg-purple-100 text-purple-700',
};

const AdminCourses = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalityFilter, setModalityFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', institution: '', instructor: '',
    duration_hours: '', modality: 'presencial', level: 'basico', prerequisites: '',
    syllabus: '', certificate: false, cost: '', currency: 'BRL',
    start_date: '', end_date: '', enrollment_deadline: '', max_students: '',
    image_url: '', contact_email: '', contact_phone: '', enrollment_url: '',
    is_active: true, is_featured: false, order_index: 0,
  });

  const { data: courses, isLoading, refetch } = useCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const filteredCourses = courses?.filter(c =>
    (modalityFilter === 'all' || c.modality === modalityFilter) &&
    (levelFilter === 'all' || c.level === levelFilter) &&
    (statusFilter === 'all' || (statusFilter === 'active' ? c.is_active : !c.is_active)) &&
    (c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleOpenEdit = (course: any) => {
    setEditingCourse(course);
    setFormData({
      title: course.title, description: course.description, category: course.category,
      institution: course.institution, instructor: course.instructor || '',
      duration_hours: course.duration_hours || '', modality: course.modality, level: course.level,
      prerequisites: course.prerequisites?.join(', ') || '', syllabus: course.syllabus || '',
      certificate: course.certificate, cost: course.cost || '', currency: course.currency,
      start_date: course.start_date || '', end_date: course.end_date || '',
      enrollment_deadline: course.enrollment_deadline ? course.enrollment_deadline.split('T')[0] : '',
      max_students: course.max_students || '', image_url: course.image_url || '',
      contact_email: course.contact_email || '', contact_phone: course.contact_phone || '',
      enrollment_url: course.enrollment_url || '', is_active: course.is_active,
      is_featured: course.is_featured, order_index: course.order_index,
    });
  };

  const handleCloseDialog = () => { setEditingCourse(null); setFormData({ title: '', description: '', category: '', institution: '', instructor: '', duration_hours: '', modality: 'presencial', level: 'basico', prerequisites: '', syllabus: '', certificate: false, cost: '', currency: 'BRL', start_date: '', end_date: '', enrollment_deadline: '', max_students: '', image_url: '', contact_email: '', contact_phone: '', enrollment_url: '', is_active: true, is_featured: false, order_index: 0 }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      duration_hours: formData.duration_hours ? parseInt(formData.duration_hours) : null,
      prerequisites: formData.prerequisites.split(',').map(s => s.trim()).filter(Boolean) || null,
      cost: formData.cost ? parseFloat(formData.cost) : null,
      max_students: formData.max_students ? parseInt(formData.max_students) : null,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      enrollment_deadline: formData.enrollment_deadline ? new Date(formData.enrollment_deadline).toISOString() : null,
    };
    if (editingCourse) { await updateCourse.mutateAsync({ id: editingCourse.id, ...payload }); toast({ title: 'Curso atualizado!' }); }
    else { await createCourse.mutateAsync(payload); toast({ title: 'Curso criado!' }); }
    handleCloseDialog(); refetch();
  };

  const handleDelete = async (id: string) => { if (confirm('Excluir este curso?')) { await deleteCourse.mutateAsync(id); toast({ title: 'Curso excluído!' }); refetch(); } };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div><h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><GraduationCap className="h-8 w-8 text-ashbra-yellow" /> Gerenciar Cursos</h1><p className="text-gray-600 mt-1">Cadastre e gerencie cursos de capacitação</p></div>
            <Dialog open={!!editingCourse} onOpenChange={handleCloseDialog}>
              <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Novo Curso</Button></DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingCourse ? 'Editar Curso' : 'Novo Curso'}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Título *</label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Categoria *</label><Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Ex: Informática, Idiomas" required /></div>
                    <div><label className="block text-sm font-medium mb-1">Instituição *</label><Input value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Instrutor</label><Input value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Carga horária (h)</label><Input type="number" value={formData.duration_hours} onChange={e => setFormData({...formData, duration_hours: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Modalidade *</label><Select value={formData.modality} onValueChange={v => setFormData({...formData, modality: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{COURSE_MODALITIES.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent></Select></div>
                    <div><label className="block text-sm font-medium mb-1">Nível *</label><Select value={formData.level} onValueChange={v => setFormData({...formData, level: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{COURSE_LEVELS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent></Select></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Descrição *</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-2 border rounded-lg" required /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Ementa</label><textarea value={formData.syllabus} onChange={e => setFormData({...formData, syllabus: e.target.value})} rows={3} className="w-full p-2 border rounded-lg" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Pré-requisitos (vírgula)</label><Input value={formData.prerequisites} onChange={e => setFormData({...formData, prerequisites: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Valor</label><Input type="number" step="0.01" value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} placeholder="0 para gratuito" /></div>
                    <div><label className="block text-sm font-medium mb-1">Moeda</label><Input value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Início</label><Input type="date" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Fim</label><Input type="date" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Prazo inscrição</label><Input type="date" value={formData.enrollment_deadline} onChange={e => setFormData({...formData, enrollment_deadline: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Máx. alunos</label><Input type="number" value={formData.max_students} onChange={e => setFormData({...formData, max_students: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">URL imagem</label><Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">E-mail contato</label><Input type="email" value={formData.contact_email} onChange={e => setFormData({...formData, contact_email: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Telefone contato</label><Input value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">URL inscrição</label><Input value={formData.enrollment_url} onChange={e => setFormData({...formData, enrollment_url: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Ordem</label><Input type="number" value={formData.order_index} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value)})} /></div>
                  </div>
                  <div className="flex items-center gap-4 border-t pt-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.certificate} onChange={e => setFormData({...formData, certificate: e.target.checked})} className="rounded border-gray-300 text-ashbra-yellow" /><span className="text-sm">Certificado</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="rounded border-gray-300 text-ashbra-yellow" /><span className="text-sm">Ativo</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="rounded border-gray-300 text-ashbra-yellow" /><span className="text-sm">Destaque</span></label>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-4"><Button type="button" variant="outline" onClick={handleCloseDialog}><X className="h-4 w-4 mr-1" /> Cancelar</Button><Button type="submit" disabled={createCourse.isPending || updateCourse.isPending}><Save className="h-4 w-4 mr-1" /> {editingCourse ? 'Atualizar' : 'Criar'}</Button></div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-6"><CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1"><Input placeholder="Buscar cursos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" /></div>
              <Select value={modalityFilter} onValueChange={setModalityFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Modalidade" /></SelectTrigger><SelectContent><SelectItem value="all">Todas</SelectItem>{COURSE_MODALITIES.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent></Select>
              <Select value={levelFilter} onValueChange={setLevelFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Nível" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem>{COURSE_LEVELS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent></Select>
              <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="active">Ativos</SelectItem><SelectItem value="inactive">Inativos</SelectItem></SelectContent></Select>
            </div>
          </CardContent></Card>

          <Card>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum curso encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Curso</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Instituição</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Modalidade</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Nível</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Valor</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Período</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map(course => (
                        <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3"><p className="font-medium">{course.title}</p><p className="text-sm text-gray-500 line-clamp-1">{course.description}</p></td>
                          <td className="p-3">{course.institution}</td>
                          <td className="p-3"><Badge className={modalityColors[course.modality]}>{COURSE_MODALITIES.find(m => m.value === course.modality)?.label}</Badge></td>
                          <td className="p-3"><Badge variant="outline">{COURSE_LEVELS.find(l => l.value === course.level)?.label}</Badge></td>
                          <td className="p-3">{course.cost && course.cost > 0 ? `R$ ${course.cost.toFixed(2)}` : 'Gratuito'}</td>
                          <td className="p-3"><Badge variant={course.is_active ? 'default' : 'outline'}>{course.is_active ? 'Ativo' : 'Inativo'}</Badge></td>
                          <td className="p-3 text-sm text-gray-500">{course.start_date ? new Date(course.start_date).toLocaleDateString('pt-BR') : '-'} {course.end_date ? `até ${new Date(course.end_date).toLocaleDateString('pt-BR')}` : ''}</td>
                          <td className="p-3 text-right"><div className="flex items-center justify-end gap-1"><Button variant="ghost" size="sm" onClick={() => handleOpenEdit(course)}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(course.id)}><Trash2 className="h-4 w-4" /></Button></div></td>
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

export default AdminCourses;
