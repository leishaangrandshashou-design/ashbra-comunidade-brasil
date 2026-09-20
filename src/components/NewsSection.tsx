
import React from 'react';
import { Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Laurette fez de Curitiba seu próprio Haiti",
      excerpt: "Conheça a história de Laurette Bernadin Louis, fisioterapeuta haitiana que fundou a ASHBRA e transformou Curitiba em seu lar.",
      date: "2024",
      readTime: "5 min",
      image: "/uploads/bd6875d5-9e27-436d-a254-773b107eacd6.png",
      category: "Perfil",
      link: "https://casapino.com.br/vozes/reinaldo-bessa-vozes/laurette-fez-de-curitiba-seu-proprio-haiti/"
    },
    {
      id: 2,
      title: "Noventa haitianos recebem certificação em Língua Portuguesa",
      excerpt: "Projeto PBMIH da UFPR em parceria com ASHBRA certifica mais uma turma de imigrantes em português brasileiro.",
      date: "2024",
      readTime: "3 min",
      image: "/uploads/affa4d9f-150a-46ed-88c8-b357661f9517.png",
      category: "Educação",
      link: "https://www.curitiba.pr.gov.br/noticias/noventa-haitianos-recebem-certificacao-em-lingua-portuguesa/53470"
    },
    {
      id: 3,
      title: "Associação para auxiliar haitianos terá utilidade pública municipal",
      excerpt: "ASHBRA será reconhecida oficialmente pela Câmara Municipal de Curitiba como entidade de utilidade pública.",
      date: "2024",
      readTime: "2 min",
      image: "/uploads/c2fdfe79-4825-4882-817b-9f252856fb65.png",
      category: "Institucional",
      link: "https://www.curitiba.pr.leg.br/informacao/noticias/associacao-para-auxiliar-haitianos-tera-utilidade-publica-municipal"
    },
    {
      id: 4,
      title: "Mandato Goura participa de reunião entre Associação de Haitianos e Prefeitura",
      excerpt: "Deputado Goura media reunião entre ASHBRA e Assessoria de Relações Internacionais da prefeitura de Curitiba.",
      date: "2024",
      readTime: "3 min",
      image: "/uploads/d0fc7478-c5ce-44fc-a3fd-f15a2c35ff24.png",
      category: "Política",
      link: "https://mandatogoura.com.br/mandato-goura-participa-de-reuniao-entre-associacao-de-haitianos-e-assessoria-de-relacoes-internacionais-da-prefeitura/"
    },
    {
      id: 5,
      title: "Projeto da UFPR ajuda refugiados e migrantes a recomeçar a vida no Brasil",
      excerpt: "Programa PBMIH da UFPR oferece suporte integral para integração de refugiados e migrantes em Curitiba.",
      date: "2024",
      readTime: "4 min",
      image: "/uploads/21d26ec0-ac81-4770-82c3-3ad9fb3e7aab.png",
      category: "Educação",
      link: "https://g1.globo.com/pr/parana/noticia/projeto-da-ufpr-ajuda-refugiados-e-migrantes-a-recomecar-a-vida-no-brasil.ghtml"
    },
    {
      id: 6,
      title: "Deputado Goura leva demandas de entidades de migrantes à Polícia Federal",
      excerpt: "Parlamentar apresenta demandas da ASHBRA e outras entidades para melhorar atendimento aos imigrantes.",
      date: "2024",
      readTime: "3 min",
      image: "/uploads/d0fc7478-c5ce-44fc-a3fd-f15a2c35ff24.png",
      category: "Política",
      link: "https://mandatogoura.com.br/deputado-goura-pdt-leva-demandas-de-entidades-de-migrantes-a-policia-federal/"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Perfil': return 'bg-haiti-blue';
      case 'Educação': return 'bg-ashbra-green';
      case 'Institucional': return 'bg-ashbra-yellow text-black';
      case 'Política': return 'bg-haiti-red';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-haiti-blue mb-6 animate-fade-in-up">
            Notícias
          </h2>
          <div className="w-24 h-1 bg-ashbra-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe as últimas novidades, eventos e conquistas da nossa comunidade
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((article, index) => (
            <article 
              key={article.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-haiti-blue transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <a 
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-haiti-blue font-medium flex items-center group-hover:text-haiti-red transition-all duration-300 hover:underline hover:transform hover:translate-x-1"
                >
                  Ler mais
                  <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-haiti-blue hover:bg-haiti-blue/90 text-white px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Ver Todas as Notícias
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
