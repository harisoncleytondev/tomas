
export const fontOptions = {
  lexend: "'Lexend Deca', sans-serif",
  baloo: "'Baloo 2', cursive",
  atkinson: "'Atkinson Hyperlegible', sans-serif",
  opendyslexic: "'OpenDyslexic', sans-serif",
  inter: "'Inter', sans-serif",
  poppins: "'Poppins', sans-serif",
  comic: "'Comic Neue', cursive",
  nunito: "'Nunito', sans-serif",
};

export function getColorPalette(type, click) {
  return (
    <div className="costumization_div_palette">
      {/* Parte de cima */}
      <div onClick={(e) => click(e)}>{getColor('#fff', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#f8f9fa', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#e9ecef', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#dee2e6', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#1a1a1a', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#343a40', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#495057', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#6c757d', type)}</div>

      {/* Parte de baixo */}
      <div onClick={(e) => click(e)}>{getColor('#4f46e5', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#7c3aed', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#dc2626', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#ea580c', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#06d6a0', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#10b981', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#3b82f6', type)}</div>
      <div onClick={(e) => click(e)}>{getColor('#8B5CF6', type)}</div>
    </div>
  );
}

function getColor(hex, type) {
  return (
    <div
      className={`costumization_div_content_${type}_color`}
      style={{
        backgroundColor: hex,
        height: '26px',
        width: '26px',
        borderRadius: '5px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
      }}
    ></div>
  );
}
