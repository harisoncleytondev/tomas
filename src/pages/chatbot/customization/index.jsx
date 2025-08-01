/* CSS */
import './css/CustomizationStyles.css';
import './css/Customization.responsive.css';

/* COMPONENTS */
import InfoModal from '../../../components/modal/infoModal/index.jsx';
import { ScrollBar } from '../../../components/scrollbar/index.jsx';

/* UTILS */
import {
  findFontKeyByValue,
  fontOptions,
  getColorPalette,
  applyPreferencesToCSS,
} from '../../../utils/costumization.jsx';
import { getURL, askToBot } from '../../../utils/api.js';

/* REACT */
import { useState, useEffect } from 'react';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

/* REACT ICONS */
import { MdOutlineColorLens } from 'react-icons/md';
import { TbTextSize, TbTemplate } from 'react-icons/tb';
import { IoIosSave } from 'react-icons/io';

/* TOAST */
import toast, { Toaster } from 'react-hot-toast';
import {
  getPayload,
  getToken,
  isTokenInLocalStorage,
  setTokenLocal,
  setTokenSession,
} from '../../../utils/auth.js';
import Loading from '../../../components/loading/index.jsx';

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
    alert('Tem ainda n mane');
  };

  /* Botão continuar */
  const handleButtonContinue = async () => {
    if (waiting === true) return;
    setWaiting(true);
    setError(false);

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

    const prompt = `Você é um assistente de IA especialista em acessibilidade e diretrizes de contraste de cores (WCAG). Sua função é analisar um conjunto de 4 cores e determinar se a combinação oferece legibilidade e acessibilidade visual adequadas para todos os usuários, com foco especial no público neurodivergente.

## Tarefa
Analise as quatro cores fornecidas abaixo, que correspondem a background, text, button e extra. Verifique as seguintes combinações de contraste:

1. A cor de "text" sobre a cor de "background".
2. A cor de "text" sobre a cor de "button".
3. A cor de "extra" sobre a cor de "background".

---

## Regras de Análise
* **Foco na Visibilidade:** A única razão para rejeitar uma combinação é a falha em atender aos critérios mínimos de contraste que garantem a visibilidade (baseado nas diretrizes WCAG 2.1 nível AA, com uma taxa de contraste de pelo menos 4.5:1 para texto normal).
* **Cores Iguais:** Rejeite a combinação se a cor de "text" for idêntica à cor de "background", se a cor de "text" for idêntica à cor de "button", ou se a cor de "extra" for idêntica à cor de "background". Cores iguais não são aceitas para garantir legibilidade.
* **Ignore a Estética:** NÃO rejeite combinações por serem "estranhas", "feias" ou não convencionais. Se o contraste for suficiente, a combinação é válida.
* **Mensagem para o Cliente:** A mensagem de retorno ("mensagem") deve ser extremamente clara, simples e direta. Se a combinação for reprovada, a mensagem deve explicar qual combinação falhou e por que, usando linguagem fácil de entender e sem jargões técnicos.

---

## Formato de Saída Obrigatório
Sua resposta deve ser **estritamente** um objeto JSON, sem nenhum texto ou explicação adicional fora dele. O objeto deve conter duas chaves:

1. "aprovado": um valor booleano (true ou false).
2. "mensagem": uma string explicando o status.

---

## Cores para Análise
* background: [cor de fundo em hexadecimal, ex: #FFFFFF]
* text: [cor do texto em hexadecimal, ex: #000000]
* button: [cor do botão em hexadecimal, ex: #007BFF]
* extra: [cor extra em hexadecimal, ex: #FFC107]

---

## Exemplos de Saída
* Se for aprovado:
\`\`\`json
{
  "aprovado": true,
  "mensagem": "Ótima escolha! Todas as cores são bem visíveis e fáceis de ler."
}
\`\`\`

* Se for reprovado:
\`\`\`json
{
  "aprovado": false,
  "mensagem": "A cor do texto está muito parecida com a cor de fundo. Isso pode dificultar a leitura para algumas pessoas. Tente usar um texto mais escuro ou um fundo mais claro."
}
\`\`\`

* Se for reprovado por cores iguais:
\`\`\`json
{
  "aprovado": false,
  "mensagem": "A cor do texto é a mesma que a do fundo. Use cores diferentes para garantir que o texto seja visível."
}
\`\`\`
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

    async function updateAccount() {
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

  return (
    <div id="costumization_div">
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
