
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&h=1080&fit=crop"
          alt="Comunidade haitiana em evento de integração"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-haiti-blue/80 to-haiti-red/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Unidos pela
            <span className="text-ashbra-yellow block">Solidariedade</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Construindo pontes culturais e promovendo inclusão para a comunidade haitiana e imigrantes em Curitiba
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => scrollToSection('donations')}
              className="bg-ashbra-yellow hover:bg-ashbra-yellow/90 text-black font-semibold px-8 py-4 text-lg group transition-all duration-300 transform hover:scale-105"
            >
              <Heart className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Faça Parte
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button 
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('about')}
              className="border-white text-white hover:bg-white hover:text-haiti-blue px-8 py-4 text-lg transition-all duration-300"
            >
              Conheça Nossa História
            </Button>
          </div>
        </div>

        {/* Floating Elements with Haiti flag colors */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-ashbra-yellow/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-haiti-red/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
