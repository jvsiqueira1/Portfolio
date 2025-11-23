'use client'

import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext';

export default function Projects() {
    const { t } = useLanguage();
    
    const projects = [
        {
          id: 1,
          title: 'Agilizei',
          descriptionKey: 'projects.agilizei',
          image: '/agilizei.png',
           link: 'https://www.agilizei.net/',
        },
        {
          id: 2,
          title: 'Gestão de Gastos',
          descriptionKey: 'projects.gestao',
          image: '/gestaodegastos.png',
            link: 'https://gestao.jvsdev.com.br/',
        },
        {
          id: 3,
          title: 'Credencial do Autista',
          descriptionKey: 'projects.credencial',
          image: '/credencial.png',
           link: 'https://credencialdoautista.detran.mt.gov.br/',
        },
        {
          id: 4,
          title: 'Board de Tarefas',
          descriptionKey: 'projects.board',
          image: '/board.png',
          link: 'https://github.com/jvsiqueira1/RID148558_Desafio03',
        },
      ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t('projects.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="border border-gray-800 bg-card overflow-hidden">
              <div className="relative w-full aspect-video">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  style={{ objectFit: 'inherit' }} 
                  priority
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                <Badge className='bg-black dark:bg-primary mb-2 text-sm'>{t('projects.status.finished')}</Badge>
                <p className="text-muted-foreground mb-4 text-sm">{t(project.descriptionKey)}</p>
                <button className="bg-primary hover:bg-primary-600 text-white text-sm px-4 py-2 rounded-full flex items-center gap-1 transition-all w-max dark:text-black">
                  <a href={project.link} target='_blank' className='flex justify-center items-center'>
                    {t('projects.seeMore')}
                    <ArrowRight size={14} />
                  </a>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
