import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDocuments, DOCUMENT_TYPES } from '@/hooks/useSupabase';
import { FileText, Download, ExternalLink, FileSearch, Shield, Scale, BookOpen, FileQuestion } from 'lucide-react';

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  guia: BookOpen,
  formulario: FileText,
  lei: Scale,
  decreto: Shield,
  manual: BookOpen,
  cartilha: FileQuestion,
  modelo: FileText,
  outros: FileText,
};

const typeLabels: Record<string, string> = {
  guia: 'Guia',
  formulario: 'Formulário',
  lei: 'Lei',
  decreto: 'Decreto',
  manual: 'Manual',
  cartilha: 'Cartilha',
  modelo: 'Modelo',
  outros: 'Outros',
};

const typeColors: Record<string, string> = {
  guia: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  formulario: 'bg-green-500/10 text-green-600 border-green-500/20',
  lei: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  decreto: 'bg-red-500/10 text-red-600 border-red-500/20',
  manual: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  cartilha: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  modelo: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  outros: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

const Documents = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: documents, isLoading } = useDocuments();

  const filteredDocuments = documents?.filter(doc =>
    (selectedType === 'all' || doc.document_type === selectedType) &&
    (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  ) || [];

  const isValid = (validUntil: string | null) => {
    if (!validUntil) return true;
    return new Date(validUntil).getTime() >= Date.now();
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Não informado';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-haiti-blue via-haiti-red to-ashbra-yellow">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Documentos <span className="text-ashbra-yellow">Oficiais</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Acesse guias, formulários, leis e documentos essenciais para regularização e direitos dos imigrantes
            </p>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  aria-label="Buscar documentos"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType} className="w-full md:w-48">
                <SelectTrigger aria-label="Filtrar por tipo de documento">
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {DOCUMENT_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Documents List */}
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-gray-200 rounded w-1/3" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileSearch className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum documento encontrado</h3>
                <p className="text-gray-500">Tente alterar os filtros ou a busca</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDocuments.map((doc) => {
                  const TypeIcon = typeIcons[doc.document_type] || FileText;
                  const typeColor = typeColors[doc.document_type] || typeColors.outros;
                  const valid = isValid(doc.valid_until);

                  return (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="py-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="p-3 bg-gray-100 rounded-lg">
                              <TypeIcon className="h-8 w-8 text-haiti-blue" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={typeColor}>{typeLabels[doc.document_type]}</Badge>
                                <span className="text-sm text-gray-500">{doc.category}</span>
                              </div>
                              <CardTitle className="text-lg truncate">{doc.title}</CardTitle>
                              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{doc.description}</p>
                              <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                                {doc.language && <span>🌐 {doc.language}</span>}
                                {doc.version && <span>📋 v{doc.version}</span>}
                                {doc.issuing_authority && <span>🏛️ {doc.issuing_authority}</span>}
                                <span>📅 Válido desde: {formatDate(doc.valid_from)}</span>
                                <span className={valid ? 'text-green-600' : 'text-red-600'}>
                                  {doc.valid_until ? `Até: ${formatDate(doc.valid_until)}` : 'Indeterminado'}
                                  {!valid && ' (Expirado)'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 md:ml-auto">
                            {doc.file_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(doc.file_url!, '_blank')}
                                className="gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Baixar
                              </Button>
                            )}
                            {doc.external_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(doc.external_url!, '_blank')}
                                className="gap-2"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Ver Online
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Categories Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tipos de Documentos Disponíveis</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {DOCUMENT_TYPES.map(type => {
                const Icon = typeIcons[type.value] || FileText;
                return (
                  <div key={type.value} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-haiti-blue/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${typeColors[type.value]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium">{type.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-haiti-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Não encontrou o que procura?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nossa equipe pode ajudar a localizar documentos específicos ou orientar sobre quais você precisa.
            </p>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-haiti-blue px-8 py-3">
              Falar com Especialista
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Documents;
