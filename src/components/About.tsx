import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

export default function About() {
  const timeline = [
    {
      year: '2021',
      description:
        'Iniciei a graduação em Engenharia da Computação e comecei o estágio no DETRAN/MT, onde prestei suporte técnico a usuários, realizei manutenção de equipamentos e adquiri experiência prática em redes e sistemas internos.',
    },
    {
      year: '2023',
      description:
        'Atuei no desenvolvimento e manutenção de interfaces web responsivas utilizando React.js, Tailwind CSS e integração com APIs RESTful. Participei de projetos relevantes voltados para a usabilidade e acessibilidade, colaborando em equipes ágeis.',
    },
    {
      year: '2024',
      description:
        'Aprofundei meus conhecimentos em TypeScript, Next.js e metodologias ágeis. Desenvolvi habilidades em versionamento de código com Git, GitHub e GitLab, garantindo entregas contínuas e de qualidade.',
    },
    {
      year: '2025',
      description:
        'Desenvolvi aplicações full-stack com React, Node.js, Express e PostgreSQL, implementando desde a modelagem do banco até rotas e controllers no backend. Estou em fase de conclusão da graduação, focado em evoluir como profissional de tecnologia.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-foreground">Sobre mim</h2>
        <div className="md:hidden flex flex-col relative">
          <div className="relative flex flex-col space-y-12 pl-4"> 
            <div className="absolute top-0 bottom-0 left-6 w-1 bg-gray-700 rounded-full"></div>
            {timeline.map((item, index) => (
              <div key={`mobile-item-${index}`} className="flex items-center gap-6 relative">
                <div
                  className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md flex-shrink-0"
                  style={{ boxShadow: '0 0 6px rgba(0, 132, 255, 0.6)' }}
                />
                <Card className="bg-card p-5 border border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1">
                  <div className="mb-2">
                    <span className="text-primary font-semibold text-sm">{item.year}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <div className="grid grid-cols-4 text-center mb-4">
            {timeline.map((item, index) => (
              <div key={`year-${index}`}>
                <span className="text-primary font-semibold text-sm md:text-base">{item.year}</span>
              </div>
            ))}
          </div>
          <div className="relative mb-12">
            <Progress
              value={100}
              className="h-1 w-full bg-gray-700 rounded-full mx-auto"
            />
            <div className="absolute top-1/2 left-0 right-0 grid grid-cols-4 transform -translate-y-1/2 mx-auto">
              {timeline.map((_, index) => (
                <div key={`circle-${index}`} className="flex justify-center ">
                  <div
                    className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md"
                    style={{ boxShadow: '0 0 6px rgba(0, 132, 255, 0.6)' }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 text-center">
            {timeline.map((item, index) => (
              <Card
                key={`card-${index}`}
                className="bg-card p-5 border border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-20 border-t border-gray-800 pt-8">
          <h3 className="text-xl font-semibold mb-6 text-foreground">Meu contato:</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground text-sm md:text-base">(65) 99620-9961</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground text-sm md:text-base">Email:</span>
              <a
                href="mailto:contato@jvsdev.com.br"
                className="text-primary hover:underline text-sm md:text-base"
              >
                contato@jvsdev.com.br
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
