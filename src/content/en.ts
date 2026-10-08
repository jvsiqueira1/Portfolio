import type { SiteContent } from "./types";

export const en: SiteContent = {
  languageName: "English",
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    stack: "Stack",
    education: "Education",
    contact: "Contact",
    menu: "Open menu",
    close: "Close menu",
    mainLabel: "Main navigation",
    mobileLabel: "Main navigation for mobile devices",
    skip: "Skip to content",
  },
  theme: { light: "Use light theme", dark: "Use dark theme" },
  hero: {
    availability: "Open to on-site, hybrid and remote work",
    name: "João Vitor",
    headline: "I build systems that connect product, data and operations.",
    summary:
      "Full-stack at DETRAN-MT, working with Node.js, Nest.js, React, Next.js and PostgreSQL.",
    cvLabel: "Download CV",
    contactLabel: "Get in touch",
    portraitAlt: "Portrait of João Vitor",
    role: "Full-Stack Developer and IT Analyst",
    location: "Cuiabá, MT, Brazil",
  },
  about: {
    title: "End-to-end code, grounded in business context.",
    lead:
      "I build products in the JavaScript and TypeScript ecosystem, turning complex requirements into clear experiences, consistent APIs and well-modeled data.",
    body:
      "Today I build public-sector systems at DETRAN-MT. Before that, I worked in logistics operations and delivered products for fintech, retail and services as an independent developer, always bringing software closer to real use.",
    pillars: [
      { title: "Product and interface", text: "React and Next.js for accessible, responsive journeys that remain easy to maintain." },
      { title: "Services and data", text: "Node.js, Nest.js, PostgreSQL and Prisma for business rules and integrations." },
      { title: "Continuous delivery", text: "Testing, Git, CI/CD and documentation for safe evolution." },
    ],
  },
  experience: {
    title: "Experience",
    intro: "A path through support, public-sector systems, bespoke products and operations.",
    current: "Present",
    items: [
      { role: "IT Analyst - Senior Computer Engineer", company: "DETRAN-MT", period: "Jun 2026 - present", location: "Cuiabá, MT", summary: "Full-stack development of web and mobile applications for the agency's internal systems.", highlights: ["Interfaces with React, Next.js and TypeScript; APIs and services with Node.js, Nest.js and PostgreSQL.", "Data modeling, API integration and technical documentation.", "Support for IT units in standardizing and managing the technology infrastructure."], stack: ["TypeScript", "Next.js", "Nest.js", "PostgreSQL"] },
      { role: "Quality, IT and Operations Trainee", company: "Carvalima Transportes", period: "Mar 2026 - Apr 2026", location: "Cuiabá, MT", summary: "Immersion in logistics operations to connect processes, indicators and improvement opportunities to technical solutions.", highlights: ["Rotation across operating areas and process mapping.", "Cycle reports and a final technical case connected to the business."], stack: ["Processes", "Indicators", "Operations"] },
      { role: "Full-Stack Developer", company: "Freelance / Contractor", period: "Mar 2025 - Jan 2026", location: "Brazil", summary: "Bespoke digital products for fintech, retail and services, including Grupo Optimus and Agilizei.", highlights: ["Investment systems with Java, Spring, React and Python data automation.", "Marketplaces, CRMs and sports management with Node.js, TypeScript, PostgreSQL and Prisma.", "The maramores.com.br real estate site with Next.js and Fastify, plus testing and CI/CD."], stack: ["Node.js", "Java", "Python", "React", "PostgreSQL"] },
      { role: "Junior Front-End Developer", company: "Central IT, assigned to DETRAN-MT", period: "Oct 2023 - Dec 2024", location: "Cuiabá, MT", summary: "Responsive and accessible interfaces for public-sector systems, including Service Scheduling and the Autism ID Card.", highlights: ["React, Next.js and Tailwind CSS with REST API integration.", "Agile collaboration with Git and GitLab."], stack: ["React", "Next.js", "Tailwind CSS", "GitLab"] },
      { role: "IT Support Intern", company: "DETRAN-MT", period: "Sep 2021 - Sep 2023", location: "Cuiabá, MT", summary: "Support for users and internal systems, ticket handling and infrastructure maintenance.", highlights: ["Ticket triage and resolution.", "Maintenance of networks, computers, hardware and software."], stack: ["Support", "Networks", "Infrastructure"] },
    ],
  },
  stack: {
    title: "Technologies",
    intro: "Tools I use to build, test and keep products moving.",
    categories: [
      { title: "Front-end", items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
      { title: "Back-end", items: ["Node.js", "Express", "Nest.js", "Fastify", "Java", "Spring Boot", "Python"] },
      { title: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma"] },
      { title: "Quality", items: ["Jest", "Cypress", "Postman", "Documentation"] },
      { title: "Delivery", items: ["Docker", "AWS", "CI/CD", "Git", "GitHub", "GitLab"] },
      { title: "Practice", items: ["Scrum", "OOP", "Software architecture", "Figma"] },
    ],
  },
  education: {
    title: "Education",
    intro: "An engineering foundation with continuous study across product, software and infrastructure.",
    items: [
      { course: "Postgraduate Degree in Full-Stack Development - Tech Developer 360", institution: "Faculdade de Tecnologia Rocketseat", period: "Jan 2026 - Jan 2027", status: "In progress", description: "Back-end, microservices, infrastructure, DevOps, product and applied AI." },
      { course: "B.S. in Computer Engineering", institution: "UNIC - Universidade de Cuiabá", period: "Jan 2021 - Dec 2025", status: "Completed" },
      { course: "Software Engineer", institution: "Escola DNC", period: "Jun 2025 - present", status: "In progress" },
      { course: "Front-End Developer", institution: "Escola DNC", period: "Aug 2024 - Jun 2025", status: "Completed" },
    ],
    languagesTitle: "Languages",
    languages: ["Native Portuguese", "Advanced English (C1)"],
  },
  contact: {
    title: "Let's build something that works in the real world.",
    text: "I am based in Cuiabá and open to conversations about product, engineering and new opportunities.",
    emailLabel: "Send an email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    location: "Cuiabá, MT, Brazil",
  },
  cookie: { message: "I only use analytics with your permission to understand how this portfolio is visited.", accept: "Accept", decline: "Decline" },
  footer: "Designed and developed by João Vitor.",
};
