# Portfólio - João Vitor

Portfólio bilíngue de João Vitor de Siqueira Campos, desenvolvido com Next.js e publicado em [jvsdev.com.br](https://www.jvsdev.com.br). A página apresenta projetos, experiência profissional, tecnologias, formação e contato, com temas claro e escuro e download do CV no idioma ativo.

## Stack

- Next.js 15 e React 19
- TypeScript
- Tailwind CSS 4 e CSS custom properties
- Lucide React
- Playwright Core com Chrome local para PDFs e evidências visuais
- Vercel para deploy

## Desenvolvimento

```bash
npm ci
npm run dev
```

O servidor local abre em `http://localhost:3000`.

## Scripts

```bash
npm run lint
npm run build
npm run build:cv
npm run screenshots
npm run screenshots:portfolio -- /caminho/de/saida
```

- `lint`: executa o ESLint em todo o projeto.
- `build`: gera o build de produção do Next.js.
- `build:cv`: baixa os HTMLs PT/EN do repositório privado `jvsiqueira1/curriculum` e gera os PDFs versionados em `public/cv/`.
- `screenshots`: mantém o fluxo existente de atualização dos previews dos projetos via ScreenshotOne.
- `screenshots:portfolio`: captura a página completa em claro/escuro, 375 e 1440 px, usando uma instância local do site.

## Geração dos CVs

O script `scripts/build-cv.mjs` usa `gh api` para ler os HTMLs que são a fonte de verdade e o Chrome instalado na máquina para imprimir os PDFs:

```bash
gh auth status
npm run build:cv
```

Por padrão, o script usa a branch padrão do repositório. Para gerar os PDFs a partir de outra branch, tag ou commit, informe `CV_REF`:

```bash
CV_REF=atualiza-datas-cargos npm run build:cv
```

Arquivos gerados:

- `public/cv/joao-vitor-siqueira-cv-pt.pdf`
- `public/cv/joao-vitor-siqueira-cv-en.pdf`

Para usar HTMLs já baixados, informe um diretório que contenha `JOAO_VITOR_DE_SIQUEIRA_CAMPOS_CV.html` e `JOAO_VITOR_DE_SIQUEIRA_CAMPOS_CV_EN.html`:

```bash
CV_SOURCE_DIR=/caminho/dos/htmls npm run build:cv
```

Se o Chrome não estiver no caminho padrão do macOS, defina `CHROME_PATH` com o executável Chromium compatível.

## Variáveis de ambiente

Copie `.env.example` para `.env` quando precisar destes recursos:

- `NEXT_PUBLIC_GA_ID`: Measurement ID do Google Analytics. O script só é carregado depois do aceite no banner de cookies.
- `SCREENSHOT_ONE_ACCESS_KEY`: chave da ScreenshotOne para atualizar imagens de projetos.
- `SCREENSHOT_ONE_SECRET_KEY`: segredo opcional para assinar as requisições da ScreenshotOne.
- `CHROME_PATH`: caminho alternativo para Chrome, Edge ou Chromium nos scripts locais.
- `CV_REF`: branch, tag ou commit opcional do repositório `jvsiqueira1/curriculum` usado para gerar os PDFs.
- `PORTFOLIO_URL`: URL usada por `screenshots:portfolio`; o padrão é `http://127.0.0.1:3000`.

Nenhum segredo deve ser versionado.
