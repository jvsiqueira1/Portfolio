import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function Projects() {
    const projects = [
        {
          id: 1,
          title: 'Agilizei',
          description: 'Plataforma web que conecta clientes a profissionais de serviços gerais de forma prática e segura. O sistema permite que usuários encontrem, avaliem e contratem profissionais qualificados para diversas demandas residenciais e comerciais, facilitando o processo de orçamento, negociação e agendamento. Inspirado em modelos como o GetNinjas, o projeto prioriza usabilidade, transparência e eficiência na comunicação entre as partes, oferecendo uma solução completa para simplificar a contratação de serviços.',
          image: '/agilizei.png',
           link: 'https://www.agilizei.net/sobre',
           status: 'Em andamento'
        },
        {
          id: 2,
          title: 'Gestão de Gastos',
          description: 'Projeto de aprendizado focado na criação de uma aplicação web de gestão financeira pessoal utilizando a IA Lovable. A plataforma permite aos usuários cadastrar rendas e despesas, com funcionalidades completas de CRUD, e visualiza os dados através de gráficos que segmentam os gastos e ganhos por categorias. Além disso, gera relatórios financeiros comparativos entre rendas e despesas, facilitando o acompanhamento e planejamento financeiro. O uso da IA Lovable auxiliou na automação e otimização da criação da interface e funcionalidades, tornando o desenvolvimento mais ágil e intuitivo.',
          image: '/gestaodegastos.png',
            link: 'https://gestao.jvsdev.com.br/',
            status: 'Finalizado'
        },
        {
          id: 3,
          title: 'Credencial do Autista',
          description: 'Atuando no DETRAN-MT por meio da empresa contratada Central IT, participei da equipe responsável pelo desenvolvimento de um sistema para emissão de credenciais destinadas a pessoas autistas. O projeto consistiu na criação de um documento oficial, semelhante às credenciais para idosos e pessoas com deficiência física, que permite aos portadores estacionar em vagas reservadas para esse público. A iniciativa visa promover inclusão e acessibilidade, assegurando um processo seguro e eficiente para o cadastro, emissão e controle dessas credenciais, contribuindo para a melhoria da mobilidade e o respeito aos direitos das pessoas autistas.',
          image: '/credencial.png',
           link: 'https://credencialdoautista.detran.mt.gov.br/',
           status: 'Finalizado'
        },
        {
          id: 4,
          title: 'Board de Tarefas',
          description: 'Desenvolvi um board de tarefas simples como desafio prático durante o curso, visando aplicar conceitos de gerenciamento de estado, manipulação de listas e interação com o usuário. O sistema permite criar, editar e remover tarefas, facilitando a organização e o acompanhamento das atividades diárias de forma intuitiva e responsiva.',
          image: '/board.png',
          link: 'https://github.com/jvsiqueira1/RID148558_Desafio03',
          status: 'Finalizado'
        },
      ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-foreground">Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Badge className='bg-black dark:bg-primary mb-2 text-sm'>{project.status}</Badge>
                <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                <button className="bg-primary hover:bg-primary-600 text-white text-sm px-4 py-2 rounded-full flex items-center gap-1 transition-all w-max dark:text-black">
                  <a href={project.link} target='_blank' className='flex justify-center items-center'>
                    Saiba mais
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
