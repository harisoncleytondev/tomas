/* REACT */
import React, { useState, useRef, useEffect } from 'react';

/* REACT ICONS */
import { FaRegPaperPlane } from 'react-icons/fa6';
import { MdDeleteOutline } from "react-icons/md";
import { GoPaperclip } from 'react-icons/go';

/* CSS */
import './css/PromptStyles.css';
import './css/PromptStyles.responsive.css';

export default function Prompt({ refPrompt, sendPrompt, images, setImages, ...props }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const inputFileRef = useRef(null);

  const handleInput = () => {
    const textarea = refPrompt.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendPrompt();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();

    if (!dropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 100;

      if (spaceBelow >= dropdownHeight + 10) {
        setDropdownPosition('bottom');
      } else if (rect.top >= dropdownHeight + 10) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
    setDropdownOpen((prev) => !prev);
  };

  const handleUploadImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
    setDropdownOpen(false);
  };

  const handleUploadFile = () => {
    alert('Aqui abriria o upload de arquivo');
    setDropdownOpen(false);
  };

  return (
    <section
      {...props}
      id="component_prompt_container"
      style={{ position: 'relative' }}
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputFileRef}
        onChange={(e) => {
          const files = Array.from(e.target.files);
          if (files.length > 0) {
            const newImages = files.map((file) => ({
              file,
              previewUrl: URL.createObjectURL(file),
            }));
            setImages((prev) => [...prev, ...newImages]);
          }
          e.target.value = null;
        }}
      />

      <form onSubmit={(e) => e.preventDefault()}>
        {images.length > 0 && (
          <section className="component_prompt_image_preview_container">
            {images.map(({ previewUrl, file }, idx) => (
              <div key={idx}>
                <img src={previewUrl} alt={file.name} />
                <button
                  type="button"
                  onClick={() => {
                    setImages((prev) => prev.filter((_, i) => i !== idx));
                    URL.revokeObjectURL(previewUrl);
                  }}
                ><MdDeleteOutline /></button>
              </div>
            ))}
          </section>
        )}

        <div>
          <textarea
            ref={refPrompt}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            name="question"
            placeholder="Sobre o que deseja conversar?"
            rows={1}
          ></textarea>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button ref={buttonRef} onClick={toggleDropdown}>
              <GoPaperclip />
            </button>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                style={{
                  bottom:
                    dropdownPosition === 'top' ? 'calc(100% + 10px)' : 'auto',
                  top:
                    dropdownPosition === 'bottom'
                      ? 'calc(100% + 10px)'
                      : 'auto',
                }}
              >
                <button onClick={handleUploadImage}>Upload Imagem</button>
                <button onClick={handleUploadFile}>Upload Arquivo</button>
              </div>
            )}
          </div>

          <button onClick={sendPrompt}>
            <FaRegPaperPlane />
          </button>
        </div>
      </form>
    </section>
  );
}
