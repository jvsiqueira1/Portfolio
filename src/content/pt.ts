import type { SiteContent } from "./types";

export const pt: SiteContent = {
  languageName: "Português",
  nav: {
    about: "Sobre",
    projects: "Projetos",
    experience: "Experiência",
    stack: "Stack",
    education: "Formação",
    contact: "Contato",
    menu: "Abrir menu",
    close: "Fechar menu",
    mainLabel: "Navegação principal",
    mobileLabel: "Navegação principal para dispositivos móveis",
    skip: "Pular para o conteúdo",
  },
  theme: { light: "Usar tema claro", dark: "Usar tema escuro" },
  hero: {
    availability: "Aberto a presencial, híbrido e remoto",
    name: "João Vitor",
    headline: "Construo sistemas que conectam produto, dados e operação.",
    summary:
      "Full-stack no DETRAN-MT, com Node.js, Nest.js, React, Next.js e PostgreSQL.",
    cvLabel: "Baixar CV",
    contactLabel: "Entrar em contato",
    portraitAlt: "Retrato de João Vitor",
    role: "Desenvolvedor Full-Stack e Analista de TI",
    location: "Cuiabá, MT, Brasil",
  },
  about: {
    title: "Código de ponta a ponta, com contexto de negócio.",
    lead:
      "Desenvolvo produtos no ecossistema JavaScript e TypeScript e transformo requisitos complexos em experiências claras, APIs consistentes e dados bem modelados.",
    body:
      "Hoje construo sistemas públicos no DETRAN-MT. Antes disso, passei por operação logística e atendi fintechs, varejo e serviços como desenvolvedor independente, sempre aproximando software e uso real.",
    pillars: [
      {
        title: "Produto e interface",
        text: "React e Next.js para jornadas acessíveis, responsivas e fáceis de manter.",
      },
      {
        title: "Serviços e dados",
        text: "Node.js, Nest.js, PostgreSQL e Prisma para regras de negócio e integrações.",
      },
      {
        title: "Entrega contínua",
        text: "Testes, Git, CI/CD e documentação para evoluir com segurança.",
      },
    ],
  },
  projects: {
    title: "Projetos selecionados",
    intro:
      "Cinco produtos que mostram diferentes contextos: mercado imobiliário, gestão, serviços e sistemas públicos.",
    visit: "Abrir projeto",
    privateLabel: "Projeto concluído sem link público",
    items: [
      {
        title: "TAMARAS",
        description:
          "Site institucional e catálogo de imóveis da Maramores, com front-end em Next.js e API em Fastify.",
        image: "/maramores.png",
        imageAlt: "Página do projeto TAMARAS para a Maramores",
        href: "https://maramores.com.br/",
        stack: ["Next.js", "Fastify", "Node.js"],
      },
      {
        title: "MarApp",
        description:
          "Sistema de gestão de projetos com workspaces, tarefas, múltiplas visualizações, colaboração e documentos.",
        image: "/marapp.png",
        imageAlt: "Interface do sistema MarApp",
        href: null,
        linkStatus: "Link temporariamente indisponível",
        stack: ["Next.js 15", "React 19", "TypeScript", "Prisma"],
      },
      {
        title: "Agilizei",
        description:
          "Marketplace de serviços desenvolvido com Node.js, TypeScript, PostgreSQL e Prisma.",
        image: "/agilizei.png",
        imageAlt: "Interface do marketplace Agilizei",
        href: null,
        stack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma"],
        note:
          "A versão atual em produção foi refeita pela equipe e não representa a implementação original.",
      },
      {
        title: "Gestão de Gastos",
        description:
          "Aplicação para organizar receitas, despesas e a leitura cotidiana das finanças pessoais.",
        image: "/gestaodegastos.png",
        imageAlt: "Painel do projeto Gestão de Gastos",
        href: "https://gestao.jvsdev.com.br/",
        stack: ["React", "TypeScript", "Dados"],
      },
      {
        title: "Credencial do Autista",
        description:
          "Serviço público digital do DETRAN-MT para a jornada de solicitação da credencial do autista.",
        image: "/credencial.png",
        imageAlt: "Página do serviço Credencial do Autista",
        href: "https://credencialdoautista.detran.mt.gov.br/",
        stack: ["React", "Next.js", "Tailwind CSS", "APIs REST"],
      },
    ],
    othersTitle: "Outros projetos e estudos",
    othersIntro: "Repositórios públicos recentes no GitHub.",
    others: [
      { name: "encurtador-de-links", language: "TypeScript", href: "https://github.com/jvsiqueira1/encurtador-de-links" },
      { name: "desafio-financy-ftr", language: "TypeScript", href: "https://github.com/jvsiqueira1/desafio-financy-ftr" },
      { name: "ai-sdk-ftr", language: "TypeScript", href: "https://github.com/jvsiqueira1/ai-sdk-ftr" },
      { name: "audio-to-text", language: "TypeScript", href: "https://github.com/jvsiqueira1/audio-to-text" },
      { name: "nestjs-rocketseat", language: "TypeScript", href: "https://github.com/jvsiqueira1/nestjs-rocketseat" },
      { name: "upload-server", language: "TypeScript", href: "https://github.com/jvsiqueira1/upload-server" },
    ],
  },
  experience: {
    title: "Experiência",
    intro:
      "Uma trajetória entre suporte, sistemas públicos, produtos sob demanda e operação.",
    current: "Atual",
    items: [
      {
        role: "Analista de TI - Engenheiro de Computação Sênior",
        company: "DETRAN-MT",
        period: "Jun 2026 - atual",
        location: "Cuiabá, MT",
        summary:
          "Desenvolvimento full-stack de aplicações web e mobile para sistemas internos do órgão.",
        highlights: [
          "Interfaces com React, Next.js e TypeScript; APIs e serviços com Node.js, Nest.js e PostgreSQL.",
          "Modelagem de dados, integração de APIs e documentação técnica.",
          "Apoio às unidades de TI na padronização e gestão do parque tecnológico.",
        ],
        stack: ["TypeScript", "Next.js", "Nest.js", "PostgreSQL"],
      },
      {
        role: "Trainee em Qualidade, TI e Operações",
        company: "Carvalima Transportes",
        period: "Mar 2026 - Abr 2026",
        location: "Cuiabá, MT",
        summary:
          "Imersão na operação logística para conectar processos, indicadores e oportunidades de melhoria a soluções técnicas.",
        highlights: [
          "Rodízio pelos setores da operação e mapeamento de processos.",
          "Relatórios por ciclo e case técnico final ligado ao negócio.",
        ],
        stack: ["Processos", "Indicadores", "Operações"],
      },
      {
        role: "Desenvolvedor Full-Stack",
        company: "Freelance / PJ",
        period: "Mar 2025 - Mai 2026",
        location: "Brasil",
        summary:
          "Produtos digitais sob demanda para fintechs, varejo e serviços, incluindo Grupo Optimus e Agilizei.",
        highlights: [
          "Sistemas de investimento com Java, Spring, React e automações de dados em Python.",
          "Marketplaces, CRMs e gestão esportiva com Node.js, TypeScript, PostgreSQL e Prisma.",
          "Site imobiliário maramores.com.br com Next.js e Fastify, além de testes e CI/CD.",
        ],
        stack: ["Node.js", "Java", "Python", "React", "PostgreSQL"],
      },
      {
        role: "Desenvolvedor Front-End",
        company: "Central IT, alocado no DETRAN-MT",
        period: "Out 2023 - Dez 2024",
        location: "Cuiabá, MT",
        summary:
          "Interfaces responsivas e acessíveis para sistemas públicos, incluindo Agendamento de Serviços e Credencial do Autista.",
        highlights: [
          "React, Next.js e Tailwind CSS com integração de APIs REST.",
          "Colaboração em times ágeis com Git e GitLab.",
        ],
        stack: ["React", "Next.js", "Tailwind CSS", "GitLab"],
      },
      {
        role: "Estagiário de Suporte e TI",
        company: "DETRAN-MT",
        period: "Set 2021 - Set 2023",
        location: "Cuiabá, MT",
        summary:
          "Suporte a usuários e sistemas internos, atendimento de chamados e manutenção de infraestrutura.",
        highlights: [
          "Triagem e resolução de chamados.",
          "Manutenção de redes, computadores, hardware e software.",
        ],
        stack: ["Suporte", "Redes", "Infraestrutura"],
      },
    ],
  },
  stack: {
    title: "Tecnologias",
    intro: "Ferramentas que uso para construir, testar e colocar produtos em movimento.",
    categories: [
      { title: "Front-end", items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
      { title: "Back-end", items: ["Node.js", "Express", "Nest.js", "Fastify", "Java", "Spring Boot", "Python"] },
      { title: "Dados", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
      { title: "Qualidade", items: ["Jest", "Cypress", "Postman", "Documentação"] },
      { title: "Entrega", items: ["Docker", "AWS", "CI/CD", "Git", "GitHub", "GitLab"] },
      { title: "Prática", items: ["Scrum", "POO", "Arquitetura de software", "Figma"] },
    ],
  },
  education: {
    title: "Formação",
    intro: "Base acadêmica em engenharia e aprofundamento contínuo em produto, software e infraestrutura.",
    items: [
      {
        course: "Pós-graduação em Desenvolvimento Full-Stack - Tech Developer 360",
        institution: "Faculdade de Tecnologia Rocketseat",
        period: "Jan 2026 - Jan 2027",
        status: "Em andamento",
        description: "Back-end, microsserviços, infraestrutura, DevOps, produto e IA aplicada.",
      },
      {
        course: "Bacharelado em Engenharia da Computação",
        institution: "UNIC - Universidade de Cuiabá",
        period: "Jan 2021 - Dez 2025",
        status: "Concluído",
      },
      {
        course: "Engenheiro de Software",
        institution: "Escola DNC",
        period: "Jun 2025 - atual",
        status: "Em andamento",
      },
      {
        course: "Desenvolvedor Front-End",
        institution: "Escola DNC",
        period: "Out 2024 - Jun 2025",
        status: "Concluído",
      },
    ],
    languagesTitle: "Idiomas",
    languages: ["Português nativo", "Inglês avançado (C1)"],
  },
  contact: {
    title: "Vamos construir algo que funcione no mundo real.",
    text: "Estou em Cuiabá e aberto a conversas sobre produto, engenharia e novas oportunidades.",
    emailLabel: "Enviar e-mail",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    location: "Cuiabá, MT, Brasil",
  },
  cookie: {
    message:
      "Uso analytics somente com sua permissão para entender como o portfólio é visitado.",
    accept: "Aceitar",
    decline: "Recusar",
  },
  footer: "Projetado e desenvolvido por João Vitor.",
};
