
import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: Instagram,
      url: 'https://www.instagram.com/ashbraoficial',
      label: 'Instagram'
    },
    {
      icon: Facebook,
      url: 'https://www.facebook.com/ashbraoficial',
      label: 'Facebook'
    },
    {
      icon: MessageCircle,
      url: 'https://wa.me/5541998136033',
      label: 'WhatsApp'
    },
    {
      icon: Mail,
      url: 'mailto:contato@ashbra.org.br',
      label: 'Email'
    }
  ];

  const quickLinks = [
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Nossa Missão', href: '#mission' },
    { name: 'Objetivos', href: '#objectives' },
    { name: 'Eventos', href: '#events' },
    { name: 'Notícias', href: '#news' },
    { name: 'Como Ajudar', href: '#donations' },
    { name: 'Contato', href: '#contact' }
  ];

  const services = [
    'Assistência Jurídica',
    'Cursos de Português (PBMIH/UFPR)',
    'Apoio Psicossocial',
    'Orientação Profissional',
    'Eventos Culturais',
    'Regularização Migratória',
    'Defesa de Direitos',
    'Ações de Emergência'
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-haiti-blue to-haiti-red text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/uploads/76c35430-53aa-46d8-be19-77546d7d167f.png" 
                alt="ASHBRA Logo" 
                className="w-12 h-12 object-contain rounded-full"
              />
              <div>
                <h3 className="font-bold text-xl">ASHBRA</h3>
                <p className="text-sm text-white/90">Associação para Solidariedade dos Haitianos</p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed mb-4">
              Fundada em 2014 em Curitiba pela fisioterapeuta Laurette Bernadin Louis, 
              promovemos a integração da comunidade haitiana e outros imigrantes no Paraná.
            </p>
            <div className="text-sm text-white/80 mb-4">
              <p><strong>Presidenta:</strong> Laurette Bernadin Louis</p>
              <p><strong>CNPJ:</strong> 22.453.101/0001-50</p>
              <p><strong>Natureza Jurídica:</strong> Organização Social</p>
              <p><strong>Status:</strong> <span className="text-ashbra-yellow font-semibold">Sem Fins Lucrativos</span></p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-3 rounded-full hover:bg-ashbra-yellow hover:text-black transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/90 hover:text-ashbra-yellow transition-all duration-300 block transform hover:translate-x-1"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Nossos Serviços</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-white/90 flex items-center">
                  <div className="w-2 h-2 bg-ashbra-yellow rounded-full mr-3"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-ashbra-yellow mt-1" />
                <div className="text-white/90">
                  <p>Rua Odenir Dissenha</p>
                  <p>Uberaba, Curitiba - PR</p>
                  <p>CEP: 81590-620</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-ashbra-yellow" />
                <div className="text-white/90">
                  <a href="tel:+5541998136033" className="hover:text-ashbra-yellow transition-colors block">
                    (41) 99813-6033
                  </a>
                  <a href="tel:+5541983168677" className="hover:text-ashbra-yellow transition-colors block">
                    (41) 98316-8677
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-ashbra-yellow" />
                <div className="text-white/90">
                  <a href="mailto:contato@ashbra.org.br" className="hover:text-ashbra-yellow transition-colors">
                    contato@ashbra.org.br
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <h5 className="font-semibold text-ashbra-yellow mb-2">Atendimento de Emergência</h5>
              <p className="text-sm text-white/90 mb-2">
                24h pelo WhatsApp para casos urgentes
              </p>
              <a 
                href="https://wa.me/5541998136033" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ashbra-yellow hover:text-white transition-colors"
              >
                (41) 99813-6033
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-white/90">
                © 2024 ASHBRA - Associação para Solidariedade dos Haitianos no Brasil. 
                Todos os direitos reservados.
              </p>
              <p className="text-white/70 text-sm mt-1">
                <strong>Organização sem fins lucrativos</strong> | CNPJ: 22.453.101/0001-50
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <button className="text-white/90 hover:text-ashbra-yellow transition-colors">
                Política de Privacidade
              </button>
              <button className="text-white/90 hover:text-ashbra-yellow transition-colors">
                Termos de Uso
              </button>
              <button className="text-white/90 hover:text-ashbra-yellow transition-colors">
                Transparência
              </button>
            </div>
          </div>
          
          <div className="text-center mt-4 pt-4 border-t border-white/10">
            <p className="text-white/70 text-sm">
              Feito com ❤️ para fortalecer nossa comunidade em Curitiba | 
              <span className="text-ashbra-yellow"> Unidos pela solidariedade, crescemos juntos</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
