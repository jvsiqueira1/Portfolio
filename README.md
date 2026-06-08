# Portfólio Pessoal - João Vitor de Siqueira Campos

Este repositório contém o código-fonte do meu portfólio pessoal desenvolvido em React utilizando **Next.js** como framework para build e deploy. O projeto segue integralmente as especificações do **Template 02** disponível no Figma, garantindo um design moderno, responsivo e alinhado às melhores práticas de desenvolvimento frontend.

---

## 📄 Documentação do Projeto

### Escolha do Template

O design do portfólio foi baseado no **Template 02** do Figma, escolhido por sua estrutura clara e visual profissional que destaca informações essenciais como experiência, habilidades e projetos. Todo o desenvolvimento do layout, cores, tipografia e organização de conteúdo segue fielmente as diretrizes deste template para manter consistência e qualidade visual.

[Template 02 do Figma](https://www.figma.com/file/O2j7uVVhXUnV6dadZc2MMw/Desafio-03%3A-Desenvolva-um-portf%C3%B3lio-com-React-hooks?type=design&node-id=0%3A1&mode=design&t=Hpl7aIhWt0vdutHj-1)

### Tecnologias Utilizadas

- **React**: para construção da interface de usuário com componentes reutilizáveis e gerenciadores de estado.
- **Next.js**: framework React para renderização híbrida, otimização de performance e fácil deploy.
- **Hooks do React**: uso de `useState` para gerenciamento de estados internos e `useEffect` para efeitos colaterais e manipulação do ciclo de vida dos componentes.
- **Tailwind CSS** (se aplicável): para estilização eficiente e responsiva.

---

## 🌐 Acesso ao Portfólio Online

Meu portfólio está publicado e disponível online no seguinte endereço personalizado:

[https://www.jvsdev.com.br](https://www.jvsdev.com.br)

Sinta-se à vontade para visitar e conhecer meus projetos, experiências e habilidades.

---

## 🔧 Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha os valores:

- `NEXT_PUBLIC_GA_ID`: Measurement ID do Google Analytics (ex.: `G-XXXXXXXXXX`). Em produção, configure-a nas **Environment Variables** do Vercel. O Google Analytics só é carregado depois que o visitante aceita o banner de cookies (opt-in); sem a variável, o banner continua funcionando, mas nenhum script de tracking é injetado.
- `SCREENSHOT_ONE_ACCESS_KEY` / `SCREENSHOT_ONE_SECRET_KEY`: credenciais da [ScreenshotOne](https://screenshotone.com/) usadas por `npm run screenshots` para gerar os PNGs de preview dos projetos em `public/`. Só são necessárias localmente — em produção as imagens vêm do repositório.

---
