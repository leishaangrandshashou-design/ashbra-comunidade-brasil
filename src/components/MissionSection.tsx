
import React from 'react';
import { Target, Heart, Globe } from 'lucide-react';

const MissionSection = () => {
  return (
    <section id="mission" className="py-20 bg-gradient-to-r from-haiti-blue to-haiti-red text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <Target className="h-16 w-16 mx-auto mb-6 text-ashbra-yellow animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nossa Missão
            </h2>
            <div className="w-24 h-1 bg-ashbra-yellow mx-auto"></div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12">
            <blockquote className="text-xl md:text-2xl leading-relaxed italic">
              "Promover a integração cultural plena, oferecer suporte jurídico e social especializado, 
              e preservar a rica herança haitiana através de ações educativas e iniciativas comunitárias 
              que fortaleçam os laços entre Brasil e Haiti."
            </blockquote>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-10 w-10 text-ashbra-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Solidariedade</h3>
              <p className="text-white/90">Unidos pela força da comunidade e apoio mútuo</p>
            </div>

            <div className="text-center group">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-10 w-10 text-ashbra-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integração</h3>
              <p className="text-white/90">Construindo pontes entre culturas e povos</p>
            </div>

            <div className="text-center group">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-10 w-10 text-ashbra-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dignidade</h3>
              <p className="text-white/90">Preservando identidade e promovendo direitos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
