// Componente SVG da bandeira do Brasil
export const BrazilFlag = ({ className }: { className?: string }) => {
  // Função para criar uma estrela SVG
  const Star = ({ x, y, size = 20 }: { x: number; y: number; size?: number }) => {
    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      points.push(`${px},${py}`);
    }
    return <polygon points={points.join(" ")} fill="#fff" />;
  };

  return (
    <svg
      viewBox="0 0 720 504"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fundo verde */}
      <rect width="720" height="504" fill="#009739" />
      
      {/* Losango amarelo */}
      <path
        d="M360 42L126 252l234 210 234-210L360 42z"
        fill="#FEDD00"
      />
      
      {/* Círculo azul */}
      <circle cx="360" cy="252" r="90" fill="#012169" />
      
      {/* Faixa branca (curvada representando "Ordem e Progresso") */}
      <path
        d="M270 252 Q360 200 450 252"
        stroke="#fff"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Estrelas principais (representando os estados) */}
      <g fill="#fff">
        {/* Estrela do Pará (acima da faixa, maior) */}
        <Star x={360} y={180} size={8} />
        
        {/* Estrelas na região da faixa */}
        <Star x={300} y={240} size={6} />
        <Star x={330} y={250} size={6} />
        <Star x={390} y={250} size={6} />
        <Star x={420} y={240} size={6} />
        
        {/* Estrelas abaixo da faixa */}
        <Star x={280} y={280} size={5} />
        <Star x={320} y={290} size={5} />
        <Star x={360} y={300} size={6} />
        <Star x={400} y={290} size={5} />
        <Star x={440} y={280} size={5} />
        
        {/* Estrelas adicionais menores */}
        <Star x={310} y={270} size={4} />
        <Star x={410} y={270} size={4} />
        <Star x={340} y={310} size={4} />
        <Star x={380} y={310} size={4} />
      </g>
    </svg>
  );
};

