import type { SiteContent } from "./types";

export const pt: SiteContent = {
  languageName: "Português",
  nav: {
    about: "Sobre",
    projects: "Sistemas",
    experience: "Log",
    stack: "Stack",
    education: "Formação",
    contact: "Contato",
    menu: "Abrir menu",
    close: "Fechar menu",
    mainLabel: "Navegação principal",
    mobileLabel: "Navegação principal para dispositivos móveis",
    skip: "Pular para o conteúdo",
  },
  hero: {
    boot: [
      "> boot jvs.sys ................ ok",
      "> carregando 97 repositórios próprios .. ok",
      "> montando sistemas / log ...... ok",
      "> link cuiabá ↔ remoto ......... ok",
      "> pronto para construir_",
    ],
    availability: "Aberto a presencial · híbrido · remoto",
    name: "João Vitor",
    headline: "Construo sistemas que aguentam o mundo real.",
    summary:
      "Full-stack no DETRAN-MT, com Node.js, Nest.js, React, Next.js e PostgreSQL.",
    cvLabel: "Baixar CV",
    contactLabel: "Entrar em contato",
    portraitAlt: "Retrato de João Vitor",
    role: "Desenvolvedor Full-Stack e Analista de TI",
    location: "Cuiabá, MT, Brasil",
    stats: [
      { value: "97", label: "repositórios próprios" },
      { value: "22", label: "sistemas no índice" },
      { value: "05", label: "anos de estrada" },
      { value: "02", label: "idiomas" },
    ],
  },
  about: {
    label: "[01] // SOBRE",
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
  experience: {
    label: "[03] // LOG DE CARREIRA",
    command: "git log --carreira",
    head: "HEAD → DETRAN-MT",
    title: "Log de carreira",
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
        period: "Mar 2025 - Jan 2026",
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
        role: "Desenvolvedor Front-End Júnior",
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
    label: "[04] // MÓDULOS CARREGADOS",
    title: "Stack",
    intro: "Ferramentas organizadas pelo trabalho que resolvem, sem barras de nível.",
    categories: [
      { module: "fe.mod", title: "Front-end", items: ["React", "Next.js", "Tailwind CSS", "Motion", "HTML/CSS"] },
      { module: "be.mod", title: "Back-end", items: ["Node.js", "NestJS", "Fastify", "Java/Spring", "Python"] },
      { module: "db.mod", title: "Dados", items: ["PostgreSQL", "Prisma", "Drizzle", "MySQL", "MongoDB"] },
      { module: "qa.mod", title: "Qualidade", items: ["Vitest/Jest", "Cypress", "Playwright", "Contratos"] },
      { module: "ops.mod", title: "Entrega", items: ["Docker", "AWS", "CI/CD", "Coolify", "Vercel"] },
      { module: "ai.mod", title: "Agentes", items: ["Claude Code", "Codex", "Orquestração", "MCP"] },
    ],
  },
  education: {
    label: "[05] // FORMAÇÃO",
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
        period: "Jun 2025 - Mai 2026",
        status: "Concluído",
      },
      {
        course: "Desenvolvedor Front-End",
        institution: "Escola DNC",
        period: "Ago 2024 - Jun 2025",
        status: "Concluído",
      },
    ],
    languagesTitle: "Idiomas",
    languages: ["Português nativo", "Inglês avançado (C1)"],
    certificates: {
      label: "[05.1] // CERTIFICADOS",
      title: "1.247 horas certificadas_",
      intro: "Sete trilhas completas e um certificado de proficiência, sem publicar PDFs com dados acadêmicos.",
      verify: "Verificar",
      items: [
        { value: "314H", title: "Tech Lead", issuer: "Escola DNC", date: "05/2026", code: "CERT-1779166510577-YOTB" },
        { value: "276H", title: "Arquiteto de Software", issuer: "Escola DNC", date: "05/2026", code: "CERT-1779167410438-SWWH" },
        { value: "246H", title: "Engenheiro de Software", issuer: "Escola DNC", date: "05/2026", code: "CERT-1779165937085-G1W5" },
        { value: "121H", title: "Desenvolvedor Back-End", issuer: "Escola DNC", date: "05/2026", code: "CERT-1779166026958-2UTR" },
        { value: "120H", title: "Full Stack, Cloud, DevOps e IA", issuer: "Rocketseat · Pós", date: "11/2026", code: "c4fa9ef3-383d-4dee-b434-3f7df77974b7", href: "https://app.rocketseat.com.br/certificates/c4fa9ef3-383d-4dee-b434-3f7df77974b7" },
        { value: "110H", title: "Desenvolvedor Front-End", issuer: "Escola DNC", date: "05/2025", code: "Sem código público" },
        { value: "60H", title: "Projeto prático: plataforma Agilizei", issuer: "DNC × Agilizei", date: "04/2025", code: "Sem código público" },
        { value: "C1", title: "Inglês · EF SET 68/100", issuer: "EF SET", date: "04/2025", code: "oFxWwy", href: "https://cert.efset.org/pt/oFxWwy" },
      ],
    },
  },
  contact: {
    label: "[06] // CONTATO",
    title: "Vamos construir",
    text: "Estou em Cuiabá e aberto a conversas sobre produto, engenharia e novas oportunidades.",
    emailLabel: "Enviar e-mail",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    location: "Cuiabá, MT, Brasil",
    email: "joaovitorsc@gmail.com",
    backToTop: "Voltar ao topo",
  },
  ui: {
    statsLabel: "Números do portfólio",
    statusLabel: "Status e horário de Cuiabá",
    heroRole: "FULL-STACK · ANALISTA DE TI · DETRAN-MT",
    scroll: "Rolar",
    contactShort: "Contato",
    subject: "Sujeito: JVS · Cuiabá/MT",
    terminalPath: "~/jvs/carreira — zsh — 120×40",
    commits: "commits",
    running: "RUNNING",
    certificatesCount: "8 de 25 certificados · sem PDFs públicos",
    writeTo: "> escreva para",
    build: "Build 26.11.06 · Next.js · feito em Cuiabá/MT",
    cursorOpen: "[ ABRIR ]",
  },
  cookie: {
    message:
      "Uso analytics somente com sua permissão para entender como o portfólio é visitado.",
    accept: "Aceitar",
    decline: "Recusar",
  },
  footer: "Projetado e desenvolvido por João Vitor.",
};
