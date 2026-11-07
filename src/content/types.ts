export type Language = "pt" | "en";

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type EducationItem = {
  course: string;
  institution: string;
  period: string;
  status: string;
  description?: string;
};

export type CertificateItem = {
  value: string;
  title: string;
  issuer: string;
  date: string;
  code: string;
  href?: string;
};

export type SiteContent = {
  languageName: string;
  nav: {
    about: string;
    projects: string;
    experience: string;
    stack: string;
    education: string;
    contact: string;
    menu: string;
    close: string;
    mainLabel: string;
    mobileLabel: string;
    skip: string;
  };
  hero: {
    boot: string[];
    availability: string;
    name: string;
    headline: string;
    summary: string;
    cvLabel: string;
    contactLabel: string;
    portraitAlt: string;
    role: string;
    location: string;
    stats: Array<{ value: string; label: string }>;
  };
  about: {
    label: string;
    title: string;
    lead: string;
    body: string;
    pillars: Array<{ title: string; text: string }>;
  };
  experience: {
    label: string;
    command: string;
    head: string;
    title: string;
    intro: string;
    current: string;
    items: ExperienceItem[];
  };
  stack: {
    label: string;
    title: string;
    intro: string;
    categories: Array<{ module: string; title: string; items: string[] }>;
  };
  education: {
    label: string;
    title: string;
    intro: string;
    items: EducationItem[];
    languagesTitle: string;
    languages: string[];
    certificates: {
      label: string;
      title: string;
      intro: string;
      verify: string;
      items: CertificateItem[];
    };
  };
  contact: {
    label: string;
    title: string;
    text: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    location: string;
    email: string;
    backToTop: string;
  };
  ui: {
    statsLabel: string;
    statusLabel: string;
    heroRole: string;
    scroll: string;
    contactShort: string;
    subject: string;
    terminalPath: string;
    commits: string;
    running: string;
    certificatesCount: string;
    writeTo: string;
    build: string;
    cursorOpen: string;
  };
  cookie: {
    message: string;
    accept: string;
    decline: string;
  };
  footer: string;
};
