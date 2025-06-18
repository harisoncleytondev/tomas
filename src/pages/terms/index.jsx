/* CSS */
import './TermsStyles.css';

/* COMPONENTS */
import BackgroundDecor from '../../components/backgroundDecor';
import NavBar from '../../components/navbar';

/* REACT ICONS */
import { IoShieldOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function Terms() {
  const [content, setContent] = useState('terms');

  const handleClick = (event) => {
    event.target.classList.forEach((name) => {
      if (name.includes('terms_option_active')) return;
      document.querySelectorAll('.terms_li').forEach((active) => {
        if (active.classList.contains('terms_option_active')) {
          active.classList.remove('terms_option_active');
        }
      });
      setContent(event.currentTarget.dataset.name);
      event.target.classList.add('terms_option_active');
    });
  };

  return (
    <div id="terms_div_container">
      <NavBar />
      <BackgroundDecor />

      <h1>Termos e Políticas</h1>
      <p>Informações legais e políticas do Tomas.</p>

      <div id="terms_div_navigation_container">
        <div id="terms_div_nagigation">
          <ul>
            <li
              className="terms_li terms_option_active"
              data-name="terms"
              onClick={(e) => handleClick(e)}
            >
              <IoDocumentTextOutline /> Termos de Uso
            </li>
            <li
              className="terms_li"
              data-name="privacy"
              onClick={(e) => handleClick(e)}
            >
              <IoShieldOutline /> Política de Privacidade
            </li>
          </ul>
        </div>
      </div>

      <div id="terms_div_content">
        <h3>{content === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}</h3>
        <p>{content === 'terms' ? getTerms() : getPrivacy()}</p>
      </div>
    </div>
  );
}

function getTerms() {
  return `
    termos do thomas.... Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium expedita ut placeat eaque dolor sint harum commodi? Saepe, recusandae ad fugit autem in perferendis eligendi, molestiae perspiciatis, optio facilis assumenda?
    
    `;
}

function getPrivacy() {
  return `
    politica do thomas.... Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium expedita ut placeat eaque dolor sint harum commodi? Saepe, recusandae ad fugit autem in perferendis eligendi, molestiae perspiciatis, optio facilis assumenda?
    
    `;
}
