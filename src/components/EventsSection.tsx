
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EventsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const events = [
    {
      id: 1,
      title: "Festa da Independência do Haiti 2024",
      date: "1º de Janeiro, 2024",
      location: "Memorial de Curitiba",
      attendees: "200+ participantes",
      image: "/uploads/b7e2162d-7d7b-47ea-a2a0-12e50c69759c.png",
      description: "Celebração anual da independência haitiana com apresentações culturais, música tradicional, dança e gastronomia típica no Memorial de Curitiba."
    },
    {
      id: 2,
      title: "Dia das Crianças Haitiano-Brasileiro",
      date: "12 de Outubro, 2024",
      location: "Memorial de Curitiba",
      attendees: "150+ crianças e famílias",
      image: "/uploads/9a7a0bd3-dc26-4e8e-aa85-02e7a5781091.png",
      description: "Festa especial para as crianças da comunidade haitiana com atividades culturais, brincadeiras tradicionais e integração com famílias brasileiras."
    },
    {
      id: 3,
      title: "Certificação em Língua Portuguesa - PBMIH",
      date: "Todo semestre",
      location: "UFPR - Centro de Línguas e Interculturalidade",
      attendees: "90+ alunos por turma",
      image: "/uploads/affa4d9f-150a-46ed-88c8-b357661f9517.png",
      description: "Cerimônia de certificação dos alunos do projeto PBMIH da UFPR, em parceria com a ASHBRA para ensino de português brasileiro."
    },
    {
      id: 4,
      title: "Festival Cultural Haiti-Brasil",
      date: "Junho/Julho",
      location: "Memorial de Curitiba",
      attendees: "300+ visitantes",
      image: "/uploads/21d26ec0-ac81-4770-82c3-3ad9fb3e7aab.png",
      description: "Grande festival anual que celebra a cultura haitiana com música, dança, artesanato, culinária típica e exposições culturais."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-haiti-blue mb-6">
            Nossos Eventos
          </h2>
          <div className="w-24 h-1 bg-ashbra-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebramos nossa cultura e fortalecemos nossa comunidade através de eventos 
            que conectam Brasil e Haiti em Curitiba
          </p>
        </div>

        {/* Events Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {events.map((event) => (
                <div key={event.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 min-h-[500px]">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="bg-gradient-to-br from-haiti-blue to-haiti-red text-white p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
                      <p className="text-lg mb-6 text-white/90 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center text-ashbra-yellow">
                          <Calendar className="h-5 w-5 mr-3" />
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center text-white/90">
                          <MapPin className="h-5 w-5 mr-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-white/90">
                          <Users className="h-5 w-5 mr-3" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 border-none shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 border-none shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentSlide ? 'bg-haiti-blue w-8' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
