
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Marie Claire Auguste",
      role: "Professora de Português",
      location: "Curitiba, PR",
      testimonial: "A ASHBRA foi meu primeiro apoio quando cheguei a Curitiba em 2015. Participei dos cursos de português do projeto PBMIH da UFPR e recebi apoio psicológico nos momentos mais difíceis. Hoje, com orgulho, dou aulas de português para novos imigrantes que chegam, retribuindo todo o carinho que recebi.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612e38f?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Peterson Belizaire",
      role: "Empreendedor",
      location: "Curitiba, PR",
      testimonial: "Graças ao programa de capacitação profissional da ASHBRA, consegui desenvolver as habilidades necessárias para abrir meu próprio negócio. Hoje tenho um restaurante de comida haitiana no centro de Curitiba que emprega outros imigrantes e celebra nossa cultura.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Fabiola Joseph",
      role: "Assistente Social",
      location: "Curitiba, PR",
      testimonial: "A rede de apoio da ASHBRA mudou minha vida em Curitiba. Além do suporte jurídico para regularização, encontrei uma família brasileira que me acolheu. Hoje trabalho como assistente social ajudando outras mulheres imigrantes a encontrarem seu caminho no Paraná.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Jacques Michel",
      role: "Estudante UFPR",
      location: "Curitiba, PR",
      testimonial: "Cheguei a Curitiba com o sonho de estudar na UFPR. A ASHBRA me ajudou não apenas com o português através do projeto PBMIH, mas também com orientação para o processo seletivo. Hoje curso Engenharia e planejo contribuir para o desenvolvimento da cidade que me acolheu.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-haiti-blue to-haiti-red text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Quote className="h-16 w-16 mx-auto mb-6 text-ashbra-yellow animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Histórias de Sucesso
          </h2>
          <div className="w-24 h-1 bg-ashbra-yellow mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Conheça as inspiradoras jornadas de transformação dos membros da nossa comunidade em Curitiba
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <div className="text-center">
              {/* Profile Image */}
              <div className="mb-8">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-ashbra-yellow shadow-lg"
                />
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].testimonial}"
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-white/20 pt-6">
                <h4 className="text-xl font-bold text-ashbra-yellow mb-2">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-white/90 mb-1">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-white/70 text-sm">
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentTestimonial ? 'bg-ashbra-yellow w-8' : 'bg-white/40'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg mb-6">
            Faça parte da nossa comunidade e construa sua própria história de sucesso em Curitiba
          </p>
          <Button 
            size="lg"
            className="bg-ashbra-yellow hover:bg-ashbra-yellow/90 text-black font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Entre em Contato
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
