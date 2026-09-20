
import React from 'react';
import { Scale, GraduationCap, Briefcase, Heart, Users, Building } from 'lucide-react';

const ObjectivesSection = () => {
  const objectives = [
    {
      icon: Scale,
      title: "Assistência Jurídica",
      description: "Garantir acesso à regularização migratória e orientação legal especializada através de parcerias com escritórios de advocacia humanitária.",
      color: "haiti-blue"
    },
    {
      icon: GraduationCap,
      title: "Educação Cultural",
      description: "Promover intercâmbio cultural através de cursos de idiomas, workshops de artesanato tradicional e eventos multiculturais mensais.",
      color: "haiti-red"
    },
    {
      icon: Briefcase,
      title: "Inserção Profissional",
      description: "Facilitar acesso ao mercado de trabalho com programas de capacitação profissional e parcerias com empresas socialmente responsáveis.",
      color: "ashbra-yellow"
    },
    {
      icon: Heart,
      title: "Apoio Psicossocial",
      description: "Oferecer suporte emocional e psicológico para imigrantes em situação de vulnerabilidade, promovendo o bem-estar mental.",
      color: "ashbra-green"
    },
    {
      icon: Users,
      title: "Ações de Solidariedade",
      description: "Desenvolver ações de solidariedade e advocacy, buscando garantir os direitos dos imigrantes e combater a discriminação.",
      color: "haiti-blue"
    },
    {
      icon: Building,
      title: "Parcerias Institucionais",
      description: "Estabelecer parcerias com universidades como a UFPR para desenvolver projetos de extensão e pesquisa voltados à comunidade imigrante.",
      color: "haiti-red"
    }
  ];

  return (
    <section id="objectives" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-haiti-blue mb-6">
            Nossos Objetivos
          </h2>
          <div className="w-24 h-1 bg-ashbra-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos em múltiplas frentes para garantir a integração plena e o bem-estar 
            da comunidade haitiana e outros imigrantes em Curitiba e região
          </p>
        </div>

        {/* Objectives Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((objective, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 bg-${objective.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <objective.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {objective.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {objective.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight - UFPR Partnership */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-haiti-blue to-haiti-red text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Parceria com a Universidade Federal do Paraná
            </h3>
            <p className="text-lg mb-6">
              A ASHBRA desenvolveu importantes parcerias acadêmicas, incluindo projetos de extensão 
              com a UFPR voltados ao apoio e integração da comunidade imigrante no Paraná.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                Projetos de Extensão Universitária
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                Pesquisa Acadêmica
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                Apoio Multidisciplinar
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
