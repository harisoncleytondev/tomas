/* REACT */
import { useEffect } from 'react';

export function ScrollBar() {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'custom-scrollbar-style';
    style.innerHTML = `
      /* Scrollbar para Chrome, Edge e Safari */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f8f9fc;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: #2463eb;
        border-radius: 4px;
        border: 1px solid #f8f9fc;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: #1f4fc0;
      }
      
      * {
        /* Scrollbar para Firefox */
        scrollbar-width: thin;
        scrollbar-color: #2463eb #f8f9fc;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
