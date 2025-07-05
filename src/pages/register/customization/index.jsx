/* CSS */
import './CustomizationStyles.css';
import './Customization.responsive.css';

/* COMPONENTS */
import ButtonBlue from '../../../components/buttons/buttonPrimary';

/* UTILS */
import { fontOptions, getColorPalette } from '../../../utils/costumization.jsx';

/* REACT */
import { useState } from 'react';

/* REACT ICONS */
import { MdOutlineColorLens } from 'react-icons/md';
import { TbTextSize } from 'react-icons/tb';

export default function Costumization() {
  const [fontOne, setFontOne] = useState(fontOptions.baloo);
  const [fontTwo, setFontTwo] = useState(fontOptions.lexend);
  const [fontSizeOne, setFontSizeOne] = useState('20');
  const [fontSpaceOne, setFontSpaceOne] = useState('2');
  const [fontSizeTwo, setFontSizeTwo] = useState('20');
  const [fontSpaceTwo, setFontSpaceTwo] = useState('2');

  const [colorBackground, setBackground] = useState('#fff');
  const [colorText, setText] = useState('#fff');
  const [colorButton, setButton] = useState('#fff');
  const [colorEmphasis, setEmphasis] = useState('#fff');

  const getBackgroundSelected = () => {
    return (
      <div
        style={{
          backgroundColor: colorBackground,
          height: '46px',
          width: '46px',
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
        }}
      ></div>
    );
  };

  const getTextSelected = () => {
    return (
      <div
        style={{
          backgroundColor: colorText,
          height: '46px',
          width: '46px',
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
        }}
      ></div>
    );
  };
  const getButtonSelected = () => {
    return (
      <div
        style={{
          backgroundColor: colorButton,
          height: '46px',
          width: '46px',
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
        }}
      ></div>
    );
  };
  const getEmphasisSelected = () => {
    return (
      <div
        style={{
          backgroundColor: colorEmphasis,
          height: '46px',
          width: '46px',
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
        }}
      ></div>
    );
  };

  const changeColorBackground = (e) => {
    if (e.target.tagName === 'INPUT') {
      setBackground(e.target.value);
    } else if (e.target.tagName === 'DIV') {
      setBackground(e.target.style.backgroundColor);
    }
  };
  const changeColorText = (e) => {
    if (e.target.tagName === 'INPUT') {
      setText(e.target.value);
    } else if (e.target.tagName === 'DIV') {
      setText(e.target.style.backgroundColor);
    }
  };
  const changeColorButton = (e) => {
    if (e.target.tagName === 'INPUT') {
      setButton(e.target.value);
    } else if (e.target.tagName === 'DIV') {
      setButton(e.target.style.backgroundColor);
    }
  };
  const changeColorEmphasis = (e) => {
    if (e.target.tagName === 'INPUT') {
      setEmphasis(e.target.value);
    } else if (e.target.tagName === 'DIV') {
      setEmphasis(e.target.style.backgroundColor);
    }
  };

  return (
    <div id="costumization_div">
      <div id="costumization_div_header">
        <h2>Personalize sua Experiência</h2>
        <p>As modificações só serão aplicadas no chat. Você poderá mudar isso depois</p>
      </div>

      <div id="costumization_div_content">
        {/* Cores */}
        <div id="costumization_div_content_title">
          <div>
            <h4>
              <span>
                <MdOutlineColorLens />
              </span>
              Cores e Temas
            </h4>
            <p>
              Escolha cores que sejam confortáveis para seus olhos e
              preferências visuais.
            </p>
          </div>
          <ButtonBlue id="costumization_div_content_title_btn">
            Continuar
          </ButtonBlue>
        </div>

        <div className="costumization_div_space"></div>

        <div id="costumization_div_content_color">
          {/* Escolha da cor de fundo */}
          <div
            className="costumization_color_selected"
            id="costumization_div_content_background"
          >
            <h5>
              <span>
                <MdOutlineColorLens />
              </span>
              Fundo
            </h5>

            <section>
              {getBackgroundSelected()}
              {getColorPalette('background', changeColorBackground)}
            </section>
          </div>

          {/* Escolha da cor dos textos */}
          <div
            className="costumization_color_selected"
            id="costumization_div_content_text"
          >
            <h5>
              <MdOutlineColorLens /> Texto
            </h5>

            <section>
              {getTextSelected()}
              {getColorPalette('text', changeColorText)}
            </section>
          </div>

          {/* Escolha da cor dos botões */}
          <div
            className="costumization_color_selected"
            id="costumization_div_content_button"
          >
            <h5>
              <MdOutlineColorLens /> Botões
            </h5>

            <section>
              {getButtonSelected()}
              {getColorPalette('button', changeColorButton)}
            </section>
          </div>

          {/* Escolha da cor dos destaques */}
          <div
            className="costumization_color_selected"
            id="costumization_div_content_emphasis"
          >
            <h5>
              <MdOutlineColorLens /> Destaques
            </h5>

            <section>
              {getEmphasisSelected()}
              {getColorPalette('emphasis', changeColorEmphasis)}
            </section>
          </div>
        </div>

        {/* Textos */}
        <div id="costumization_div_content_title2">
          <div>
            <h4>
              <span>
                <TbTextSize />
              </span>
              Tipografia e Texto
            </h4>
            <p>
              Ajuste o texto para melhor legibilidade e conforto de leitura.
            </p>
          </div>
        </div>

        <div className="costumization_div_space"></div>

        <div id="costumization_div_content_typography">
          {/* Fonte 1 */}
          <div id="costumization_div_content_typography_one">
            <div className="costumization_div_select_typography">
              <label htmlFor="costumization_select_typography_one">
                Fonte 1:
              </label>
              <select
                id="costumization_select_typography_one"
                value={fontOne}
                onChange={(e) => {
                  setFontOne(e.target.value);
                }}
              >
                {Object.entries(fontOptions).map(([key, font]) => (
                  <option key={key} value={font}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="costumization_div_content_typography_input">
              <label htmlFor="costumization_input_typography_one_size">
                <TbTextSize /> Tamanho da Fonte
              </label>
              <input
                type="number"
                id="costumization_input_typography_one_size"
                value={fontSizeOne}
                onChange={(e) => setFontSizeOne(e.target.value)}
              />
            </div>

            <div className="costumization_div_content_typography_input">
              <label htmlFor="costumization_input_typography_one_space">
                <TbTextSize /> Espaçamento entre Letras
              </label>
              <input
                type="number"
                id="costumization_input_typography_one_space"
                value={fontSpaceOne}
                onChange={(e) => setFontSpaceOne(e.target.value)}
              />
            </div>
          </div>

          {/* Fonte 2 */}
          <div id="costumization_div_content_typography_two">
            <div className="costumization_div_select_typography">
              <label htmlFor="costumization_select_typography_two">
                Fonte 2:
              </label>
              <select
                id="costumization_select_typography_two"
                value={fontTwo}
                onChange={(e) => {
                  setFontTwo(e.target.value);
                }}
              >
                {Object.entries(fontOptions).map(([key, font]) => (
                  <option key={key} value={font}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="costumization_div_content_typography_input">
              <label htmlFor="costumization_input_typography_two_size">
                <TbTextSize /> Tamanho da Fonte
              </label>
              <input
                type="number"
                id="costumization_input_typography_two_size"
                value={fontSizeTwo}
                onChange={(e) => setFontSizeTwo(e.target.value)}
              />
            </div>

            <div className="costumization_div_content_typography_input">
              <label htmlFor="costumization_input_typography_two_space">
                <TbTextSize /> Espaçamento entre Letras
              </label>
              <input
                type="number"
                id="costumization_input_typography_two_space"
                value={fontSpaceTwo}
                onChange={(e) => setFontSpaceTwo(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
