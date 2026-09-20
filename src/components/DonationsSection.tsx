
import React from 'react';
import { Heart, Package, Users, DollarSign, HandHeart, Utensils, BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEmergencyCampaign } from '@/hooks/useEmergencyCampaign';

const DonationsSection = () => {
  const { toast } = useToast();
  const campaign = useEmergencyCampaign();
  
  const progressPercentage = Math.round((campaign.current / campaign.goal) * 100);
  const donationOptions = [
    {
      icon: Utensils,
      title: "Doe Alimentos",
      description: "Ajude famílias em situação de vulnerabilidade com cestas básicas e alimentos nutritivos.",
      color: "haiti-red",
      items: ["Arroz", "Feijão", "Óleo", "Açúcar", "Leite em pó", "Frutas"]
    },
    {
      icon: Package,
      title: "Doe Materiais",
      description: "Contribua com materiais educativos, roupas e itens de higiene pessoal.",
      color: "haiti-blue",
      items: ["Material escolar", "Roupas", "Produtos de higiene", "Livros", "Brinquedos"]
    },
    {
      icon: Users,
      title: "Voluntarie-se",
      description: "Doe seu tempo e conhecimento para ensinar, orientar ou apoiar nossa comunidade.",
      color: "haiti-gold",
      items: ["Aulas de português", "Orientação jurídica", "Apoio psicológico", "Eventos culturais"]
    },
    {
      icon: DollarSign,
      title: "Contribua Financeiramente",
      description: "Faça uma doação financeira para manter nossos projetos e expandir nosso alcance.",
      color: "brazil-green",
      items: ["PIX", "Transferência bancária", "Doação mensal", "Crowdfunding"]
    }
  ];

  const handleDonationClick = async (type: string) => {
    try {
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            donation_type: type
          }
        ]);

      if (error) throw error;

      let message = '';
      switch (type) {
        case 'Doe Alimentos':
          message = 'Entre em contato conosco pelo WhatsApp para coordenar a doação: (41) 99813-6033';
          break;
        case 'Doe Materiais':
          message = 'Envie um email para contato@ashbra.org.br com a lista de materiais';
          break;
        case 'Voluntarie-se':
          message = 'Obrigado pelo interesse! Entraremos em contato em breve.';
          break;
        case 'Contribua Financeiramente':
          message = 'PIX: contato@ashbra.org.br - Obrigado pela sua generosidade!';
          break;
      }

      toast({
        title: "Interesse registrado!",
        description: message,
      });
    } catch (error) {
      console.error('Error registering donation:', error);
      toast({
        title: "Erro ao registrar",
        description: "Ocorreu um erro. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="donations" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <HandHeart className="h-16 w-16 mx-auto mb-6 text-haiti-red animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold text-haiti-blue mb-6">
            Como Ajudar
          </h2>
          <div className="w-24 h-1 bg-haiti-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sua contribuição faz a diferença na vida de centenas de famílias. 
            Escolha a forma que mais combina com você para apoiar nossa missão.
          </p>
        </div>

        {/* Donation Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {donationOptions.map((option, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 bg-${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                <option.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                {option.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {option.description}
              </p>

              <ul className="space-y-2 mb-6">
                {option.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                    <div className={`w-2 h-2 bg-${option.color} rounded-full mr-3`}></div>
                    {item}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full bg-${option.color} hover:opacity-90 text-white font-semibold`}
                onClick={() => handleDonationClick(option.title)}
              >
                {option.title}
              </Button>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-haiti-blue to-haiti-red text-white rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Impacto das Suas Doações</h3>
            <p className="text-lg text-white/90">
              Veja como suas contribuições transformam vidas na nossa comunidade
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Utensils className="h-8 w-8 text-haiti-gold" />
              </div>
              <p className="text-3xl font-bold mb-2">800+</p>
              <p className="text-white/90">Cestas básicas distribuídas</p>
            </div>

            <div className="group">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-haiti-gold" />
              </div>
              <p className="text-3xl font-bold mb-2">450+</p>
              <p className="text-white/90">Pessoas em cursos de português</p>
            </div>

            <div className="group">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Home className="h-8 w-8 text-haiti-gold" />
              </div>
              <p className="text-3xl font-bold mb-2">150+</p>
              <p className="text-white/90">Famílias regularizadas</p>
            </div>

            <div className="group">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-haiti-gold" />
              </div>
              <p className="text-3xl font-bold mb-2">95+</p>
              <p className="text-white/90">Voluntários ativos</p>
            </div>
          </div>
        </div>

        {/* Emergency Appeal - Dynamic Campaign */}
        <div className="bg-haiti-red text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {campaign.emoji} {campaign.title}
          </h3>
          <p className="text-lg mb-6">
            {campaign.description}
          </p>
          <div className="bg-white/20 rounded-full h-4 mb-4 overflow-hidden">
            <div 
              className="bg-haiti-gold h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="mb-6">
            R$ {campaign.current.toLocaleString('pt-BR')} arrecadados de R$ {campaign.goal.toLocaleString('pt-BR')} ({progressPercentage}%)
          </p>
          <Button 
            size="lg"
            className="bg-haiti-gold hover:bg-haiti-gold/90 text-black font-semibold px-8 py-3"
            onClick={() => handleDonationClick('Contribua Financeiramente')}
          >
            Doar Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DonationsSection;
