/* CSS */
import './css/CustomizationStyles.css';
import './css/Customization.responsive.css';

/* COMPONENTS */
import ButtonBlue from '../../../components/buttons/buttonPrimary/index.jsx';

/* UTILS */
import {
  findFontKeyByValue,
  fontOptions,
  getColorPalette,
} from '../../../utils/costumization.jsx';
import { getURL } from '../../../utils/api.js';

/* REACT */
import { useState, useEffect } from 'react';

/* REACT ROUTER DOM */
import { replace, useNavigate } from 'react-router-dom';

/* REACT ICONS */
import { MdOutlineColorLens } from 'react-icons/md';
import { TbTextSize } from 'react-icons/tb';

/* TOAST */
import toast, { Toaster } from 'react-hot-toast';
import { getPayload, getToken, isTokenInLocalStorage, setTokenLocal, setTokenSession } from '../../../utils/auth.js';

export default function Costumization() {
  const payload = getPayload();
  const preferences = payload.preferences;
  const [fontOne, setFontOne] = useState('');
  const [fontTwo, setFontTwo] = useState('');

  const [fontSizeOne, setFontSizeOne] = useState('');
  const [fontSpaceOne, setFontSpaceOne] = useState('');

  const [fontSizeTwo, setFontSizeTwo] = useState('');
  const [fontSpaceTwo, setFontSpaceTwo] = useState('');

  useEffect(() => {
    if (preferences) {
      setFontOne(findFontKeyByValue(preferences.fontOne) || 'baloo');
      setFontTwo(findFontKeyByValue(preferences.fontTwo) || 'lexend');
      setFontSizeOne(preferences.fontOneSize || 45);
      setFontSpaceOne(preferences.fontOneSpacing || 0.8);
      setFontSizeTwo(preferences.fontTwoSize || 16);
      setFontSpaceTwo(preferences.fontTwoSpacing || 0.8);
    }
  }, []);

  const [fontSizeOneError, setFontSizeOneError] = useState('Tamanho da Fonte');
  const [fontSpaceOneError, setFontSpaceOneError] = useState(
    'Espaçamento entre Letras'
  );
  const [fontSizeTwoError, setFontSizeTwoError] = useState('Tamanho da Fonte');
  const [fontSpaceTwoError, setFontSpaceTwoError] = useState(
    'Espaçamento entre Letras'
  );

  const [colorBackground, setBackground] = useState(
    getPayload().preferences.backgroundColor
  );
  const [colorText, setText] = useState(getPayload().preferences.textColor);
  const [colorButton, setButton] = useState(
    getPayload().preferences.buttonColor
  );
  const [colorEmphasis, setEmphasis] = useState(
    getPayload().preferences.extraColor
  );

  const navigate = useNavigate();

  const MIN_FONT_SIZE = 1;
  const MAX_FONT_SIZE = 100;
  const MIN_FONT_SPACE = 0.1;
  const MAX_FONT_SPACE = 10;

  /* Eventos input */
  const handleFontSizeOneChange = (e) => {
    const value = e.target.value;
    setFontSizeOne(value);

    if (value.trim() === '') {
      setFontSizeOneError('Campo obrigatório');
      return;
    }

    const n = parseFloat(value);
    if (n < MIN_FONT_SIZE) {
      setFontSizeOneError(`Mínimo: ${MIN_FONT_SIZE}`);
      return;
    }
    if (n > MAX_FONT_SIZE) {
      setFontSizeOneError(`Máximo: ${MAX_FONT_SIZE}`);
      return;
    }
    setFontSizeOneError('Tamanho da Fonte');
  };

  const handleFontSpaceOneChange = (e) => {
    const value = e.target.value;
    setFontSpaceOne(value);

    if (value.trim() === '') {
      setFontSpaceOneError('Campo obrigatório');
      return;
    }

    const n = parseFloat(value);
    if (n < MIN_FONT_SPACE) {
      setFontSpaceOneError(`Mínimo: ${MIN_FONT_SPACE}`);
      return;
    }
    if (n > MAX_FONT_SPACE) {
      setFontSpaceOneError(`Máximo: ${MAX_FONT_SPACE}`);
      return;
    }
    setFontSpaceOneError('Espaçamento entre Letras');
  };

  const handleFontSizeTwoChange = (e) => {
    const value = e.target.value;
    setFontSizeTwo(value);

    if (value.trim() === '') {
      setFontSizeTwoError('Campo obrigatório');
      return;
    }

    const n = parseFloat(value);
    if (n < MIN_FONT_SIZE) {
      setFontSizeTwoError(`Mínimo: ${MIN_FONT_SIZE}`);
      return;
    }
    if (n > MAX_FONT_SIZE) {
      setFontSizeTwoError(`Máximo: ${MAX_FONT_SIZE}`);
      return;
    }
    setFontSizeTwoError('Tamanho da Fonte');
  };

  const handleFontSpaceTwoChange = (e) => {
    const value = e.target.value;
    setFontSpaceTwo(value);

    if (value.trim() === '') {
      setFontSpaceTwoError('Campo obrigatório');
      return;
    }

    const n = parseFloat(value);
    if (n < MIN_FONT_SPACE) {
      setFontSpaceTwoError(`Mínimo: ${MIN_FONT_SPACE}`);
      return;
    }
    if (n > MAX_FONT_SPACE) {
      setFontSpaceTwoError(`Máximo: ${MAX_FONT_SPACE}`);
      return;
    }
    setFontSpaceTwoError('Espaçamento entre Letras');
  };

  /* Botão continuar */
  const handleButtonContinue = async () => {
    if (
      fontSizeOne < MIN_FONT_SIZE ||
      fontSizeTwo < MIN_FONT_SIZE ||
      fontSizeOne > MAX_FONT_SIZE ||
      fontSizeTwo > MAX_FONT_SIZE
    ) {
      toast.error('Corrija todas os campos antes de continuar');
      return;
    }

    if (
      fontSpaceOne < MIN_FONT_SPACE ||
      fontSpaceTwo < MIN_FONT_SPACE ||
      fontSpaceOne > MAX_FONT_SPACE ||
      fontSpaceTwo > MAX_FONT_SPACE
    ) {
      toast.error('Corrija todas os campos antes de continuar');
      return;
    }

    async function createAccount() {
      const object = {
        preferences: {
          backgroundColor: colorBackground,
          textColor: colorText,
          buttonColor: colorButton,
          extraColor: colorEmphasis,
          fontOne: fontOne,
          fontOneSize: fontSizeOne,
          fontOneSpacing: fontSpaceOne,
          fontTwo: fontTwo,
          fontTwoSize: fontSizeTwo,
          fontTwoSpacing: fontSpaceTwo,
        },
      };
      const response = await fetch(`${getURL()}user/edit/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(object),
      });

      if (response.ok) {
        const data = await response.json();

        if (isTokenInLocalStorage) {
          setTokenLocal(data.token);
        } else {
          setTokenSession(data.token);
        }

        return true;
      }
    }

    const res = await createAccount();

    if (res) {
      navigate('/assistente/chat', { replace: true });
    } else {
      navigate('/assistente/chat', { replace: true });
    }
  };

  /* Cores */
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
      <Toaster position="top-center" reverseOrder={false} />
      <div id="costumization_div_header">
        <h2>Personalize sua Experiência</h2>
        <p>
          As modificações só serão aplicadas no chat. Você poderá mudar isso
          depois
        </p>
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
          <ButtonBlue
            id="costumization_div_content_title_btn"
            onClick={handleButtonContinue}
          >
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
                {Object.entries(fontOptions).map(([key, option]) => (
                  <option key={key} value={key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="costumization_div_content_typography_input">
              <label
                htmlFor="costumization_input_typography_one_size"
                className={
                  fontSizeOneError !== 'Tamanho da Fonte'
                    ? 'costumization_input_error_message'
                    : ''
                }
              >
                <TbTextSize /> {fontSizeOneError}
              </label>
              <input
                type="number"
                id="costumization_input_typography_one_size"
                value={fontSizeOne}
                className={
                  fontSizeOneError !== 'Tamanho da Fonte'
                    ? 'costumization_input_error_message'
                    : ''
                }
                onChange={(e) => handleFontSizeOneChange(e)}
              />
            </div>

            <div className="costumization_div_content_typography_input">
              <label
                htmlFor="costumization_input_typography_one_space"
                className={
                  fontSpaceOneError !== 'Espaçamento entre Letras'
                    ? 'costumization_input_error_message'
                    : ''
                }
              >
                <TbTextSize /> {fontSpaceOneError}
              </label>
              <input
                type="number"
                id="costumization_input_typography_one_space"
                className={
                  fontSpaceOneError !== 'Espaçamento entre Letras'
                    ? 'costumization_input_error_message'
                    : ''
                }
                value={fontSpaceOne}
                onChange={(e) => handleFontSpaceOneChange(e)}
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
                {Object.entries(fontOptions).map(([key, option]) => (
                  <option key={key} value={key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="costumization_div_content_typography_input">
              <label
                htmlFor="costumization_input_typography_two_size"
                className={
                  fontSizeTwoError !== 'Tamanho da Fonte'
                    ? 'costumization_input_error_message'
                    : ''
                }
              >
                <TbTextSize /> {fontSizeTwoError}
              </label>
              <input
                type="number"
                id="costumization_input_typography_two_size"
                value={fontSizeTwo}
                className={
                  fontSizeTwoError !== 'Tamanho da Fonte'
                    ? 'costumization_input_error_message'
                    : ''
                }
                onChange={(e) => handleFontSizeTwoChange(e)}
              />
            </div>

            <div className="costumization_div_content_typography_input">
              <label
                htmlFor="costumization_input_typography_two_space"
                className={
                  fontSpaceTwoError !== 'Espaçamento entre Letras'
                    ? 'costumization_input_error_message'
                    : ''
                }
              >
                <TbTextSize /> {fontSpaceTwoError}
              </label>
              <input
                type="number"
                id="costumization_input_typography_two_space"
                className={
                  fontSpaceTwoError !== 'Espaçamento entre Letras'
                    ? 'costumization_input_error_message'
                    : ''
                }
                value={fontSpaceTwo}
                onChange={(e) => handleFontSpaceTwoChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
