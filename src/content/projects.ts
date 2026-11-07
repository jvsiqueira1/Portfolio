import type { Language } from "./types";

export type ProjectCategory =
  | "imobiliario"
  | "saas"
  | "pessoal"
  | "landing"
  | "publico";

export type ProjectLinkStatus = "public" | "private" | "unavailable";

type Localized<T = string> = Record<Language, T>;

export type PortfolioProject = {
  slug: string;
  name: string;
  context: Localized;
  category: ProjectCategory;
  period: string;
  role: Localized;
  shortDescription: Localized;
  longDescription: Localized;
  highlights: Localized<string[]>;
  stack: string[];
  linkStatus: ProjectLinkStatus;
  url: string | null;
  image: string;
  alt: Localized;
  status?: Localized;
  featured: boolean;
  archive?: boolean;
  codePrivate: boolean;
};

export const projectsSection = {
  pt: {
    title: "Projetos que chegaram ao mundo real.",
    intro:
      "Produtos públicos, operações privadas e infraestrutura própria. Projetos privados aparecem só com dados fictícios.",
    featuredTitle: "Trabalho em destaque",
    allTitle: "Arquivo de projetos",
    allIntro: "Filtre por contexto e abra cada projeto para ver decisões, escopo e stack.",
    filterLabel: "Filtrar projetos por categoria",
    filters: {
      all: "Todos",
      imobiliario: "Imobiliário",
      saas: "SaaS & CRM",
      pessoal: "Produtos próprios",
      landing: "Landing pages",
      publico: "Setor público",
    },
    categoryLabel: "Categoria",
    roleLabel: "Papel",
    periodLabel: "Período",
    highlightsLabel: "Destaques",
    stackLabel: "Stack",
    openDetails: "Ver detalhes",
    closeDetails: "Fechar detalhes",
    visit: "Visitar projeto",
    publicLabel: "Site público",
    privateLabel: "Sem link público",
    unavailableLabel: "Fora do ar",
    privateCodeLabel: "Código privado",
    sectionLabel: "[02] // SISTEMAS",
    heading: "Sistemas em produção_",
    indexTitle: "Índice",
    columns: { number: "Nº", project: "Projeto", context: "Contexto", stack: "Stack", year: "Ano", status: "Status" },
    systemsUnit: "sistemas",
    viewAll: "Ver todos os sistemas",
    viewFewer: "Mostrar só os principais",
    status: { live: "NO AR", private: "PRIVADO", offline: "FORA DO AR" },
    syntheticData: "DADOS FICTÍCIOS",
    emptyCategory: "Nenhum sistema nesta categoria por enquanto.",
  },
  en: {
    title: "Projects built for the real world.",
    intro:
      "Public products, private operations and my own infrastructure. Private projects appear with synthetic data only.",
    featuredTitle: "Featured work",
    allTitle: "Project archive",
    allIntro: "Filter by context and open each project for its decisions, scope and stack.",
    filterLabel: "Filter projects by category",
    filters: {
      all: "All",
      imobiliario: "Real estate",
      saas: "SaaS & CRM",
      pessoal: "Independent products",
      landing: "Landing pages",
      publico: "Public sector",
    },
    categoryLabel: "Category",
    roleLabel: "Role",
    periodLabel: "Period",
    highlightsLabel: "Highlights",
    stackLabel: "Stack",
    openDetails: "View details",
    closeDetails: "Close details",
    visit: "Visit project",
    publicLabel: "Public website",
    privateLabel: "No public link",
    unavailableLabel: "Offline",
    privateCodeLabel: "Private code",
    sectionLabel: "[02] // SYSTEMS",
    heading: "Systems in production_",
    indexTitle: "Index",
    columns: { number: "No.", project: "Project", context: "Context", stack: "Stack", year: "Year", status: "Status" },
    systemsUnit: "systems",
    viewAll: "View all systems",
    viewFewer: "Show highlights only",
    status: { live: "LIVE", private: "PRIVATE", offline: "OFFLINE" },
    syntheticData: "SYNTHETIC DATA",
    emptyCategory: "No systems in this category yet.",
  },
} as const;

