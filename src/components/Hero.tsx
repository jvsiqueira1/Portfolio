import { ArrowRight } from "lucide-react";

export default function Hero() {
  const handleCTAClick = () => {
    const element = document.getElementById("projects");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="pt-32 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            João Vitor de Siqueira Campos
            <span className="block text-primary mt-2">
              Desenvolvedor Full Stack
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Desenvolvedor Front-End Júnior com experiência prática em projetos
            reais, atuando em equipes que seguem metodologias ágeis. Tenho
            compromisso com a criação de soluções acessíveis e de qualidade,
            sempre buscando aprimorar meus conhecimentos e habilidades. Sou
            dedicado, proativo e motivado a crescer profissionalmente,
            contribuindo para resultados positivos e impactantes. Possuo também
            um breve conhecimento em backend e bancos de dados.
          </p>
          <button
            onClick={handleCTAClick}
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 dark:text-black"
          >
            Saiba mais
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
