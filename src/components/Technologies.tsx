'use client'

import { 
  Code, 
  Database, 
  Server, 
  Terminal,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useLanguage } from '@/contexts/LanguageContext';


export default function Technologies() {
    const { t } = useLanguage();
    
    const techCategories = [
        {
          titleKey: 'technologies.categories.languages',
          icon: <Code className="w-10 h-10 text-primary mb-4" />,
          technologies: ['Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'TypeScript']
        },
        {
          titleKey: 'technologies.categories.frontend',
          icon: <Code className="w-10 h-10 text-primary mb-4" />,
          technologies: ['React.js', 'Next.js', 'Tailwind CSS']
        },
        {
          titleKey: 'technologies.categories.backend',
          icon: <Server className="w-10 h-10 text-primary mb-4" />,
          technologies: ['Spring Boot', 'Node.js', 'Express.js', 'Nest.js']
        },
        {
          titleKey: 'technologies.categories.database',
          icon: <Database className="w-10 h-10 text-primary mb-4" />,
          technologies: ['MySQL', 'PostgreSQL', 'MongoDB']
        },
        {
          titleKey: 'technologies.categories.devops',
          icon: <Terminal className="w-10 h-10 text-primary mb-4" />,
          technologies: ['Docker', 'AWS', 'Git', 'GitHub', 'GitLab']
        },
        {
          titleKey: 'technologies.categories.tools',
          icon: <SiGithub className="w-10 h-10 text-primary mb-4" />,
          technologies: ['APIs RESTful', 'Postman', 'Figma', 'Scrum', 'Jest', 'Cypress', 'POO']
        },
     
      ];
  return (
    <section id="technologies" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('technologies.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('technologies.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <div key={index} className="bg-background p-6 rounded-xl shadow-md border border-gray-800 hover:border-primary/30 transition-all duration-300">
              <div className="text-center mb-6">
                {category.icon}
                <h3 className="text-xl font-bold text-primary">{t(category.titleKey)}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
