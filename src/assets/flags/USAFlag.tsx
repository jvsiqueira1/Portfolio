// Componente SVG da bandeira dos EUA
export const USAFlag = ({ className }: { className?: string }) => {
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
      viewBox="0 0 741 390"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Listras vermelhas e brancas */}
      <rect width="741" height="390" fill="#B22234" />
      <rect y="30" width="741" height="30" fill="#fff" />
      <rect y="60" width="741" height="30" fill="#B22234" />
      <rect y="90" width="741" height="30" fill="#fff" />
      <rect y="120" width="741" height="30" fill="#B22234" />
      <rect y="150" width="741" height="30" fill="#fff" />
      <rect y="180" width="741" height="30" fill="#B22234" />
      <rect y="210" width="741" height="30" fill="#fff" />
      <rect y="240" width="741" height="30" fill="#B22234" />
      <rect y="270" width="741" height="30" fill="#fff" />
      <rect y="300" width="741" height="30" fill="#B22234" />
      <rect y="330" width="741" height="30" fill="#fff" />
      <rect y="360" width="741" height="30" fill="#B22234" />
      
      {/* Campo azul */}
      <rect width="296" height="210" fill="#3C3B6E" />
      
      {/* Estrelas - 9 linhas alternadas de 6 e 5 estrelas */}
      <g fill="#fff">
        {/* Linha 1 - 6 estrelas */}
        <Star x={25} y={18} size={4} />
        <Star x={74} y={18} size={4} />
        <Star x={123} y={18} size={4} />
        <Star x={172} y={18} size={4} />
        <Star x={221} y={18} size={4} />
        <Star x={270} y={18} size={4} />
        
        {/* Linha 2 - 5 estrelas */}
        <Star x={49} y={35} size={4} />
        <Star x={98} y={35} size={4} />
        <Star x={147} y={35} size={4} />
        <Star x={196} y={35} size={4} />
        <Star x={245} y={35} size={4} />
        
        {/* Linha 3 - 6 estrelas */}
        <Star x={25} y={52} size={4} />
        <Star x={74} y={52} size={4} />
        <Star x={123} y={52} size={4} />
        <Star x={172} y={52} size={4} />
        <Star x={221} y={52} size={4} />
        <Star x={270} y={52} size={4} />
        
        {/* Linha 4 - 5 estrelas */}
        <Star x={49} y={69} size={4} />
        <Star x={98} y={69} size={4} />
        <Star x={147} y={69} size={4} />
        <Star x={196} y={69} size={4} />
        <Star x={245} y={69} size={4} />
        
        {/* Linha 5 - 6 estrelas */}
        <Star x={25} y={86} size={4} />
        <Star x={74} y={86} size={4} />
        <Star x={123} y={86} size={4} />
        <Star x={172} y={86} size={4} />
        <Star x={221} y={86} size={4} />
        <Star x={270} y={86} size={4} />
        
        {/* Linha 6 - 5 estrelas */}
        <Star x={49} y={103} size={4} />
        <Star x={98} y={103} size={4} />
        <Star x={147} y={103} size={4} />
        <Star x={196} y={103} size={4} />
        <Star x={245} y={103} size={4} />
        
        {/* Linha 7 - 6 estrelas */}
        <Star x={25} y={120} size={4} />
        <Star x={74} y={120} size={4} />
        <Star x={123} y={120} size={4} />
        <Star x={172} y={120} size={4} />
        <Star x={221} y={120} size={4} />
        <Star x={270} y={120} size={4} />
        
        {/* Linha 8 - 5 estrelas */}
        <Star x={49} y={137} size={4} />
        <Star x={98} y={137} size={4} />
        <Star x={147} y={137} size={4} />
        <Star x={196} y={137} size={4} />
        <Star x={245} y={137} size={4} />
        
        {/* Linha 9 - 6 estrelas */}
        <Star x={25} y={154} size={4} />
        <Star x={74} y={154} size={4} />
        <Star x={123} y={154} size={4} />
        <Star x={172} y={154} size={4} />
        <Star x={221} y={154} size={4} />
        <Star x={270} y={154} size={4} />
      </g>
    </svg>
  );
};