const legacyProjects: PortfolioProject[] = [
  {
    slug: "tamaras",
    name: "TAMARAS",
    context: { pt: "Tamaras Imobiliária · Maramores", en: "Tamaras Real Estate · Maramores" },
    category: "imobiliario",
    period: "2025-2026",
    role: { pt: "Desenvolvimento full-stack", en: "Full-stack development" },
    shortDescription: {
      pt: "Ecossistema imobiliário com vitrine pública, operação interna, jurídico e entrega de mídia.",
      en: "A real-estate ecosystem spanning the public catalog, internal operations, legal work and media delivery.",
    },
    longDescription: {
      pt: "A TAMARAS reúne o site público da Maramores, um painel operacional para imóveis, leads e publicações, uma API própria e serviços especializados para jurídico e imagens.",
      en: "TAMARAS brings together Maramores’ public website, an operations panel for listings, leads and publishing, a dedicated API, and specialist legal and image services.",
    },
    highlights: {
      pt: [
        "Busca de imóveis por bairro, tipo, valor, área e características.",
        "Painel com tabelas avançadas, leads, demandas, visitas e board de publicações.",
        "API em Fastify com Drizzle, PostgreSQL, RBAC e armazenamento compatível com S3.",
        "Worker de imagens com resize, cache e assinatura HMAC para originais protegidos.",
      ],
      en: [
        "Property search by neighborhood, type, price, area and amenities.",
        "Operations panel with advanced tables, leads, requests, visits and a publishing board.",
        "Fastify API with Drizzle, PostgreSQL, RBAC and S3-compatible storage.",
        "Image worker with resize, caching and HMAC-signed access to protected originals.",
      ],
    },
    stack: ["Next.js", "Fastify", "TypeScript", "PostgreSQL", "Cloudflare R2"],
    linkStatus: "public",
    url: "https://maramores.com.br/",
    image: "/projects/tamaras.webp",
    alt: {
      pt: "Página inicial da Tamaras com busca de imóveis sobre mosaico fotográfico",
      en: "Tamaras home page with a property search over a photographic mosaic",
    },
    featured: true,
    codePrivate: true,
  },
  {
    slug: "jipsy",
    name: "JIPSY",
    context: { pt: "JIPSY Imóveis", en: "JIPSY Real Estate" },
    category: "imobiliario",
    period: "2026",
    role: { pt: "Arquitetura e desenvolvimento full-stack", en: "Architecture and full-stack development" },
    shortDescription: {
      pt: "Vitrine editorial e sistema de gestão para uma operação imobiliária integrada.",
      en: "An editorial storefront and management system for an integrated real-estate operation.",
    },
    longDescription: {
      pt: "Três aplicações trabalham juntas: site público sem sessão, painel interno responsivo e API com quinze módulos de negócio, de pessoas e imóveis a propostas, contratos, financeiro e notificações.",
      en: "Three applications work together: a sessionless public website, a responsive internal panel, and an API with fifteen business modules spanning people, listings, proposals, contracts, finance and notifications.",
    },
    highlights: {
      pt: [
        "Site público com acervo facetado, ficha por código natural e catálogo de demonstração identificado.",
        "Painel com agenda, funil de leads, imóveis, pessoas, captações e avisos.",
        "API NestJS com RBAC por escopo, auditoria, PostgreSQL e armazenamento S3.",
        "Layouts próprios para telefone, incluindo listas adaptadas e navegação inferior.",
      ],
      en: [
        "Public site with faceted inventory, natural-code detail pages and clearly labeled demo listings.",
        "Panel for appointments, lead pipeline, properties, people, acquisitions and notifications.",
        "NestJS API with scoped RBAC, audit trails, PostgreSQL and S3 storage.",
        "Purpose-built mobile layouts including adapted lists and bottom navigation.",
      ],
    },
    stack: ["Next.js", "React", "NestJS", "Prisma", "PostgreSQL"],
    linkStatus: "public",
    url: "https://jipsy.com.br/",
    image: "/projects/jipsy.webp",
    alt: {
      pt: "Vitrine da JIPSY com filtros e imóvel em destaque",
      en: "JIPSY storefront with filters and a featured property",
    },
    featured: true,
    codePrivate: true,
  },
  {
    slug: "bdn-crm",
    name: "BDN CRM",
    context: { pt: "BDN Tech · CRM multi-tenant", en: "BDN Tech · Multi-tenant CRM" },
    category: "saas",
    period: "2025-2026",
    role: { pt: "Arquitetura e desenvolvimento full-stack", en: "Architecture and full-stack development" },
    shortDescription: {
      pt: "CRM multi-tenant com contatos, negócios, agenda, automações e plano de controle administrativo.",
      en: "A multi-tenant CRM for contacts, deals, schedules, automations and administrative control.",
    },
    longDescription: {
      pt: "Sucessor do CRM single-tenant da BDN Tech, separa plano de controle e dados por organização, inclui pipeline configurável e centraliza a operação comercial em uma base com isolamento por tenant.",
      en: "The successor to BDN Tech’s single-tenant CRM separates control and data planes by organization, adds configurable pipelines and centralizes commercial operations with tenant isolation.",
    },
    highlights: {
      pt: [
        "Contatos, negócios em Kanban, agenda, atividades e configurações por organização.",
        "Plano administrativo para organizações, usuários, auditoria e feature flags.",
        "RLS no PostgreSQL e criptografia por tenant para dados pessoais.",
        "Dashboards, automações por gatilho e observabilidade com métricas e logs.",
      ],
      en: [
        "Contacts, Kanban deals, calendar, activities and organization settings.",
        "Administrative control plane for organizations, users, audits and feature flags.",
        "PostgreSQL RLS and per-tenant encryption for personal data.",
        "Dashboards, trigger-based automations, metrics and log observability.",
      ],
    },
    stack: ["Next.js", "React", "Prisma", "PostgreSQL", "Better Auth"],
    linkStatus: "private",
    url: null,
    image: "/projects/bdn-crm.webp",
    alt: {
      pt: "Agenda do BDN CRM com navegação lateral e compromissos de demonstração",
      en: "BDN CRM calendar with side navigation and demo appointments",
    },
    featured: true,
    codePrivate: true,
  },
  {
    slug: "cdr-prospeccao",
    name: "CDR Prospecção",
    context: { pt: "CRM de prospecção comercial", en: "Sales prospecting CRM" },
    category: "saas",
    period: "2026",
    role: { pt: "Desenvolvimento full-stack", en: "Full-stack development" },
    shortDescription: {
      pt: "CRM de alta performance com leads, métricas, gamificação e análise de carteira.",
      en: "A high-performance CRM with leads, metrics, gamification and portfolio analysis.",
    },
    longDescription: {
      pt: "A aplicação organiza prospecção, follow-ups e conversão em uma interface para vendedores e líderes, com uma segunda frente dedicada a Share of Wallet e leitura de oportunidades por carteira.",
      en: "The application organizes prospecting, follow-ups and conversion for sellers and leaders, with a second workspace dedicated to Share of Wallet and portfolio opportunity analysis.",
    },
    highlights: {
      pt: [
        "Leads em tabela e Kanban, histórico, briefing e registro de contato.",
        "Dashboards de vendedor e liderança com métricas e gamificação.",
        "Share of Wallet com clientes, ativos, oportunidades, alertas e timeline.",
        "Autenticação Better Auth e isolamento de dados por usuário e organização.",
      ],
      en: [
        "Lead tables and Kanban, history, briefings and contact logs.",
        "Seller and leadership dashboards with metrics and gamification.",
        "Share of Wallet for clients, assets, opportunities, alerts and timelines.",
        "Better Auth authentication with user and organization data isolation.",
      ],
    },
    stack: ["React", "TypeScript", "Express", "Prisma", "PostgreSQL"],
    linkStatus: "private",
    url: null,
    image: "/projects/cdr-prospeccao.webp",
    alt: {
      pt: "Kanban do CDR Prospecção com leads sintéticos organizados por temperatura",
      en: "CDR Prospecção Kanban with synthetic leads organized by temperature",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "atlas-fai",
    name: "Atlas FAI",
    context: { pt: "Assessoria financeira via WhatsApp", en: "WhatsApp financial advisory" },
    category: "saas",
    period: "2025",
    role: { pt: "Desenvolvimento full-stack", en: "Full-stack development" },
    shortDescription: {
      pt: "Assistente financeiro via WhatsApp com assinatura, autenticação e dashboard web.",
      en: "A WhatsApp financial assistant with subscriptions, authentication and a web dashboard.",
    },
    longDescription: {
      pt: "O Atlas FAI transforma mensagens naturais no WhatsApp em registros, categorias e lembretes. O site cuida da aquisição e do checkout, enquanto a área autenticada concentra dashboard e gestão financeira.",
      en: "Atlas FAI turns natural-language WhatsApp messages into records, categories and reminders. The website handles acquisition and checkout, while the authenticated area provides the dashboard and financial management.",
    },
    highlights: {
      pt: [
        "Atendimento financeiro pelo WhatsApp com categorização automática e lembretes.",
        "Checkout de assinaturas com Stripe e autenticação e persistência no Supabase.",
        "Dashboard web para receitas, despesas, transações e relatórios.",
        "Fluxos de e-mail com Resend e automações integradas via n8n.",
      ],
      en: [
        "WhatsApp financial assistance with automatic categorization and reminders.",
        "Stripe subscription checkout with authentication and data in Supabase.",
        "Web dashboard for income, expenses, transactions and reports.",
        "Email flows with Resend and automations integrated through n8n.",
      ],
    },
    stack: ["Next.js 15", "TypeScript", "Supabase", "Stripe", "Resend", "n8n"],
    linkStatus: "private",
    url: null,
    image: "/projects/atlas-fai.webp",
    alt: {
      pt: "Demonstração do Atlas FAI registrando uma despesa fictícia em uma conversa",
      en: "Atlas FAI demo recording a fictional expense in a conversation",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "medpay",
    name: "MedPay",
    context: { pt: "Fintech para recebíveis médicos", en: "Medical receivables fintech" },
    category: "saas",
    period: "2026",
    role: { pt: "Desenvolvimento full-stack", en: "Full-stack development" },
    shortDescription: {
      pt: "Plataforma de antecipação de recebíveis com simulação, elegibilidade e operação administrativa.",
      en: "A receivables-advance platform with simulation, eligibility checks and administrative operations.",
    },
    longDescription: {
      pt: "Produto com landing e simulador, aplicativo do médico, painel administrativo e API em camadas. A regra financeira é recalculada no servidor antes de qualquer operação de antecipação.",
      en: "A product spanning a landing-page simulator, physician app, admin panel and layered API. Financial rules are recalculated server-side before any receivables advance.",
    },
    highlights: {
      pt: [
        "Simulador público de antecipação com prazos e taxa de referência.",
        "API Fastify organizada em rotas, casos de uso e persistência.",
        "Autenticação por convite para médicos e administração separada.",
        "Adapter bancário isolado para evolução sem acoplar o domínio ao provedor.",
      ],
      en: [
        "Public advance simulator with terms and a reference rate.",
        "Fastify API organized into routes, use cases and persistence.",
        "Invite-only physician authentication and a separate admin surface.",
        "Isolated banking adapter that keeps the domain independent from providers.",
      ],
    },
    stack: ["React", "React Native", "Fastify", "Drizzle", "PostgreSQL"],
    linkStatus: "private",
    url: null,
    image: "/projects/medpay.webp",
    alt: {
      pt: "Landing da MedPay com simulador de antecipação usando valores ilustrativos",
      en: "MedPay landing page with a receivables simulator using illustrative values",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "cartracker",
    name: "CarTracker",
    context: { pt: "PWA pessoal para veículos", en: "Personal vehicle PWA" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Produto e desenvolvimento full-stack", en: "Product and full-stack development" },
    shortDescription: {
      pt: "PWA mobile-first para abastecimentos, consumo, manutenção, viagens e alertas.",
      en: "A mobile-first PWA for fuel, consumption, maintenance, trips and alerts.",
    },
    longDescription: {
      pt: "Aplicação instalável e preparada para uso offline que concentra o histórico do carro, calcula consumo e quilometragem e integra rastreamento e notificações quando configurados.",
      en: "An installable, offline-ready application that centralizes vehicle history, calculates consumption and mileage, and supports tracking and notifications when configured.",
    },
    highlights: {
      pt: [
        "Registro de abastecimentos, manutenções e viagens.",
        "Experiência PWA instalável com sincronização offline.",
        "Integrações opcionais com Traccar, consulta veicular e Web Push.",
        "Testes com Vitest e validação de dados por Zod.",
      ],
      en: [
        "Fuel, maintenance and trip records.",
        "Installable PWA experience with offline synchronization.",
        "Optional Traccar, vehicle lookup and Web Push integrations.",
        "Vitest coverage and Zod data validation.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Serwist"],
    linkStatus: "private",
    url: null,
    image: "/projects/cartracker.webp",
    alt: {
      pt: "Painel do CarTracker com veículo e histórico sintéticos de consumo e manutenção",
      en: "CarTracker dashboard with synthetic vehicle, consumption and maintenance history",
    },
    featured: true,
    codePrivate: true,
  },
  {
    slug: "opengym",
    name: "OpenGYM",
    context: { pt: "Treinos e evolução corporal", en: "Workout and body-progress tracking" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Desenvolvimento full-stack", en: "Full-stack development" },
    shortDescription: {
      pt: "Tracker de academia self-hosted para treinos, planos, exercícios e peso corporal.",
      en: "A self-hosted gym tracker for workouts, plans, exercises and body weight.",
    },
    longDescription: {
      pt: "Aplicação focada em registrar o treino no telefone e acompanhar consistência e evolução, com biblioteca de exercícios, planejamento semanal, gráficos e suporte a instalação própria.",
      en: "A phone-first application for logging workouts and tracking consistency and progress, with an exercise library, weekly planning, charts and self-hosted deployment.",
    },
    highlights: {
      pt: [
        "Planejamento semanal e execução guiada de treinos.",
        "Histórico, sequência de treinos e evolução do peso.",
        "Biblioteca de exercícios e estatísticas de desempenho.",
        "Arquitetura self-hosted com aplicação web e API próprias.",
      ],
      en: [
        "Weekly planning and guided workout execution.",
        "History, workout streaks and body-weight progress.",
        "Exercise library and performance statistics.",
        "Self-hosted architecture with dedicated web app and API.",
      ],
    },
    stack: ["React", "Node.js", "PWA", "Docker"],
    linkStatus: "private",
    url: null,
    image: "/projects/opengym.webp",
    alt: {
      pt: "Tela inicial escura do OpenGYM com treino do dia e gráfico de peso",
      en: "Dark OpenGYM home screen with the day’s workout and a weight chart",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "eqi-one",
    name: "EQI One",
    context: { pt: "Gestão patrimonial", en: "Wealth management" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Arquitetura e desenvolvimento full-stack", en: "Architecture and full-stack development" },
    shortDescription: {
      pt: "Escritório patrimonial digital com carteiras, documentos, relatórios e análise assistida.",
      en: "A digital wealth office for portfolios, documents, reports and assisted analysis.",
    },
    longDescription: {
      pt: "Aplicação web e API para consolidar patrimônio e organizar documentos e relatórios. A arquitetura separa domínio, serviços e interfaces e oferece recursos de extração assistida quando configurados.",
      en: "A web application and API for consolidating wealth and organizing documents and reports. Its architecture separates domain, services and interfaces, with optional assisted extraction.",
    },
    highlights: {
      pt: [
        "Visão consolidada de patrimônio e carteiras.",
        "Fluxos de documentos, extração e relatórios.",
        "Aplicações web e API isoladas em monorepo.",
        "Deploy conteinerizado com armazenamento compatível com S3.",
      ],
      en: [
        "Consolidated wealth and portfolio views.",
        "Document, extraction and reporting workflows.",
        "Separate web and API applications in a monorepo.",
        "Containerized deployment with S3-compatible storage.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    linkStatus: "private",
    url: null,
    image: "/projects/eqi-one.webp",
    alt: {
      pt: "Visão consolidada do EQI One com patrimônio fictício de uma família de demonstração",
      en: "EQI One consolidated view with fictional wealth for a demo family",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "patrimonio",
    name: "Patrimônio",
    context: { pt: "Carteira de investimentos", en: "Investment portfolio" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Desenvolvimento full-stack", en: "Full-stack development" },
    shortDescription: {
      pt: "Leitura de carteira com importação de extratos, ativos, rentabilidade e CDI.",
      en: "A portfolio reader with statement import, assets, returns and CDI benchmarks.",
    },
    longDescription: {
      pt: "Ferramenta por convite para importar e conferir extratos, acompanhar ativos e visualizar o patrimônio com referências consistentes para aporte e rentabilidade.",
      en: "An invite-only tool for importing and reviewing statements, tracking assets and reading wealth with consistent contribution and return references.",
    },
    highlights: {
      pt: [
        "Importação e prévia de extratos antes da confirmação.",
        "Visões de ativos, patrimônio aportado e rentabilidade.",
        "Comparação com CDI e leitura por período.",
      ],
      en: [
        "Statement import with a review step before confirmation.",
        "Views for assets, contributed capital and returns.",
        "CDI comparison and period-based analysis.",
      ],
    },
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    linkStatus: "private",
    url: null,
    image: "/projects/patrimonio.webp",
    alt: {
      pt: "Carteira do Patrimônio com ativos, aportes e rentabilidade sintéticos",
      en: "Patrimônio portfolio with synthetic holdings, contributions and returns",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "orca-agent-office",
    name: "Orca Agent Office",
    context: { pt: "Orquestração multi-agente", en: "Multi-agent orchestration" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Produto, desktop e integração", en: "Product, desktop and integration" },
    shortDescription: {
      pt: "Interface desktop para observar runs, tarefas, agentes e o fluxo de trabalho do Orca.",
      en: "A desktop interface for observing Orca runs, tasks, agents and workflow state.",
    },
    longDescription: {
      pt: "Aplicativo Tauri que transforma eventos do orquestrador em uma visão operacional: escritório, runs, tarefas, agentes, métricas e histórico, com transporte local seguro e estados offline explícitos.",
      en: "A Tauri application that turns orchestrator events into an operational view: office, runs, tasks, agents, metrics and history, with secure local transport and explicit offline states.",
    },
    highlights: {
      pt: [
        "Visão de escritório e navegação por runs, tarefas e agentes.",
        "Bridge tipado entre o runtime Orca e a interface desktop.",
        "Estado offline preserva o último snapshot e comunica a reconciliação.",
        "Aplicação desktop com Tauri, React e testes de segurança do transporte local.",
      ],
      en: [
        "Office view plus navigation across runs, tasks and agents.",
        "Typed bridge between the Orca runtime and the desktop interface.",
        "Offline state preserves the latest snapshot and explains reconciliation.",
        "Tauri and React desktop app with local-transport security tests.",
      ],
    },
    stack: ["Tauri", "React", "TypeScript", "Rust", "Vite"],
    linkStatus: "private",
    url: null,
    image: "/projects/orca-agent-office.webp",
    alt: {
      pt: "Orca Agent Office exibindo uma run sintética com três tarefas e três agentes",
      en: "Orca Agent Office showing a synthetic run with three tasks and three agents",
    },
    featured: true,
    codePrivate: true,
  },
  {
    slug: "baco-producoes",
    name: "Baco Produções",
    context: { pt: "Produtora de eventos", en: "Event production company" },
    category: "landing",
    period: "2026",
    role: { pt: "Design e desenvolvimento front-end", en: "Design and front-end development" },
    shortDescription: {
      pt: "Landing institucional noir com campanhas de leads e acervo fotográfico protegido.",
      en: "A noir institutional landing page with lead campaigns and a protected photo archive.",
    },
    longDescription: {
      pt: "Site independente da Baco com narrativa institucional, eventos, labels e unidades. Campanhas públicas capturam leads via endpoint do CRM e o acervo usa gate de cadastro antes dos álbuns.",
      en: "Baco’s standalone site covers its story, events, labels and locations. Public campaigns capture leads through the CRM endpoint, while a registration gate protects photo albums.",
    },
    highlights: {
      pt: [
        "Landing responsiva em identidade monocromática própria.",
        "Campanhas públicas com consentimento, captcha e deduplicação no CRM.",
        "Índice de fotos, álbuns protegidos e lightbox em lotes.",
      ],
      en: [
        "Responsive landing page with a dedicated monochrome identity.",
        "Public campaigns with consent, captcha and CRM-side deduplication.",
        "Photo index, protected albums and batched lightbox loading.",
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "CSS", "Cloudflare R2"],
    linkStatus: "private",
    url: null,
    image: "/projects/baco-producoes.webp",
    alt: {
      pt: "Hero preto e branco da landing Baco Produções",
      en: "Black-and-white Baco Produções landing-page hero",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "bdn-tech",
    name: "BDN Tech",
    context: { pt: "Consultoria e software sob medida", en: "Consulting and bespoke software" },
    category: "landing",
    period: "2026",
    role: { pt: "Desenvolvimento front-end", en: "Front-end development" },
    shortDescription: {
      pt: "Landing comercial com soluções, cases, processo e formulário integrado ao CRM.",
      en: "A commercial landing page for solutions, cases, process and CRM-connected contact.",
    },
    longDescription: {
      pt: "Página institucional da BDN Tech construída para apresentar software sob medida e automação, conectar cases ao processo de trabalho e enviar oportunidades diretamente para a API pública do CRM.",
      en: "BDN Tech’s institutional page presents bespoke software and automation, ties case studies to its working process, and sends opportunities directly to the CRM’s public API.",
    },
    highlights: {
      pt: [
        "Narrativa comercial com soluções, cases e processo de entrega.",
        "Formulário de contato integrado ao endpoint público de leads.",
        "Interface responsiva com motion e assets da equipe.",
      ],
      en: [
        "Commercial narrative spanning solutions, cases and delivery process.",
        "Contact form connected to the public lead endpoint.",
        "Responsive interface with motion and team imagery.",
      ],
    },
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    linkStatus: "private",
    url: null,
    image: "/projects/bdn-tech.webp",
    alt: {
      pt: "Seção do método BDN Tech com as fases de diagnóstico, implementação e evolução",
      en: "BDN Tech methodology section with diagnosis, implementation and evolution phases",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "the-x-prime",
    name: "The X Prime",
    context: { pt: "Imóveis de alto padrão", en: "Luxury real estate" },
    category: "landing",
    period: "2026",
    role: { pt: "Desenvolvimento front-end", en: "Front-end development" },
    shortDescription: {
      pt: "Landing imobiliária de alto padrão com busca por tipo, localização e valor.",
      en: "A luxury real-estate landing page with search by type, location and price.",
    },
    longDescription: {
      pt: "Experiência institucional para curadoria de imóveis premium no Brasil e em Dubai, com hero editorial, busca guiada, apresentação de serviços e captação de contatos.",
      en: "An institutional experience for premium-property curation in Brazil and Dubai, with an editorial hero, guided search, service presentation and contact capture.",
    },
    highlights: {
      pt: [
        "Busca guiada por tipo de imóvel, localização e faixa de valor.",
        "Direção editorial para imóveis premium no Brasil e em Dubai.",
        "Seções de serviços, curadoria e contato responsivas.",
      ],
      en: [
        "Guided search by property type, location and price range.",
        "Editorial direction for premium listings in Brazil and Dubai.",
        "Responsive services, curation and contact sections.",
      ],
    },
    stack: ["React", "Vite", "CSS"],
    linkStatus: "unavailable",
    url: null,
    image: "/projects/the-x-prime.webp",
    alt: {
      pt: "Hero claro da The X Prime com busca de imóveis premium",
      en: "Light The X Prime hero with a premium-property search",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "marapp",
    name: "MarApp",
    context: { pt: "Gestão de projetos", en: "Project management" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Desenvolvimento full-stack", en: "Full-stack development" },
    shortDescription: {
      pt: "Gestão de projetos com workspaces, tarefas, colaboração, documentos e analytics.",
      en: "Project management with workspaces, tasks, collaboration, documents and analytics.",
    },
    longDescription: {
      pt: "Produto inspirado em ferramentas de gestão colaborativa, com espaços e listas hierárquicos, tarefas reordenáveis, comentários, permissões, documentos e gráficos por workspace. O produto foi descontinuado.",
      en: "A collaborative project-management product with hierarchical spaces and lists, reorderable tasks, comments, permissions, documents and workspace analytics. The product has been discontinued.",
    },
    highlights: {
      pt: [
        "Workspaces, espaços, listas e tarefas com prioridade e prazo.",
        "Drag-and-drop para listas e tarefas.",
        "Colaboração por membros, permissões e comentários.",
        "Documentos em blob storage e analytics com gráficos.",
      ],
      en: [
        "Workspaces, spaces, lists and tasks with priority and due dates.",
        "Drag-and-drop for lists and tasks.",
        "Member collaboration, permissions and comments.",
        "Blob document storage and chart-based analytics.",
      ],
    },
    stack: ["Next.js", "React", "Prisma", "PostgreSQL", "Vercel Blob"],
    linkStatus: "unavailable",
    url: null,
    image: "/projects/marapp.webp",
    alt: {
      pt: "Kanban do MarApp com tarefas sintéticas distribuídas entre quatro etapas",
      en: "MarApp Kanban with synthetic tasks distributed across four stages",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "agilizei",
    name: "Agilizei",
    context: { pt: "Marketplace de serviços", en: "Services marketplace" },
    category: "saas",
    period: "2025",
    role: { pt: "Desenvolvimento full-stack", en: "Full-stack development" },
    shortDescription: {
      pt: "Marketplace que conecta clientes e profissionais, do pedido ao orçamento aceito.",
      en: "A marketplace connecting clients and professionals from request to accepted quote.",
    },
    longDescription: {
      pt: "Aplicação com jornadas separadas para cliente, parceiro e administração. A versão atual da plataforma foi refeita pela empresa Agilizei sem participação do autor deste portfólio; o trabalho apresentado aqui se refere à versão original em que ele atuou.",
      en: "An application with separate client, partner and admin journeys. Agilizei rebuilt the platform’s current version without the participation of this portfolio’s author; the work presented here refers to the original version he contributed to.",
    },
    highlights: {
      pt: [
        "Autenticação por OTP e sessão JWT.",
        "Serviços em andamento e concluídos com orçamentos associados.",
        "Envio e aceite de propostas entre clientes e parceiros.",
        "Painéis administrativos para serviços, parceiros e categorias.",
      ],
      en: [
        "OTP authentication and JWT sessions.",
        "Active and completed services with associated quotes.",
        "Proposal submission and acceptance between clients and partners.",
        "Administrative panels for services, partners and categories.",
      ],
    },
    stack: ["React", "TypeScript", "Express", "Prisma", "PostgreSQL"],
    linkStatus: "private",
    url: null,
    image: "/projects/agilizei.webp",
    alt: {
      pt: "Portal do cliente Agilizei com três solicitações de serviço fictícias",
      en: "Agilizei client portal with three fictional service requests",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "gestao-gastos",
    name: "Gestão de Gastos",
    context: { pt: "Finanças pessoais", en: "Personal finance" },
    category: "pessoal",
    period: "2025-2026",
    role: { pt: "Desenvolvimento front-end", en: "Front-end development" },
    shortDescription: {
      pt: "Aplicação para organizar receitas, despesas e a leitura cotidiana das finanças.",
      en: "An application for organizing income, expenses and everyday financial visibility.",
    },
    longDescription: {
      pt: "Interface de finanças pessoais com autenticação, categorias e lançamentos, reunindo o acompanhamento mensal em um painel simples e responsivo.",
      en: "A personal-finance interface with authentication, categories and transactions, bringing monthly tracking into a simple responsive dashboard.",
    },
    highlights: {
      pt: [
        "Controle de contas, cartões, categorias e lançamentos.",
        "Relatórios visuais para leitura do mês.",
        "Autenticação e recuperação de acesso.",
      ],
      en: [
        "Account, card, category and transaction control.",
        "Visual reports for monthly review.",
        "Authentication and account recovery.",
      ],
    },
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    linkStatus: "private",
    url: null,
    image: "/projects/gestao-gastos.webp",
    alt: {
      pt: "Dashboard do Gestão de Gastos com receitas, despesas e saldo fictícios",
      en: "Expense Manager dashboard with fictional income, expenses and balance",
    },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "credencial-autista",
    name: "Credencial do Autista",
    context: { pt: "DETRAN-MT · Serviço público digital", en: "DETRAN-MT · Digital public service" },
    category: "publico",
    period: "2024",
    role: { pt: "Desenvolvimento front-end", en: "Front-end development" },
    shortDescription: {
      pt: "Serviço digital para a jornada de solicitação da credencial do autista.",
      en: "A digital service for the autism ID card application journey.",
    },
    longDescription: {
      pt: "Interface pública responsiva do DETRAN-MT para orientar o acesso e a solicitação da credencial, integrada ao login oficial do Estado.",
      en: "A responsive DETRAN-MT public interface that guides access to the autism ID application, integrated with the state’s official sign-in.",
    },
    highlights: {
      pt: [
        "Jornada digital responsiva para acesso ao serviço.",
        "Integração com o login oficial do Estado de Mato Grosso.",
        "Interface construída para um contexto de serviço público.",
      ],
      en: [
        "Responsive digital journey for accessing the service.",
        "Integration with Mato Grosso’s official state sign-in.",
        "Interface designed for a public-service context.",
      ],
    },
    stack: ["React", "Next.js", "Tailwind CSS", "REST APIs"],
    linkStatus: "public",
    url: "https://credencialdoautista.detran.mt.gov.br/",
    image: "/projects/credencial-autista.webp",
    alt: {
      pt: "Tela pública da Credencial do Autista do DETRAN-MT",
      en: "DETRAN-MT Autism ID public service screen",
    },
    featured: true,
    codePrivate: true,
  },
];

const newProjects: PortfolioProject[] = [
  {
    slug: "orchestration",
    name: "ORCHESTRATION",
    context: { pt: "Política e runtime multiagente · jvs-development", en: "Multi-agent policy and runtime · jvs-development" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Arquitetura, produto e desenvolvimento", en: "Architecture, product and development" },
    shortDescription: {
      pt: "Coordenação de agentes de código por evidência, com política versionada, runtime e app desktop.",
      en: "Evidence-driven coding-agent coordination with versioned policy, runtime services and a desktop app.",
    },
    longDescription: {
      pt: "O ecossistema classifica tarefas, qualifica workers pelo tuple efetivo, registra cada Dispatch e exige revisão independente conforme o risco. Reúne política em Python, app desktop Tauri/Rust e uma Model Intelligence API com PostgreSQL e RLS.",
      en: "The ecosystem classifies tasks, qualifies workers against their effective tuple, records every Dispatch and requires independent review based on risk. It combines Python policy, a Tauri/Rust desktop app and a Model Intelligence API backed by PostgreSQL and RLS.",
    },
    highlights: {
      pt: [
        "Seleção de workers por capacidade e evidência, sem lista fechada de modelos.",
        "Runs fixam release e digest; Tasks e Dispatches mantêm escopo, tuple e histórico.",
        "App desktop Tauri/Rust representa projetos, agentes e decisões humanas.",
        "API de inteligência ranqueia apenas candidatos já elegíveis e isola dados com RLS.",
      ],
      en: [
        "Worker selection by capability and evidence, without a closed model allowlist.",
        "Runs pin release and digest; Tasks and Dispatches preserve scope, tuple and history.",
        "A Tauri/Rust desktop app represents projects, agents and human decisions.",
        "The intelligence API ranks only already-eligible candidates and isolates data with RLS.",
      ],
    },
    stack: ["Python", "Rust", "Tauri", "PostgreSQL", "Next.js"],
    linkStatus: "private",
    url: null,
    image: "/projects/orchestration.png",
    alt: { pt: "Mapa generativo de nós do ecossistema Orchestration", en: "Generative node map for the Orchestration ecosystem" },
    featured: true,
    codePrivate: true,
  },
  {
    slug: "espaco-leve",
    name: "Espaço Leve",
    context: { pt: "Aplicativo desktop multiplataforma", en: "Cross-platform desktop application" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Produto e desenvolvimento", en: "Product and development" },
    shortDescription: {
      pt: "Manutenção segura de armazenamento para Windows, macOS e Linux.",
      en: "Safe storage maintenance for Windows, macOS and Linux.",
    },
    longDescription: {
      pt: "Aplicativo .NET com interface Avalonia que identifica caches e arquivos antigos, explica cada limpeza e mantém uma rotina semanal local. As ações são limitadas por plataforma, validam novamente o alvo e nunca apagam pastas recursivamente.",
      en: "A .NET desktop app with an Avalonia interface that identifies caches and old files, explains each cleanup and runs a local weekly routine. Actions are platform-scoped, revalidate targets and never delete directories recursively.",
    },
    highlights: {
      pt: ["Releases para Windows, macOS e Linux com runtime incluído.", "Proteções contra links, arquivos sensíveis e disputas de escrita.", "Inventário local de Docker sem system prune ou remoções destrutivas.", "Histórico local e rotina semanal configurável."],
      en: ["Windows, macOS and Linux releases with the runtime bundled.", "Protection against links, sensitive files and concurrent writes.", "Local Docker inventory without system prune or destructive removals.", "Local history and a configurable weekly routine."],
    },
    stack: [".NET 10", "C#", "Avalonia", "GitHub Actions"],
    linkStatus: "public",
    url: "https://github.com/jvsiqueira1/espaco-leve/releases",
    image: "/projects/espaco-leve.png",
    alt: { pt: "Composição generativa do aplicativo Espaço Leve", en: "Generative composition for the Espaço Leve app" },
    status: { pt: "LANÇADO", en: "RELEASE" },
    featured: false,
    codePrivate: false,
  },
  {
    slug: "projeto-adv",
    name: "projeto-adv",
    context: { pt: "Revisão contratual a partir da negociação", en: "Contract review from negotiation" },
    category: "saas",
    period: "2026",
    role: { pt: "Arquitetura e desenvolvimento", en: "Architecture and development" },
    shortDescription: { pt: "Fluxo rastreável de negociação até minuta revisada.", en: "A traceable flow from negotiation to reviewed draft." },
    longDescription: {
      pt: "Monorepo em construção com interface Vite/React, API NestJS multi-tenant protegida por RLS e serviço FastAPI que gera documentos DOCX a partir de contratos Zod e Pydantic sincronizados.",
      en: "A work-in-progress monorepo with a Vite/React interface, a multi-tenant NestJS API protected by RLS, and a FastAPI service that generates DOCX files from synchronized Zod and Pydantic contracts.",
    },
    highlights: {
      pt: ["Contratos Zod como fonte única para JSON Schema e Pydantic.", "Isolamento por escritório com PostgreSQL RLS forçado.", "Autenticação e papéis separados para domínio e identidade.", "Geração de DOCX com marcas de revisão rastreáveis."],
      en: ["Zod contracts as the single source for JSON Schema and Pydantic.", "Firm isolation with forced PostgreSQL RLS.", "Separate roles for domain data and identity.", "DOCX generation with traceable revision marks."],
    },
    stack: ["React", "NestJS", "FastAPI", "PostgreSQL"],
    linkStatus: "private",
    url: null,
    image: "/projects/projeto-adv.png",
    alt: { pt: "Composição generativa do fluxo projeto-adv", en: "Generative composition for the projeto-adv workflow" },
    status: { pt: "EM CONSTRUÇÃO", en: "IN PROGRESS" },
    featured: false,
    codePrivate: true,
  },
  {
    slug: "languages-chart",
    name: "Languages Chart",
    context: { pt: "GitHub Action de estatísticas de linguagens", en: "GitHub Action for language statistics" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Produto open source", en: "Open-source product" },
    shortDescription: { pt: "Gráfico SVG de linguagens, incluindo repositórios privados.", en: "An SVG language chart that can include private repositories." },
    longDescription: {
      pt: "Action sem dependências que consulta os metadados de linguagem visíveis ao token, agrega os bytes e mantém SVGs claro/escuro no README sem expor nomes de repositórios privados.",
      en: "A dependency-free Action that reads language metadata visible to the token, aggregates byte counts and maintains light/dark SVGs in a README without exposing private repository names.",
    },
    highlights: {
      pt: ["Inclui privados com permissão Metadata: Read-only.", "Temas claro, escuro e automático.", "Retentativas limitadas e falha isolada por repositório.", "Sem commit vazio quando o gráfico não muda."],
      en: ["Includes private repositories with Metadata: Read-only permission.", "Light, dark and automatic themes.", "Bounded retries and per-repository failure isolation.", "No empty commit when the chart is unchanged."],
    },
    stack: ["Node.js", "GitHub Actions", "SVG"],
    linkStatus: "public",
    url: "https://github.com/jvsiqueira1/gh-stats",
    image: "/projects/languages-chart.png",
    alt: { pt: "Gráfico generativo de linguagens do Languages Chart", en: "Generative language chart for Languages Chart" },
    status: { pt: "CÓDIGO ABERTO", en: "OPEN SOURCE" },
    featured: false,
    codePrivate: false,
  },
  {
    slug: "resumo-reuniao",
    name: "Resumo de Reunião",
    context: { pt: "Transcrição e resumo local assistido por IA", en: "AI-assisted local transcription and summaries" },
    category: "pessoal",
    period: "2026",
    role: { pt: "Produto e desenvolvimento full-stack", en: "Product and full-stack development" },
    shortDescription: { pt: "Transcrição Whisper/Groq e resumo estruturado com IA.", en: "Whisper/Groq transcription and structured AI summaries." },
    longDescription: {
      pt: "Aplicação web para áudio e vídeo com fila em background, transcrição via Groq, resumo opcional via OpenRouter, histórico SQLite e download em Markdown. Arquivos enviados são removidos após o processamento.",
      en: "A web app for audio and video with a background queue, Groq transcription, optional OpenRouter summaries, SQLite history and Markdown downloads. Uploaded files are removed after processing.",
    },
    highlights: {
      pt: ["Vários arquivos com resumo separado ou combinado.", "Fatiamento automático para áudios e transcrições longas.", "Histórico local persistente e uploads transitórios.", "Docker multi-stage com React e FastAPI na mesma porta."],
      en: ["Multiple files with separate or combined summaries.", "Automatic chunking for long audio and transcripts.", "Persistent local history with transient uploads.", "Multi-stage Docker build serving React and FastAPI on one port."],
    },
    stack: ["Python", "FastAPI", "React", "Docker"],
    linkStatus: "public",
    url: "https://github.com/jvsiqueira1/audio-to-text",
    image: "/projects/resumo-reuniao.svg",
    alt: { pt: "Forma de onda para o projeto Resumo de Reunião", en: "Waveform for the Meeting Summary project" },
    status: { pt: "CÓDIGO ABERTO", en: "OPEN SOURCE" },
    featured: false,
    codePrivate: false,
  },
];

const projectOrder = [
  "tamaras",
  "jipsy",
  "orchestration",
  "espaco-leve",
  "bdn-crm",
  "cartracker",
  "projeto-adv",
  "cdr-prospeccao",
  "medpay",
  "languages-chart",
  "resumo-reuniao",
  "credencial-autista",
  "atlas-fai",
] as const;

// Shown after "view all": earlier work kept from the previous portfolio.
// "orca-agent-office" is not listed: it was the first desktop office of the
// same ecosystem and is now covered by ORCHESTRATION (orchestration-desktop).
const archiveOrder = [
  "opengym",
  "eqi-one",
  "patrimonio",
  "gestao-gastos",
  "agilizei",
  "baco-producoes",
  "bdn-tech",
  "the-x-prime",
  "marapp",
] as const;

const featuredSlugs = new Set(["tamaras", "jipsy", "orchestration"]);
const projectPool = [...newProjects, ...legacyProjects];

function pick(slug: string) {
  const project = projectPool.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing project: ${slug}`);
  return project;
}

export const projects: PortfolioProject[] = [
  ...projectOrder.map((slug) => ({ ...pick(slug), featured: featuredSlugs.has(slug), archive: false })),
  ...archiveOrder.map((slug) => ({ ...pick(slug), featured: false, archive: true })),
];

export function localizeProject(project: PortfolioProject, language: Language) {
  return {
    ...project,
    context: project.context[language],
    role: project.role[language],
    shortDescription: project.shortDescription[language],
    longDescription: project.longDescription[language],
    highlights: project.highlights[language],
    alt: project.alt[language],
    status: project.status?.[language],
  };
}

export type LocalizedProject = ReturnType<typeof localizeProject>;

export type ProjectSectionCopy = (typeof projectsSection)[keyof typeof projectsSection];

export function projectStatus(project: LocalizedProject, copy: ProjectSectionCopy) {
  if (project.status) return project.status;
  if (project.linkStatus === "public") return copy.status.live;
  if (project.linkStatus === "unavailable") return copy.status.offline;
  return copy.status.private;
}
