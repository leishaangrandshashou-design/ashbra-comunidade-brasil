import { useMemo } from 'react';

interface Campaign {
  title: string;
  description: string;
  goal: number;
  current: number;
  emoji: string;
}

export const useEmergencyCampaign = (): Campaign => {
  return useMemo(() => {
    const now = new Date();
    const month = now.getMonth(); // 0-11

    // Janeiro - Fevereiro: Volta às Aulas
    if (month >= 0 && month <= 1) {
      return {
        title: "Campanha Volta às Aulas 2025",
        description: "Precisamos de material escolar, uniformes e mochilas para 250 crianças e adolescentes iniciarem o ano letivo com dignidade.",
        goal: 75000,
        current: 45000,
        emoji: "📚"
      };
    }
    
    // Março - Maio: Outono - Agasalhos e Alimentos
    if (month >= 2 && month <= 4) {
      return {
        title: "Campanha Outono Solidário",
        description: "Com a chegada do outono, precisamos de agasalhos leves, cobertores e alimentos nutritivos para 180 famílias.",
        goal: 55000,
        current: 38000,
        emoji: "🍂"
      };
    }
    
    // Junho - Agosto: Inverno
    if (month >= 5 && month <= 7) {
      return {
        title: "Campanha Inverno Solidário",
        description: "Precisamos urgentemente de cobertores, roupas de frio e alimentos para ajudar 200 famílias durante o inverno.",
        goal: 50000,
        current: 37500,
        emoji: "❄️"
      };
    }
    
    // Setembro - Outubro: Primavera - Saúde e Higiene
    if (month >= 8 && month <= 9) {
      return {
        title: "Campanha Primavera da Saúde",
        description: "Arrecadação para kits de higiene, roupas leves e protetor solar para preparar 220 famílias para o verão. Meta: R$ 60.000",
        goal: 60000,
        current: 42000,
        emoji: "🌸"
      };
    }
    
    // Novembro - Dezembro: Fim de Ano
    return {
      title: "Campanha Natal Solidário",
      description: "Vamos levar alegria e dignidade no Natal! Precisamos de cestas natalinas, brinquedos e roupas novas para 300 famílias.",
      goal: 85000,
      current: 55000,
      emoji: "🎄"
    };
  }, []);
};
