
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'about', label: 'Sobre Nós' },
    { id: 'mission', label: 'Nossa Missão' },
    { id: 'objectives', label: 'Objetivos' },
    { id: 'events', label: 'Eventos' },
    { id: 'news', label: 'Notícias' },
    { id: 'donations', label: 'Doações' },
    { id: 'contact', label: 'Contato' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      url: 'https://www.instagram.com/ashbraoficial',
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    {
      icon: Facebook,
      url: 'https://www.facebook.com/ashbraoficial',
      label: 'Facebook',
      color: 'hover:text-blue-600'
    },
    {
      icon: MessageCircle,
      url: 'https://wa.me/5541998136033',
      label: 'WhatsApp',
      color: 'hover:text-green-500'
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 relative">
              <img 
                src="/uploads/76c35430-53aa-46d8-be19-77546d7d167f.png" 
                alt="ASHBRA Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className={`font-bold text-xl transition-colors ${
                isScrolled ? 'text-haiti-blue' : 'text-white'
              }`}>
                ASHBRA
              </h1>
              <p className={`text-sm transition-colors ${
                isScrolled ? 'text-gray-600' : 'text-white/90'
              }`}>
                Associação para Solidariedade dos Haitianos no Brasil
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-all duration-300 hover:text-ashbra-yellow transform hover:scale-105 ${
                  isScrolled ? 'text-gray-700 hover:text-haiti-blue' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 ml-4 border-l border-gray-300 pl-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    isScrolled 
                      ? `text-gray-600 hover:bg-gray-100 ${social.color}` 
                      : `text-white/80 hover:text-white hover:bg-white/20 ${social.color}`
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden transition-all duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg p-4 mb-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 px-3 text-gray-700 hover:text-haiti-blue hover:bg-gray-100 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
