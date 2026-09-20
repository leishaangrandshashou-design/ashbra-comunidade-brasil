import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useJobs, JOB_TYPES, WORK_MODES, useCreateJob, useUpdateJob, useDeleteJob } from '@/hooks/useSupabase';
import { Plus, Edit, Trash2, Search, Briefcase, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const jobTypeColors: Record<string, string> = {
  clt: 'bg-blue-100 text-blue-700',
  pj: 'bg-purple-100 text-purple-700',
  estagio: 'bg-green-100 text-green-700',
  aprendiz: 'bg-yellow-100 text-yellow-700',
  freelance: 'bg-orange-100 text-orange-700',
  temporario: 'bg-pink-100 text-pink-700',
};

const AdminJobs = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingJob, setEditingJob] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '', company: '', description: '', requirements: '', benefits: '',
    salary_range: '', job_type: 'clt', work_mode: 'presencial', location: '',
    contact_email: '', contact_phone: '', application_url: '', application_deadline: '',
    is_active: true, is_featured: false, order_index: 0,
  });

  const { data: jobs, isLoading, refetch } = useJobs();
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();

  const filteredJobs = jobs?.filter(j =>
    (typeFilter === 'all' || j.job_type === typeFilter) &&
    (modeFilter === 'all' || j.work_mode === modeFilter) &&
    (statusFilter === 'all' || (statusFilter === 'active' ? j.is_active : !j.is_active)) &&
    (j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleOpenEdit = (job: any) => {
    setEditingJob(job);
    setFormData({
      title: job.title, company: job.company, description: job.description,
      requirements: job.requirements?.join(', ') || '', benefits: job.benefits?.join(', ') || '',
      salary_range: job.salary_range || '', job_type: job.job_type, work_mode: job.work_mode,
      location: job.location, contact_email: job.contact_email || '', contact_phone: job.contact_phone || '',
      application_url: job.application_url || '', application_deadline: job.application_deadline ? job.application_deadline.split('T')[0] : '',
      is_active: job.is_active, is_featured: job.is_featured, order_index: job.order_index,
    });
  };

  const handleCloseDialog = () => { setEditingJob(null); setFormData({ title: '', company: '', description: '', requirements: '', benefits: '', salary_range: '', job_type: 'clt', work_mode: 'presencial', location: '', contact_email: '', contact_phone: '', application_url: '', application_deadline: '', is_active: true, is_featured: false, order_index: 0 }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      requirements: formData.requirements.split(',').map(s => s.trim()).filter(Boolean),
      benefits: formData.benefits.split(',').map(s => s.trim()).filter(Boolean) || null,
      application_deadline: formData.application_deadline ? new Date(formData.application_deadline).toISOString() : null,
    };
    if (editingJob) { await updateJob.mutateAsync({ id: editingJob.id, ...payload }); toast({ title: 'Vaga atualizada!' }); }
    else { await createJob.mutateAsync(payload); toast({ title: 'Vaga criada!' }); }
    handleCloseDialog(); refetch();
  };

  const handleDelete = async (id: string) => { if (confirm('Excluir esta vaga?')) { await deleteJob.mutateAsync(id); toast({ title: 'Vaga excluída!' }); refetch(); } };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div><h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><Briefcase className="h-8 w-8 text-ashbra-green" /> Gerenciar Vagas</h1><p className="text-gray-600 mt-1">Cadastre e gerencie oportunidades de emprego</p></div>
            <Dialog open={!!editingJob} onOpenChange={handleCloseDialog}>
              <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Nova Vaga</Button></DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingJob ? 'Editar Vaga' : 'Nova Vaga'}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Título *</label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">Empresa *</label><Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Descrição *</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-2 border rounded-lg" required /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Requisitos (vírgula)</label><Input value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Benefícios (vírgula)</label><Input value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Faixa salarial</label><Input value={formData.salary_range} onChange={e => setFormData({...formData, salary_range: e.target.value})} placeholder="Ex: R$ 2.000 - R$ 3.500" /></div>
                    <div><label className="block text-sm font-medium mb-1">Tipo *</label><Select value={formData.job_type} onValueChange={v => setFormData({...formData, job_type: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{JOB_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select></div>
                    <div><label className="block text-sm font-medium mb-1">Modalidade *</label><Select value={formData.work_mode} onValueChange={v => setFormData({...formData, work_mode: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{WORK_MODES.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent></Select></div>
                    <div><label className="block text-sm font-medium mb-1">Localização *</label><Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required /></div>
                    <div><label className="block text-sm font-medium mb-1">E-mail contato</label><Input type="email" value={formData.contact_email} onChange={e => setFormData({...formData, contact_email: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Telefone contato</label><Input value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">URL candidatura</label><Input value={formData.application_url} onChange={e => setFormData({...formData, application_url: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Prazo candidatura</label><Input type="date" value={formData.application_deadline} onChange={e => setFormData({...formData, application_deadline: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium mb-1">Ordem</label><Input type="number" value={formData.order_index} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value)})} /></div>
                  </div>
                  <div className="flex items-center gap-4 border-t pt-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="rounded border-gray-300 text-ashbra-green" /><span className="text-sm">Ativa</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="rounded border-gray-300 text-ashbra-green" /><span className="text-sm">Destaque</span></label>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-4"><Button type="button" variant="outline" onClick={handleCloseDialog}><X className="h-4 w-4 mr-1" /> Cancelar</Button><Button type="submit" disabled={createJob.isPending || updateJob.isPending}><Save className="h-4 w-4 mr-1" /> {editingJob ? 'Atualizar' : 'Criar'}</Button></div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-6"><CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1"><Input placeholder="Buscar vagas..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" /></div>
              <Select value={typeFilter} onValueChange={setTypeFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem>{JOB_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent></Select>
              <Select value={modeFilter} onValueChange={setModeFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Modalidade" /></SelectTrigger><SelectContent><SelectItem value="all">Todas</SelectItem>{WORK_MODES.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent></Select>
              <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="active">Ativas</SelectItem><SelectItem value="inactive">Inativas</SelectItem></SelectContent></Select>
            </div>
          </CardContent></Card>

          <Card>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhuma vaga encontrada</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Vaga</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Empresa</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Tipo</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Modalidade</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Local</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Prazo</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobs.map(job => (
                        <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3"><p className="font-medium">{job.title}</p><p className="text-sm text-gray-500 line-clamp-1">{job.description}</p></td>
                          <td className="p-3">{job.company}</td>
                          <td className="p-3"><Badge className={jobTypeColors[job.job_type]}>{JOB_TYPES.find(t => t.value === job.job_type)?.label}</Badge></td>
                          <td className="p-3"><Badge variant="outline">{WORK_MODES.find(m => m.value === job.work_mode)?.label}</Badge></td>
                          <td className="p-3">{job.location}</td>
                          <td className="p-3"><Badge variant={job.is_active ? 'default' : 'outline'}>{job.is_active ? 'Ativa' : 'Inativa'}</Badge></td>
                          <td className="p-3 text-sm text-gray-500">{job.application_deadline ? new Date(job.application_deadline).toLocaleDateString('pt-BR') : 'Não definido'}</td>
                          <td className="p-3 text-right"><div className="flex items-center justify-end gap-1"><Button variant="ghost" size="sm" onClick={() => handleOpenEdit(job)}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(job.id)}><Trash2 className="h-4 w-4" /></Button></div></td>
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

export default AdminJobs;
