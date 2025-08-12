/* CSS */
import './css/CustomizationStyles.css';
import './css/Customization.responsive.css';

/* COMPONENTS */
import InfoModal from '../../../components/modal/infoModal/index.jsx';
import { ScrollBar } from '../../../components/scrollbar/index.jsx';
import Loading from '../../../components/loading/index.jsx';

/* UTILS */
import {
  findFontKeyByValue,
  fontOptions,
  getColorPalette,
  applyPreferencesToCSS,
} from '../../../utils/costumization.jsx';
import {
  getPayload,
  getToken,
  isTokenInLocalStorage,
  setTokenLocal,
  setTokenSession,
} from '../../../utils/auth.js';
import { getURL, askToBot } from '../../../utils/api.js';
import themes from '../../../utils/themes.json';

/* REACT */
import { useState, useEffect } from 'react';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

/* REACT ICONS */
import { MdOutlineColorLens } from 'react-icons/md';
import { TbTextSize, TbTemplate } from 'react-icons/tb';
import { IoIosSave } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';

/* TOAST */
import toast, { Toaster } from 'react-hot-toast';

export default function Costumization() {
  const [payload, setPayload] = useState(null);
  const [fontOne, setFontOne] = useState('');
  const [fontTwo, setFontTwo] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);

  const [fontSizeOne, setFontSizeOne] = useState('');
  const [fontSpaceOne, setFontSpaceOne] = useState('');

  const [fontSizeTwo, setFontSizeTwo] = useState('');
  const [fontSpaceTwo, setFontSpaceTwo] = useState('');

  const [fontSizeOneError, setFontSizeOneError] = useState('Tamanho da Fonte');
  const [fontSpaceOneError, setFontSpaceOneError] = useState(
    'Espaçamento entre Letras'
  );
  const [fontSizeTwoError, setFontSizeTwoError] = useState('Tamanho da Fonte');
  const [fontSpaceTwoError, setFontSpaceTwoError] = useState(
    'Espaçamento entre Letras'
  );

  const [colorBackground, setBackground] = useState('');
  const [colorText, setText] = useState('');
  const [colorButton, setButton] = useState('');
  const [colorEmphasis, setEmphasis] = useState('');

  const [confirm, setConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showTheme, setShowTheme] = useState(false);
  const [showThemeCategory, setShowThemeCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const p = await getPayload();
      setPayload(p);
      applyPreferencesToCSS(p.preferences);
    }
    load();
  }, []);

  useEffect(() => {
    if (payload) {
      setBackground(payload.preferences.backgroundColor);
      setText(payload.preferences.textColor);
      setButton(payload.preferences.buttonColor);
      setEmphasis(payload.preferences.extraColor);
      setFontOne(findFontKeyByValue(payload.preferences.fontOne) || 'baloo');
      setFontTwo(findFontKeyByValue(payload.preferences.fontTwo) || 'lexend');
      setFontSizeOne(payload.preferences.fontOneSize || 45);
      setFontSpaceOne(payload.preferences.fontOneSpacing || 0.8);
      setFontSizeTwo(payload.preferences.fontTwoSize || 16);
      setFontSpaceTwo(payload.preferences.fontTwoSpacing || 0.8);
    }
  }, [payload]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showTheme === true) {
        setShowTheme(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showTheme]);

  const MIN_FONT_SIZE = 1;
  const MAX_FONT_SIZE = 60;
  const MIN_FONT_SPACE = 0.1;
  const MAX_FONT_SPACE = 4;

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

  /* Botão modelos */
  const handleButtonModels = async () => {
    setShowTheme(true);
  };

  /* Update */
  const updateAccount = async () => {
    setWaiting(true);
    setError(false);
    try {
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
      const token = await getToken();
      const response = await fetch(`${getURL()}user/edit/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

      return null;
    } catch (error) {
      return null;
    }
  };

  /* Botão continuar */
  const handleButtonContinue = async () => {
    if (waiting === true) return;

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

    const prompt = `Você é um assistente de IA especialista em design de temas e acessibilidade.

Analise um conjunto de 4 cores: background, text, button e extra.

Sua tarefa é avaliar se o tema formado por essas cores é **bom, visível e legível** para a maioria dos usuários, incluindo pessoas neurodivergentes.

Rejeite o tema somente se:
- O texto (text) for igual à cor de fundo (background) ou ao botão (button), dificultando a leitura.
- A cor extra (extra) for igual ao fundo (background), causando invisibilidade.
- A combinação tornar a leitura do texto muito difícil ou o tema visualmente confuso a ponto de prejudicar a usabilidade.

Não rejeite por cálculos técnicos rigorosos de contraste. Foque na percepção geral de visibilidade e harmonia.

Responda **apenas** com um objeto JSON contendo:
{
  "validate": true|false,
  "message": "mensagem simples e direta explicando a avaliação"
}

Exemplos:

Aprovado:
{
  "validate": true,
  "message": "O tema é visualmente agradável e as cores garantem boa visibilidade e legibilidade."
}

Reprovado por cores iguais ou pouca visibilidade:
{
  "validate": false,
  "message": "A cor do texto é muito parecida com o fundo ou com o botão, o que dificulta a leitura. Por favor, escolha cores mais distintas."
}
`;

    const verification = await askToBot({
      systemPrompt: prompt,
      question: `BACKGROUND: ${colorBackground} TEXT: ${colorText} BUTTON: ${colorButton} EXTRA(DETAILS): ${colorEmphasis}`,
      temperature: 0,
    });

    const json = await JSON.parse(verification);

    if (json.validate === false) {
      setConfirm(true);
      setConfirmMessage(json.message);
      return;
    }

    const res = await updateAccount();
    setWaiting(false);

    if (res != null) {
      navigate('/assistente/chat', { replace: true });
    } else {
      setError(true);
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

  const applyTheme = async (theme) => {
    setBackground(theme.colors.background);
    setButton(theme.colors.button);
    setEmphasis(theme.colors.extra);
    setText(theme.colors.text);
    setShowTheme(false);
  };

  const themeJSX = (theme) => {
    return (
      <>
        <div
          style={{ background: theme.colors.background }}
          onClick={async () => await applyTheme(theme)}
        >
          <div id="costumization_div_themes_select">
            <span style={{ color: theme.colors.text }}>Selecionar agora</span>
          </div>
          <p style={{ color: theme.colors.text }}>{theme.name}</p>
          <button
            style={{
              background: theme.colors.button,
              color: theme.colors.text,
            }}
          >
            Botão
          </button>
          <h4
            style={{
              background: theme.colors.button,
              color: theme.colors.extra,
            }}
          >
            Texto de destaque
          </h4>
        </div>
      </>
    );
  };

  return (
    <div id="costumization_div">
      {showTheme === true ? (
        <>
          <div
            id="costumization_div_themes_overlay"
            onClick={() => setShowTheme(false)}
          ></div>
          <div id="costumization_div_themes">
            <div id="costumization_div_themes_title">
              <h2>Temas</h2>
              <p>Escolha entre temas já predefinidos.</p>
            </div>
            <button
              id="costumization_div_themes_close"
              onClick={() => setShowTheme(false)}
            >
              {' '}
              <IoCloseSharp />{' '}
            </button>
            <div id="costumization_div_themes_button">
              <button onClick={() => setShowThemeCategory('all')}>Todos</button>
              <button onClick={() => setShowThemeCategory('dark')}>
                Escuros
              </button>
              <button onClick={() => setShowThemeCategory('light')}>
                Claros
              </button>
            </div>
            <div id="costumization_div_themes_space"></div>

            <div id="costumization_div_themes_container">
              {themes.themes
                .filter((theme) =>
                  showThemeCategory === 'all'
                    ? true
                    : theme.category.includes(showThemeCategory)
                )
                .map((theme) => (
                  <div key={theme.id}>{themeJSX(theme)}</div>
                ))}
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {confirm === true ? (
        <InfoModal
          title="Ops!"
          description={confirmMessage}
          onClose={() => setConfirm(false)}
        />
      ) : (
        ''
      )}
      {error === true ? (
        <InfoMOdal
          title="Ops!"
          description="Houve um erro ao salvar suas informações. Tente novamente."
          onClose={() => setError(false)}
        />
      ) : waiting === true ? (
        <Loading />
      ) : (
        ''
      )}
      <ScrollBar />
      <Toaster position="top-center" reverseOrder={false} />
      <div id="costumization_div_header">
        <h2>Personalize sua Experiência</h2>
        <p>Pode mudar e deixar as cores do jeitinho que você mais gostar!</p>
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

        <div id="costumization_div_button">
          <button onClick={async () => await handleButtonModels()}>
            <TbTemplate /> Ver modelos
          </button>
          <button onClick={async () => await handleButtonContinue()}>
            <IoIosSave /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
