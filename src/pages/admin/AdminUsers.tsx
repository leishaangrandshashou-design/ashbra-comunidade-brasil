import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUsers, useUpdateUserRole, useUser } from '@/hooks/useSupabase';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Trash2, Search, Users, Save, X, Shield, UserCheck, UserX, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const roleLabels: Record<string, string> = {
  community: 'Comunidade',
  volunteer: 'Voluntário',
  partner: 'Parceiro',
  admin: 'Administrador',
};

const roleColors: Record<string, string> = {
  community: 'bg-gray-100 text-gray-700',
  volunteer: 'bg-blue-100 text-blue-700',
  partner: 'bg-green-100 text-green-700',
  admin: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  active: 'Ativo',
  inactive: 'Inativo',
  suspended: 'Suspenso',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  suspended: 'bg-red-100 text-red-700',
};

const AdminUsers = () => {
  const { toast } = useToast();
  const { profile: currentUserProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userDetail, setUserDetail] = useState<any>(null);

  const { data: users, isLoading, refetch } = useUsers({ role: roleFilter !== 'all' ? roleFilter : undefined, status: statusFilter !== 'all' ? statusFilter : undefined });
  const updateUserRole = useUpdateUserRole();

  const filteredUsers = users?.filter(u =>
    (u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.user_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleOpenEdit = (user: any) => {
    setEditingUser(user);
  };

  const handleCloseEdit = () => {
    setEditingUser(null);
  };

  const handleViewDetail = async (userId: string) => {
    const { data } = await useUser(userId);
    setUserDetail(data);
  };

  const handleCloseDetail = () => {
    setUserDetail(null);
  };

  const handleUpdateRole = async (userId: string, role: string, status?: string) => {
    await updateUserRole.mutateAsync({ id: userId, role, status });
    toast({ title: 'Usuário atualizado!' });
    refetch();
  };

  const handleDelete = async (id: string) => { 
    if (confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) { 
      // Note: In production, you'd want to use Supabase Admin API to delete auth user
      toast({ title: 'Funcionalidade de exclusão requer API Admin do Supabase', variant: 'destructive' }); 
    } 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div><h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3"><Users className="h-8 w-8 text-blue-600" /> Gerenciar Usuários</h1><p className="text-gray-600 mt-1">Gerencie perfis, roles e status dos usuários</p></div>
          </div>

          <Card className="mb-6"><CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1"><Input placeholder="Buscar usuários..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full" /></div>
              <Select value={roleFilter} onValueChange={setRoleFilter} className="w-full md:w-48"><SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="community">Comunidade</SelectItem><SelectItem value="volunteer">Voluntário</SelectItem><SelectItem value="partner">Parceiro</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent></Select>
              <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-40"><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="pending">Pendente</SelectItem><SelectItem value="active">Ativo</SelectItem><SelectItem value="inactive">Inativo</SelectItem><SelectItem value="suspended">Suspenso</SelectItem></SelectContent></Select>
            </div>
          </CardContent></Card>

          {/* User Detail Modal */}
          <Dialog open={!!userDetail} onOpenChange={handleCloseDetail}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="flex flex-row items-center justify-between">
                <DialogTitle>Detalhes do Usuário</DialogTitle>
              </DialogHeader>
              <div className="p-4 space-y-4">
                {userDetail && (
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-haiti-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-haiti-blue">{userDetail.full_name?.charAt(0).toUpperCase() || 'U'}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{userDetail.full_name || 'Sem nome'}</h3>
                        <p className="text-gray-500">{userDetail.email || userDetail.user_id}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">Perfil:</span> <Badge className={roleColors[userDetail.role]} ml-2>{roleLabels[userDetail.role]}</Badge></div>
                      <div><span className="text-gray-500">Status:</span> <Badge className={statusColors[userDetail.status]} ml-2>{statusLabels[userDetail.status]}</Badge></div>
                      <div><span className="text-gray-500">Cidade:</span> <span className="ml-2">{userDetail.city || '-'}</span></div>
                      <div><span className="text-gray-500">Profissão:</span> <span className="ml-2">{userDetail.profession || '-'}</span></div>
                      <div className="col-span-2"><span className="text-gray-500">Bio:</span> <p className="mt-1">{userDetail.bio || 'Não informado'}</p></div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => handleUpdateRole(userDetail.id, 'community')}>Comunidade</Button>
                      <Button variant="outline" onClick={() => handleUpdateRole(userDetail.id, 'volunteer')}>Voluntário</Button>
                      <Button variant="outline" onClick={() => handleUpdateRole(userDetail.id, 'partner')}>Parceiro</Button>
                      <Button variant="outline" className="text-red-600 border-red-600" onClick={() => handleUpdateRole(userDetail.id, 'admin')}>Admin</Button>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleUpdateRole(userDetail.id, userDetail.role, 'active')} disabled={userDetail.status === 'active'}>Ativar</Button>
                      <Button variant="outline" onClick={() => handleUpdateRole(userDetail.id, userDetail.role, 'inactive')} disabled={userDetail.status === 'inactive'}>Desativar</Button>
                      <Button variant="outline" className="text-red-600 border-red-600" onClick={() => handleUpdateRole(userDetail.id, userDetail.role, 'suspended')} disabled={userDetail.status === 'suspended'}>Suspender</Button>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Role/Status Modal */}
          <Dialog open={!!editingUser} onOpenChange={handleCloseEdit}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Editar {editingUser?.full_name || 'Usuário'}</DialogTitle>
              </DialogHeader>
              <div className="p-4 space-y-4">
                {editingUser && (
                  <div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Perfil</label>
                      <Select value={editingUser.role} onValueChange={v => handleUpdateRole(editingUser.id, v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="community">Comunidade</SelectItem>
                          <SelectItem value="volunteer">Voluntário</SelectItem>
                          <SelectItem value="partner">Parceiro</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <Select value={editingUser.status} onValueChange={v => handleUpdateRole(editingUser.id, editingUser.role, v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                          <SelectItem value="suspended">Suspenso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={handleCloseEdit}>Fechar</Button>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Card>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum usuário encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Usuário</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">E-mail</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Perfil</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Cidade</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Cadastro</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3">
                            <p className="font-medium">{user.full_name || 'Sem nome'}</p>
                          </td>
                          <td className="p-3 text-sm text-gray-500">{user.email || user.user_id?.substring(0, 8) + '...'}</td>
                          <td className="p-3">
                            <Badge className={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={statusColors[user.status]}>{statusLabels[user.status]}</Badge>
                          </td>
                          <td className="p-3 text-sm text-gray-500">{user.city || '-'}</td>
                          <td className="p-3 text-sm text-gray-500">{user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '-'}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleViewDetail(user.id)}><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(user)}><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(user.id)}><Trash2 className="h-4 w-4" /></Button>
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

export default AdminUsers;
