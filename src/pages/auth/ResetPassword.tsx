import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { resetPassword, updatePassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    
    if (token && type === 'recovery') {
      setStep('reset');
    }
  }, [searchParams]);

  const validateRequest = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'E-mail inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReset = () => {
    const newErrors: Record<string, string> = {};
    if (!password) newErrors.password = 'Senha é obrigatória';
    else if (password.length < 8) newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Senha deve conter maiúscula, minúscula e número';
    }
    if (password !== confirmPassword) newErrors.confirmPassword = 'Senhas não conferem';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRequest()) return;

    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    } else {
      toast({ 
        title: 'E-mail enviado!', 
        description: 'Verifique sua caixa de entrada para redefinir a senha.' 
      });
      setStep('request');
      setEmail('');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateReset()) return;

    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);

    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Senha alterada!', description: 'Sua senha foi atualizada com sucesso.' });
      navigate('/login');
    }
  };

  if (step === 'request') {
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
                <CardTitle className="text-2xl">Recuperar senha</CardTitle>
                <CardDescription>Envie um link de recuperação para seu e-mail</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRequestReset} className="space-y-4" noValidate>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => validateRequest()}
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

                  <Button type="submit" className="w-full py-3" disabled={loading} size="lg">
                    {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Lembrou a senha?{' '}
                    <button onClick={() => navigate('/login')} className="text-haiti-blue font-medium hover:underline">
                      Voltar ao login
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20 pb-16 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Nova senha</CardTitle>
              <CardDescription>Digite sua nova senha abaixo</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReset} className="space-y-4" noValidate>
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Nova senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mín. 8 caracteres, maiúscula, minúscula e número"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => validateReset()}
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
                    Confirmar nova senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Repita a senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => validateReset()}
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
                  {loading ? 'Atualizando...' : 'Atualizar senha'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button onClick={() => navigate('/login')} className="text-haiti-blue font-medium hover:underline">
                  Voltar ao login
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;
