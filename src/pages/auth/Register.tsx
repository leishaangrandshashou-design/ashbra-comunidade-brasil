import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    nationality: 'Haitiana',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const nationalities = [
    'Haitiana', 'Brasileira', 'Venezuelana', 'Colombiana', 'Boliviana',
    'Paraguaia', 'Uruguaia', 'Argentina', 'Chilena', 'Peruana', 'Outra'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório';
    if (!formData.email) newErrors.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'E-mail inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 8) newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Senha deve conter maiúscula, minúscula e número';
    }
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Senhas não conferem';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    setLoading(false);

    if (error) {
      toast({ title: 'Erro ao cadastrar', description: error.message, variant: 'destructive' });
    } else {
      toast({ 
        title: 'Cadastro realizado!', 
        description: 'Verifique seu e-mail para confirmar a conta.' 
      });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-16 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <img 
                  src="/uploads/76c35430-53aa-46d8-be19-77546d7d167f.png" 
                  alt="ASHBRA Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <CardTitle className="text-2xl">Criar conta</CardTitle>
              <CardDescription>Junte-se à comunidade ASHBRA</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="João da Silva"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={() => validate()}
                      className="pl-10"
                      disabled={loading}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                  </div>
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => validate()}
                      className="pl-10"
                      disabled={loading}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone (WhatsApp)
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(41) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => validate()}
                      className="pl-10"
                      disabled={loading}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                  </div>
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                    Nacionalidade
                  </Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, nationality: value }))}
                    className="w-full"
                    disabled={loading}
                  >
                    <SelectTrigger aria-label="Selecionar nacionalidade">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {nationalities.map(nat => (
                        <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mín. 8 caracteres, maiúscula, minúscula e número"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => validate()}
                      className="pl-10 pr-10"
                      disabled={loading}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : 'password-hint'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p id="password-hint" className="mt-1 text-xs text-gray-500">
                    Mínimo 8 caracteres, com maiúscula, minúscula e número
                  </p>
                  {errors.password && (
                    <p id="password-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" /> {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Repita a senha"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => validate()}
                      className="pl-10 pr-10"
                      disabled={loading}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p id="confirmPassword-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" /> {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full py-3" disabled={loading} size="lg">
                  {loading ? 'Cadastrando...' : 'Criar conta'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Já tem conta?{' '}
                  <Link to="/login" className="text-haiti-blue font-medium hover:underline">
                    Entrar
                  </Link>
                </p>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                <p className="text-xs text-gray-600">
                  Ao criar sua conta, você concorda com nossos{' '}
                  <Link to="/termos" className="text-haiti-blue hover:underline">Termos de Uso</Link>
                  {' '}e{' '}
                  <Link to="/privacidade" className="text-haiti-blue hover:underline">Política de Privacidade</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
