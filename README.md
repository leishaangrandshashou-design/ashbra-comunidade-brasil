# ASHBRA - Associação para Solidariedade dos Haitianos no Brasil

Plataforma web da **ASHBRA** - Associação para Solidariedade dos Haitianos no Brasil. O projeto promove a integração cultural, oferece suporte jurídico e social, e preserva a herança haitiana no Brasil, com foco na regional de Curitiba (PR).

## Funcionalidades

- **Página institucional**: sobre a associação, missão, objetivos, eventos, notícias, galeria, doações e contato.
- **Portal do membro**: cadastro, login, recuperação de senha e área do usuário (`/dashboard`, `/perfil`).
- **Serviços**: solicitação de serviços de documentação, emprego, educação, saúde, jurídico, social e cultural.
- **Vagas de emprego**: lista de oportunidades e candidatura.
- **Cursos**: catálogo de cursos e inscrição.
- **Eventos**: agenda de eventos culturais e educativos com inscrição.
- **Documentos**: guias, formulários e materiais de referência para download.
- **Painel administrativo**: gerenciamento de serviços, vagas, cursos, eventos, documentos, comunicados, depoimentos e usuários (`/admin`).

## Tecnologias

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) (autenticação, banco de dados e RLS)

## Como rodar localmente

Pré-requisitos: Node.js e npm (ou bun) instalados.

```sh
# 1. Instalar as dependências
npm install

# 2. Configurar as variáveis de ambiente
# Copie .env.example para .env.local e preencha com as credenciais do seu projeto Supabase
cp .env.example .env.local

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

## Configuração do Supabase

1. Crie um projeto em [Supabase](https://supabase.com).
2. Execute o script `supabase/schema.sql` no **SQL Editor** do seu projeto.
3. Configure a autenticação (Auth > URL Configuration) apontando o redirect para a URL do seu site.
4. Adicione em `.env.local`:

```
VITE_SUPABASE_URL="https://SEU-PROJETO.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sua-chave-anon"
```

## Deploy

O projeto é uma SPA estática e pode ser hospedada em qualquer provedor (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc). Bastar rodar `npm run build` e publicar a pasta `dist`.

## Estrutura

```
src/
  components/       # Componentes de UI e seções da home
  context/          # Contexto de autenticação
  hooks/            # Hooks customizados
  integrations/     # Cliente e tipos do Supabase
  lib/              # Utilitários
  pages/            # Páginas da aplicação (públicas, auth, admin)
supabase/           # Schema do banco de dados e migrações
public/uploads/     # Imagens do site
```