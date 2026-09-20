
import React from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="/uploads/bd6875d5-9e27-436d-a254-773b107eacd6.png"
              alt="Laurette Bernadin Louis, fundadora da ASHBRA"
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-haiti-blue text-white p-6 rounded-2xl shadow-xl">
              <Calendar className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium">Fundada em</p>
              <p className="text-2xl font-bold">2014</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-haiti-blue mb-4">
                Nossa História
              </h2>
              <div className="w-24 h-1 bg-ashbra-yellow mb-6"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Fundada em 2014 em Curitiba, Paraná, pela fisioterapeuta haitiana Laurette Bernadin Louis, 
                a ASHBRA (Associação para Solidariedade dos Haitianos no Brasil) surgiu da necessidade de 
                apoio mútuo e integração social da comunidade haitiana na capital paranaense.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Sob a liderança de Laurette Bernadin, a ASHBRA atua em diversas frentes — assistência 
                jurídica, educação cultural, capacitação profissional e apoio psicossocial — sempre com 
                o objetivo de promover a dignidade e o protagonismo dos imigrantes haitianos e de outros 
                países no Brasil, com foco especial na região de Curitiba.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                A associação desenvolveu importantes parcerias acadêmicas, incluindo o projeto de extensão 
                PBMIH (Português Brasileiro para Migração Humanitária) com a UFPR, que oferece aulas 
                gratuitas de português para migrantes em situação de vulnerabilidade.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <Users className="h-8 w-8 text-haiti-blue mb-3" />
                <p className="text-3xl font-bold text-haiti-blue">500+</p>
                <p className="text-gray-600">Famílias Assistidas</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <MapPin className="h-8 w-8 text-haiti-red mb-3" />
                <p className="text-3xl font-bold text-haiti-red">Curitiba</p>
                <p className="text-gray-600">Sede Principal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
