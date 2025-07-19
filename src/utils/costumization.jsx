import { FaPencil } from "react-icons/fa6";

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
      <div
        onClick={(e) => click(e)}
      >
        {getColor('#fff', type)}
      </div>
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
      <div
        style={{
          height: '26px',
          width: '26px',
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          padding: 0,
          margin: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: '#ffffff',
        }}
        title="Adicionar nova cor personalizada"
      >
        <span
          style={{
            fontSize: '12px',
            color: 'black',
            zIndex: 2,
            pointerEvents: 'none', 
            opacity: .7,
          }}
        >
          <FaPencil />
        </span>

        <input
          type="color"
          onChange={(e) => click(e)}
          defaultValue="#ffffff"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            opacity: 0, 
            height: '100%',
            cursor: 'pointer',
            border: 'none',
          }}
        />
      </div>
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

export function applyPreferencesToCSS(preferences) {
  const root = document.documentElement;

  root.style.setProperty('--background-color', preferences.backgroundColor);
  root.style.setProperty('--button-color', preferences.buttonColor);
  root.style.setProperty('--extra-color', preferences.extraColor);
  root.style.setProperty('--font-one', preferences.fontOne);
  root.style.setProperty('--font-one-size', `${preferences.fontOneSize}px`);
  root.style.setProperty('--font-one-spacing', `${preferences.fontOneSpacing}px`);
  root.style.setProperty('--font-two', preferences.fontTwo);
  root.style.setProperty('--font-two-size', `${preferences.fontTwoSize}px`);
  root.style.setProperty('--font-two-spacing', `${preferences.fontTwoSpacing}px`);
  root.style.setProperty('--text-color', preferences.textColor);
}