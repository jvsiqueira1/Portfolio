"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "pt" ? "en" : "pt";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    const translations: Record<string, Record<Language, string>> = {
      // Navigation
      "nav.projects": { pt: "Projetos", en: "Projects" },
      "nav.technologies": { pt: "Tecnologias", en: "Technologies" },
      "nav.experience": { pt: "Experiências", en: "Experience" },
      "nav.about": { pt: "Sobre mim", en: "About" },

      // Hero
      "hero.title": {
        pt: "Desenvolvedor Full Stack",
        en: "Full Stack Developer",
      },
      "hero.description": {
        pt: "Desenvolvedor Full Stack especializado em Node.js, TypeScript e React.js. Com vivência em metodologias ágeis e projetos reais, transformo requisitos complexos em soluções web acessíveis e performáticas. Foco constante em qualidade de código e novas tecnologias.",
        en: "Full Stack Developer specializing in Node.js, TypeScript, and React.js. Experienced with agile methodologies and real-world projects, I transform complex requirements into accessible, high-performance web solutions. Constantly focused on code quality and emerging technologies.",
      },
      "hero.cta": { pt: "Saiba mais", en: "Learn more" },

      // Projects
      "projects.title": { pt: "Projetos", en: "Projects" },
      "projects.subtitle": {
        pt: "Alguns dos projetos que desenvolvi e participei",
        en: "Some of the projects I developed and participated in",
      },
      "projects.status.finished": { pt: "Finalizado", en: "Finished" },
      "projects.seeMore": { pt: "Saiba mais", en: "Learn more" },
      "projects.showMore": { pt: "Ver mais", en: "Show more" },
      "projects.showLess": { pt: "Ver menos", en: "Show less" },

      // Technologies
      "technologies.title": { pt: "Tecnologias", en: "Technologies" },
      "technologies.subtitle": {
        pt: "Ferramentas e linguagens com as quais tenho experiência",
        en: "Tools and languages I have experience with",
      },
      "technologies.categories.languages": {
        pt: "Linguagens",
        en: "Languages",
      },
      "technologies.categories.frontend": { pt: "Frontend", en: "Frontend" },
      "technologies.categories.backend": { pt: "Backend", en: "Backend" },
      "technologies.categories.database": { pt: "Database", en: "Database" },
      "technologies.categories.devops": {
        pt: "DevOps & Cloud",
        en: "DevOps & Cloud",
      },
      "technologies.categories.tools": {
        pt: "Ferramentas & Metodologias",
        en: "Tools & Methodologies",
      },

      // Experience
      "experience.title": {
        pt: "Experiências Profissionais",
        en: "Professional Experience",
      },
      "experience.subtitle": {
        pt: "Minha trajetória profissional e contribuições em projetos reais",
        en: "My professional journey and contributions to real projects",
      },
      "experience.optimus.description": {
        pt: "Atuo na manutenção e evolução de sistemas Full-Stack utilizando Java, Spring Boot e React.js. Desenvolvo automações estratégicas em Python para coleta e processamento de dados (web scraping) no setor de investimentos, colaborando ativamente em ambiente ágil para otimizar a arquitetura e o desempenho das aplicações.",
        en: "I work on maintaining and evolving Full-Stack systems using Java, Spring Boot and React.js. I develop strategic automations in Python for data collection and processing (web scraping) in the investment sector, actively collaborating in an agile environment to optimize architecture and application performance.",
      },
      "experience.agilizei.description": {
        pt: "Desenvolvi aplicações completas utilizando React, TypeScript e Node.js, criando interfaces responsivas e APIs RESTful robustas. Implementei arquiteturas de banco de dados com PostgreSQL e Prisma ORM, garantindo a integridade dos dados e a qualidade do código através de versionamento com Git e testes de integração.",
        en: "I developed complete applications using React, TypeScript and Node.js, creating responsive interfaces and robust RESTful APIs. I implemented database architectures with PostgreSQL and Prisma ORM, ensuring data integrity and code quality through versioning with Git and integration tests.",
      },
      "experience.centralit.description": {
        pt: "Criei interfaces web responsivas e acessíveis para sistemas públicos de alto impacto, utilizando React.js e Tailwind CSS. Integrei APIs RESTful para exibição dinâmica de dados e colaborei em equipes ágeis, assegurando a entrega contínua e o versionamento de código via Git e GitLab, com foco em usabilidade.",
        en: "I created responsive and accessible web interfaces for high-impact public systems, using React.js and Tailwind CSS. I integrated RESTful APIs for dynamic data display and collaborated in agile teams, ensuring continuous delivery and code versioning via Git and GitLab, focusing on usability.",
      },
      "experience.detran.description": {
        pt: "Prestei suporte técnico especializado a usuários e sistemas internos, garantindo a alta disponibilidade de hardwares e softwares. Atuei na triagem e resolução ágil de chamados e na manutenção de infraestrutura de redes e computadores, contribuindo diretamente para a eficiência operacional do setor.",
        en: "I provided specialized technical support to users and internal systems, ensuring high availability of hardware and software. I worked on agile ticket triage and resolution and maintenance of network and computer infrastructure, directly contributing to the operational efficiency of the sector.",
      },
      "experience.period.present": { pt: "Presente", en: "Present" },
      "experience.location.brazil": { pt: "Brasil", en: "Brazil" },

      // About
      "about.title": { pt: "Sobre Mim", en: "About Me" },
      "about.subtitle": {
        pt: "Minha jornada profissional e acadêmica, desde os primeiros passos até os desafios atuais",
        en: "My professional and academic journey, from the first steps to current challenges",
      },
      "about.contact.title": { pt: "Entre em Contato", en: "Get in Touch" },
      "about.contact.subtitle": {
        pt: "Estou sempre aberto a novas oportunidades e conversas sobre tecnologia",
        en: "I am always open to new opportunities and conversations about technology",
      },
      "about.types.education": { pt: "Educação", en: "Education" },
      "about.types.work": { pt: "Trabalho", en: "Work" },
      "about.types.growth": { pt: "Crescimento", en: "Growth" },
      "about.roadmap.education.title": {
        pt: "Início da Graduação",
        en: "Start of Graduation",
      },
      "about.roadmap.education.subtitle": {
        pt: "Engenharia da Computação - UNIC",
        en: "Computer Engineering - UNIC",
      },
      "about.roadmap.education.description": {
        pt: "Iniciei minha jornada acadêmica em Engenharia da Computação na Universidade Federal de Mato Grosso, onde adquiri fundamentos sólidos em programação, algoritmos e arquitetura de sistemas.",
        en: "I started my academic journey in Computer Engineering at the Federal University of Mato Grosso, where I acquired solid foundations in programming, algorithms and systems architecture.",
      },
      "about.roadmap.internship.title": {
        pt: "Primeiro Estágio",
        en: "First Internship",
      },
      "about.roadmap.internship.subtitle": {
        pt: "Estagiário de Suporte - Detran MT",
        en: "Support Intern - Detran MT",
      },
      "about.roadmap.internship.description": {
        pt: "Iniciei minha trajetória profissional como estagiário de suporte técnico, prestando assistência a usuários, realizando manutenção de equipamentos e adquirindo experiência prática em redes e sistemas internos.",
        en: "I started my professional journey as a technical support intern, providing assistance to users, performing equipment maintenance and gaining practical experience in networks and internal systems.",
      },
      "about.roadmap.frontend.title": {
        pt: "Desenvolvedor Front End",
        en: "Front End Developer",
      },
      "about.roadmap.frontend.subtitle": {
        pt: "Central IT - Out. 2023 a Dez. 2024",
        en: "Central IT - Oct. 2023 to Dec. 2024",
      },
      "about.roadmap.frontend.description": {
        pt: "Dediquei-me ao desenvolvimento de interfaces web responsivas e acessíveis para sistemas públicos de alto impacto. Utilizei React.js e Tailwind CSS, integrei APIs RESTful e colaborei em equipes ágeis, focando em usabilidade e acessibilidade.",
        en: "I dedicated myself to developing responsive and accessible web interfaces for high-impact public systems. I used React.js and Tailwind CSS, integrated RESTful APIs and collaborated in agile teams, focusing on usability and accessibility.",
      },
      "about.roadmap.growth.title": {
        pt: "Aprofundamento Técnico",
        en: "Technical Deepening",
      },
      "about.roadmap.growth.subtitle": {
        pt: "Expansão de Conhecimentos",
        en: "Knowledge Expansion",
      },
      "about.roadmap.growth.description": {
        pt: "Aprofundei meus conhecimentos em TypeScript, Next.js e metodologias ágeis. Desenvolvi habilidades sólidas em versionamento de código com Git, GitHub e GitLab, garantindo entregas contínuas e de qualidade.",
        en: "I deepened my knowledge in TypeScript, Next.js and agile methodologies. I developed solid skills in code versioning with Git, GitHub and GitLab, ensuring continuous and quality deliveries.",
      },
      "about.roadmap.fullstack1.title": {
        pt: "Desenvolvedor Full Stack",
        en: "Full Stack Developer",
      },
      "about.roadmap.fullstack1.subtitle": {
        pt: "Agilizei - Mar. a Jun. 2025",
        en: "Agilizei - Mar. to Jun. 2025",
      },
      "about.roadmap.fullstack1.description": {
        pt: "Desenvolvi aplicações completas full-stack utilizando React, TypeScript e Node.js. Implementei arquiteturas de banco de dados com PostgreSQL e Prisma ORM, criando interfaces responsivas e APIs RESTful robustas.",
        en: "I developed complete full-stack applications using React, TypeScript and Node.js. I implemented database architectures with PostgreSQL and Prisma ORM, creating responsive interfaces and robust RESTful APIs.",
      },
      "about.roadmap.fullstack2.title": {
        pt: "Desenvolvedor Full Stack",
        en: "Full Stack Developer",
      },
      "about.roadmap.fullstack2.subtitle": {
        pt: "Grupo Optimus - Set. 2025 (Atual)",
        en: "Grupo Optimus - Sep. 2025 (Current)",
      },
      "about.roadmap.fullstack2.description": {
        pt: "Atuo na manutenção e evolução de sistemas Full-Stack utilizando Java, Spring Boot e React.js. Desenvolvo automações estratégicas em Python para coleta e processamento de dados (web scraping) no setor de investimentos, colaborando em ambiente ágil.",
        en: "I work on maintaining and evolving Full-Stack systems using Java, Spring Boot and React.js. I develop strategic automations in Python for data collection and processing (web scraping) in the investment sector, collaborating in an agile environment.",
      },
      "about.roadmap.graduation.title": {
        pt: "Conclusão da Graduação",
        en: "Graduation Completion",
      },
      "about.roadmap.graduation.subtitle": {
        pt: "Engenharia da Computação - UNIC",
        en: "Computer Engineering - UNIC",
      },
      "about.roadmap.graduation.description": {
        pt: "Finalizei minha graduação em Engenharia da Computação na Universidade Federal de Mato Grosso, consolidando conhecimentos em desenvolvimento de software, arquitetura de sistemas, banco de dados e engenharia de software. A formação acadêmica complementou minha experiência prática, proporcionando uma base sólida para atuação profissional.",
        en: "I completed my degree in Computer Engineering at the Federal University of Mato Grosso, consolidating knowledge in software development, systems architecture, databases and software engineering. Academic training complemented my practical experience, providing a solid foundation for professional practice.",
      },

      // Projects descriptions
      "projects.marapp": {
        pt: "Sistema completo de gestão de projetos inspirado em ClickUp, desenvolvido com Next.js 15 (App Router), React 19, TypeScript e Prisma ORM. Oferece hierarquia organizacional flexível (Workspaces → Spaces → Folders → Lists → Tasks), múltiplas visualizações (Kanban, Calendário, Dashboard), rastreamento de tempo, dependências entre tarefas, sistema de convites, comentários e armazenamento de documentos. Implementa autenticação OAuth, Row-Level Security, drag & drop performático e queries otimizadas para escalabilidade. Demonstra expertise em arquitetura full-stack moderna, type-safety end-to-end e padrões avançados de engenharia de software.",
        en: "Complete project management system inspired by ClickUp, developed with Next.js 15 (App Router), React 19, TypeScript and Prisma ORM. Offers flexible organizational hierarchy (Workspaces → Spaces → Folders → Lists → Tasks), multiple views (Kanban, Calendar, Dashboard), time tracking, task dependencies, invitation system, comments and document storage. Implements OAuth authentication, Row-Level Security, performant drag & drop and optimized queries for scalability. Demonstrates expertise in modern full-stack architecture, end-to-end type-safety and advanced software engineering patterns.",
      },
      "projects.agilizei": {
        pt: "Plataforma web desenvolvida para conectar clientes a profissionais de serviços gerais de forma prática e segura. Durante minha participação no projeto, desenvolvi funcionalidades que permitiam aos usuários encontrarem, avaliarem e contratarem profissionais qualificados para diversas demandas residenciais e comerciais, facilitando o processo de orçamento, negociação e agendamento. O projeto foi finalizado com sucesso, porém posteriormente foi refatorado pela equipe e a versão atualmente em produção não corresponde à implementação que desenvolvi. Inspirado em modelos como o GetNinjas, minha contribuição priorizou usabilidade, transparência e eficiência na comunicação entre as partes.",
        en: "Web platform developed to connect clients to general service professionals in a practical and secure way. During my participation in the project, I developed features that allowed users to find, evaluate and hire qualified professionals for various residential and commercial demands, facilitating the process of budgeting, negotiation and scheduling. The project was successfully completed, however it was later refactored by the team and the version currently in production does not correspond to the implementation I developed. Inspired by models like GetNinjas, my contribution prioritized usability, transparency and efficiency in communication between parties.",
      },
      "projects.gestao": {
        pt: "Aplicação fullstack desenvolvida com Next.js (React) no frontend e Node.js/Express no backend, focada em controle financeiro pessoal. Permite cadastro de receitas, despesas, categorias, definição de metas e visualização de dashboard interativo. Possui sistema de autenticação, trial gratuito, assinatura mensal via Stripe, controle de acesso por status de assinatura e integração com e-mail (Zoho) para notificações automáticas. O projeto conta com UX moderna, dark mode, chatbot de suporte e arquitetura escalável, sendo ideal para demonstrar domínio em SaaS, integrações de pagamento e boas práticas de desenvolvimento web.",
        en: "Fullstack application developed with Next.js (React) on the frontend and Node.js/Express on the backend, focused on personal financial control. Allows registration of income, expenses, categories, goal setting and interactive dashboard visualization. It has an authentication system, free trial, monthly subscription via Stripe, access control by subscription status and email integration (Zoho) for automatic notifications. The project features modern UX, dark mode, support chatbot and scalable architecture, ideal for demonstrating expertise in SaaS, payment integrations and web development best practices.",
      },
      "projects.credencial": {
        pt: "Atuando no DETRAN-MT por meio da empresa contratada Central IT, participei da equipe responsável pelo desenvolvimento de um sistema para emissão de credenciais destinadas a pessoas autistas. O projeto consistiu na criação de um documento oficial, semelhante às credenciais para idosos e pessoas com deficiência física, que permite aos portadores estacionar em vagas reservadas para esse público. A iniciativa visa promover inclusão e acessibilidade, assegurando um processo seguro e eficiente para o cadastro, emissão e controle dessas credenciais, contribuindo para a melhoria da mobilidade e o respeito aos direitos das pessoas autistas.",
        en: "Working at DETRAN-MT through the contracted company Central IT, I participated in the team responsible for developing a system for issuing credentials for autistic people. The project consisted of creating an official document, similar to credentials for the elderly and people with physical disabilities, which allows holders to park in spaces reserved for this audience. The initiative aims to promote inclusion and accessibility, ensuring a safe and efficient process for registration, issuance and control of these credentials, contributing to improved mobility and respect for the rights of autistic people.",
      },
      "projects.board": {
        pt: "Desenvolvi um board de tarefas simples como desafio prático durante o curso, visando aplicar conceitos de gerenciamento de estado, manipulação de listas e interação com o usuário. O sistema permite criar, editar e remover tarefas, facilitando a organização e o acompanhamento das atividades diárias de forma intuitiva e responsiva.",
        en: "I developed a simple task board as a practical challenge during the course, aiming to apply concepts of state management, list manipulation and user interaction. The system allows creating, editing and removing tasks, facilitating the organization and tracking of daily activities in an intuitive and responsive way.",
      },
    };

    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
