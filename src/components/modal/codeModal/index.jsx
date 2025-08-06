/* REACT */
import { useState, useRef, useEffect } from 'react';

/* CSS */
import './css/CodeModalStyles.css';

export default function CodeModal({ onComplete, onClose }) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  function handleChange(e, index) {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!val) {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      return;
    }

    const newCode = [...code];
    newCode[index] = val[0];
    setCode(newCode);
    if (index < 3 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
    if (newCode.every(char => char !== '')) {
      if (onComplete) onComplete(newCode.join(''));
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === 'Backspace') {
      e.preventDefault(); 
      if (code[index] !== '') {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputsRef.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft') {
      // Move o foco para a esquerda
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowRight') {
      if (index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  }

  function handleSubmit() {
    const fullCode = code.join('');
    if (fullCode.length === 4 && onComplete) {
      onComplete(fullCode);
    }
  }

  return (
    <div id="code-modal" onClick={onClose}>
      <div id="code-modal-container" onClick={e => e.stopPropagation()}>
        <h3>Digite o código</h3>

        <div id="code-input-container">
          {code.map((char, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={char}
              onChange={e => handleChange(e, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              ref={el => (inputsRef.current[i] = el)}
              aria-label={`Código letra ${i + 1}`}
              autoComplete="off"
            />
          ))}
        </div>

        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}