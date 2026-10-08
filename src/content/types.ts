export type Language = "pt" | "en";

export type Project = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string | null;
  stack: string[];
  note?: string;
};

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
  theme: { light: string; dark: string };
  hero: {
    availability: string;
    name: string;
    headline: string;
    summary: string;
    cvLabel: string;
    contactLabel: string;
    portraitAlt: string;
    role: string;
    location: string;
  };
  about: {
    title: string;
    lead: string;
    body: string;
    pillars: Array<{ title: string; text: string }>;
  };
  projects: {
    title: string;
    intro: string;
    visit: string;
    privateLabel: string;
    items: Project[];
    othersTitle: string;
    othersIntro: string;
    others: Array<{ name: string; language: string; href: string }>;
  };
  experience: {
    title: string;
    intro: string;
    current: string;
    items: ExperienceItem[];
  };
  stack: {
    title: string;
    intro: string;
    categories: Array<{ title: string; items: string[] }>;
  };
  education: {
    title: string;
    intro: string;
    items: EducationItem[];
    languagesTitle: string;
    languages: string[];
  };
  contact: {
    title: string;
    text: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    location: string;
  };
  cookie: {
    message: string;
    accept: string;
    decline: string;
  };
  footer: string;
};
