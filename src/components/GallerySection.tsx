
import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const galleryImages = [
    {
      id: 1,
      src: "/uploads/affa4d9f-150a-46ed-88c8-b357661f9517.png",
      alt: "Evento de certificação PBMIH na UFPR",
      category: "Educação"
    },
    {
      id: 2,
      src: "/uploads/bd6875d5-9e27-436d-a254-773b107eacd6.png",
      alt: "Laurette Bernadin em palestra na UFPR",
      category: "Palestras"
    },
    {
      id: 3,
      src: "/uploads/c2fdfe79-4825-4882-817b-9f252856fb65.png",
      alt: "Auditório lotado em evento da ASHBRA",
      category: "Eventos"
    },
    {
      id: 4,
      src: "/uploads/513072ec-cd74-44f1-b278-380db6537ef8.png",
      alt: "Festa de Natal da ASHBRA - Papai Noel com as crianças",
      category: "Festa de Natal"
    },
    {
      id: 5,
      src: "/uploads/77a947b2-0be5-450f-b758-fc1f1c02442b.png",
      alt: "Dia das Crianças no Memorial de Curitiba",
      category: "Dia das Crianças"
    },
    {
      id: 6,
      src: "/uploads/f7ce965e-bc39-49fe-841d-534e8e89bfe6.png",
      alt: "Evento comunitário no Memorial de Curitiba",
      category: "Eventos Comunitários"
    },
    {
      id: 7,
      src: "/uploads/b5612fc5-1116-49e8-8aa0-51b0ec11c555.png",
      alt: "Celebração de Natal no Memorial de Curitiba",
      category: "Festa de Natal"
    },
    {
      id: 8,
      src: "/uploads/00fc9a91-cbb6-4cdf-9810-c3d62b5bae59.png",
      alt: "Distribuição de presentes de Natal",
      category: "Festa de Natal"
    },
    {
      id: 9,
      src: "/uploads/b3b0c77c-0f3c-4906-9b95-403bbfa20dfe.png",
      alt: "Confraternização de Natal da ASHBRA",
      category: "Festa de Natal"
    },
    {
      id: 10,
      src: "/uploads/d0fc7478-c5ce-44fc-a3fd-f15a2c35ff24.png",
      alt: "Reunião com autoridades e parceiros",
      category: "Reuniões Institucionais"
    },
    {
      id: 11,
      src: "/uploads/a37bb327-619b-4d9a-9af7-99a037184da5.png",
      alt: "Evento de Natal com autoridades locais",
      category: "Festa de Natal"
    },
    {
      id: 12,
      src: "/uploads/67bbf6f0-2c63-4b3d-ad08-908e01ddd2ba.png",
      alt: "Logo da União da Comunidade dos Migrantes",
      category: "Parcerias"
    }
  ];

  const openModal = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setShowAll(!showAll);
  };

  // Show only first 8 images initially, all when showAll is true
  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-haiti-blue mb-6 animate-fade-in-up">
            Galeria de Momentos
          </h2>
          <div className="w-24 h-1 bg-ashbra-yellow mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reviva os momentos especiais que marcaram nossa jornada de integração e celebração cultural em Curitiba
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedImages.map((image, index) => (
            <div 
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-ashbra-yellow text-black px-3 py-1 rounded-full text-sm font-medium mb-2 shadow-lg">
                    {image.category}
                  </span>
                  <p className="text-white font-medium text-sm leading-tight">{image.alt}</p>
                </div>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ZoomIn className="h-12 w-12 text-white opacity-80 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-haiti-blue text-haiti-blue hover:bg-haiti-blue hover:text-white px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={handleLoadMore}
          >
            {showAll ? 'Ver Menos Fotos' : 'Ver Mais Fotos'}
          </Button>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full animate-scale-in">
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-12 right-0 bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <img
              src={galleryImages.find(img => img.id === selectedImage)?.src}
              alt={galleryImages.find(img => img.id === selectedImage)?.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
              <span className="inline-block bg-ashbra-yellow text-black px-3 py-1 rounded-full text-sm font-medium mb-2">
                {galleryImages.find(img => img.id === selectedImage)?.category}
              </span>
              <p className="text-white font-medium">
                {galleryImages.find(img => img.id === selectedImage)?.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
