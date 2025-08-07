/* REACT */
import { useEffect, useRef, useState } from 'react';

/* ASSETS */
import tomasIcon from './assets/TomasOFC.png';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

/* UTILS */
import { getPayload, getToken } from '../../../utils/auth';
import { askToBot, getURL } from '../../../utils/api';

/* CSS */
import './css/LoadChatStyles.css';
import './css/LoadChatStyles.responsive.css';

/* COMPONENTS */
import Prompt from '../prompt';
import InfoModal from '../../modal/infoModal';
import Loading from '../../loading';

/* MARKDOWN */
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

function getPrompt() {
  return `
Você é Tomas, uma IA amigável e acolhedora, especializada em auxiliar pessoas neurodivergentes.

**Principais Diretrizes**

1. **Clareza e Objetividade**
   - Frases curtas e diretas.
   - Vá sempre ao ponto, oferecendo resumos quando precisar.

2. **Acessibilidade**
   - Use Markdown:
     - Títulos (#, ##)
     - Listas (-, 1.)
     - **Negrito** e *itálico*
     - Blocos de código com crases triplas (\`\`\`) e indicação da linguagem

3. **Empatia e Paciência**
   - Tom caloroso e encorajador.
   - Paciente: repita ou simplifique quando necessário.

4. **Estrutura Breve**
   - Use listas ou etapas numeradas.
   - Finalize com um resumo de 1–2 frases.

5. **Limites**
   - Recuse pedidos ofensivos, perigosos ou antiéticos.

Sempre formate suas respostas de modo claro, conciso e acolhedor.`;
}

/* Chat carregado */
export function LoadChat({ chatId, messages }) {
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messageLoad, setMessageLoad] = useState([]);
  const [isMessage, setNewMessage] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [fullText, setFullText] = useState();
  const [images, setImages] = useState([]);
  const [fullTextMsg, setFullTextMsg] = useState();
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayedText('');
    indexRef.current = 0;

    if (!fullText) return;

    const step = 8;

    intervalRef.current = setInterval(() => {
      indexRef.current += step;
      setDisplayedText(fullText.slice(0, indexRef.current));

      if (indexRef.current >= fullText.length) {
        clearInterval(intervalRef.current);
      }
    }, 5);

    return () => clearInterval(intervalRef.current);
  }, [fullText]);

  useEffect(() => {
    if (messageLoad.length === 0) return;

    const lastMsg = messageLoad[messageLoad.length - 1];
    if (lastMsg.is_bot) {
      setFullText(lastMsg.message_content);
    }
  }, [messageLoad]);

  useEffect(() => {
    setMessageLoad(messages);
  }, [messages]);

  useEffect(() => {
    if (waiting) return;
    const interval = setInterval(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!waiting) return;
    const interval = setInterval(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [waiting]);

  useEffect(() => {
    if (isMessage == false) return;

    const timeout = setTimeout(() => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    setNewMessage(false);
    return () => clearTimeout(timeout);
  }, [messageLoad]);

  const handleSendMessage = async () => {
    if (!textareaRef.current || textareaRef.current.value.length === 0) return;
    if (waiting) return;

    const message = textareaRef.current.value;
    setFullTextMsg(message);
    textareaRef.current.value = '';

    setImages([]);
    setWaiting(true);
    setError(false);

    const token = await getToken();

    async function reload() {
      try {
        const response = await fetch(`${getURL()}chat/${chatId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessageLoad(data === null ? messageLoad : data.messages);
        } else {
          throw new Error('Falha no reload');
        }
      } catch {
        setError(true);
      }
    }

    async function newMessageBot() {
      try {
        const botContent = await askToBot({
          history: messageLoad,
          systemPrompt: getPrompt(),
          question: message,
          temperature: 0.5,
        });

        const response = await fetch(`${getURL()}chat/message/${chatId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: botContent,
            isBot: true,
          }),
        });

        if (!response.ok) throw new Error('Erro enviando mensagem do bot');
      } catch {
        setError(true);
      }
    }

    async function newMessageUser() {
      try {
        const response = await fetch(`${getURL()}chat/message/${chatId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: message,
            isBot: false,
          }),
        });

        if (response.ok) {
          await newMessageBot();
          await reload();
        } else {
          throw new Error('Erro enviando mensagem do usuário');
        }
      } catch {
        setError(true);
      }
    }

    await newMessageUser();

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setNewMessage(true);
    setFullTextMsg();
    setWaiting(false);
  };

  return (
    <div id="chatbot_div_container_load">
      {error === true ? (
        <InfoModal
          title="Ops"
          description="Não foi possivel realizar a pergunta, tente novamente."
          onClose={() => {
            setError(false);
            window.location.reload();
          }}
        />
      ) : (
        ''
      )}
      <div id="chatbot_div_message_container">
        <div id="chatbot_div_message_background">
          {messageLoad.map((msg, index) => {
            const isLast = index === messageLoad.length - 1;
            const isBotTyping = isLast && msg.is_bot;

            return (
              <div
                key={msg.message_id}
                ref={messagesEndRef}
                className={`chatbot_div_message chatbot_div_message_${
                  msg.is_bot ? 'bot' : 'user'
                }`}
              >
                {isBotTyping ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                  >
                    {displayedText}
                  </ReactMarkdown>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                  >
                    {msg.message_content}
                  </ReactMarkdown>
                )}
                <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
              </div>
            );
          })}
          {waiting === true ? (
            <>
              <div className={`chatbot_div_message chatbot_div_message_user`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                >
                  {fullTextMsg}
                </ReactMarkdown>

                <span>{new Date().toLocaleTimeString()}</span>
              </div>
              <div
                ref={messagesEndRef}
                className={`chatbot_div_message chatbot_div_message_bot`}
              >
                <div id="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          <div />
        </div>
      </div>
      <Prompt
        className="chatbot_prompt_load"
        refPrompt={textareaRef}
        sendPrompt={handleSendMessage}
        images={images}
        setImages={setImages}
      />
    </div>
  );
}

/* Nenhum chat carregado */
export function NoChat() {
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      const p = await getPayload();
      setPayload(p);
    }
    load();
  }, [payload]);

  useEffect(() => {
    async function load() {
      const systemPrompt = `Você é uma IA especializada em gerar assuntos simples, claras e acessíveis para ajudar pessoas neurodivergentes no dia a dia.

Sua tarefa é gerar apenas assuntos curtos, fáceis de entender, voltadas para organização, tomada de decisões e bem-estar. no JSON:

{
  "message": [
    {"question": "Pergunta aqui?"}
  ]
}

Não envie texto fora do JSON.`;

      const res = await askToBot({
        systemPrompt: systemPrompt,
        question: 'Mê dê 3 assuntos de ate 30 caracteres.',
      });
      const json = JSON.parse(res);
      setQuestions(json.message);
    }

    load();
  }, []);

  const handleButtonSend = async (message) => {
    if (message.length === 0) return;
    if (waiting) return;

    const token = await getToken();
    setWaiting(true);
    setImages([]);

    async function getMessageReply() {
      try {
        const msg = await askToBot({
          systemPrompt: getPrompt(),
          question: message,
          temperature: 0.5,
        });
        return msg;
      } catch {
        return null;
      }
    }

    async function createMessageReply(chatId) {
      const m = await getMessageReply();
      if (m === null) return null;

      try {
        const response = await fetch(`${getURL()}chat/message/${chatId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: m,
            isBot: true,
          }),
        });
        return response.ok ? response : null;
      } catch {
        return null;
      }
    }

    async function createTitle() {
      try {
        const title = await askToBot({
          systemPrompt: `Você é uma inteligência artificial que recebe uma mensagem ou uma conversa e gera um título curto, claro e descritivo que resume os temas principais discutidos.  
O título deve conter no máximo 5 palavras, ser direto, e usar os nomes das funções, variáveis ou tópicos mais importantes da conversa.  
O título deve parecer um nome de chat simples, sem aspas, vírgulas desnecessárias ou frases completas — apenas os termos-chave unidos por "e" ou "–".  
Por exemplo, para uma conversa sobre "useEffect" e "messagesEndRef", o título seria: "useEffect e messagesEndRef".`,
          question: message,
          temperature: 0.5,
        });
        return title;
      } catch {
        return null;
      }
    }

    async function createChatAndMessage() {
      const title = await createTitle();
      if (title == null) return null;

      try {
        const response = await fetch(`${getURL()}chat/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content: message,
          }),
        });

        if (!response.ok) return null;

        const data = await response.json();

        const msgResponse = await createMessageReply(data.chat_id);
        if (msgResponse == null) return null;

        navigate(`/assistente/chat/${data.chat_id}`, { replace: true });

        return true; 
      } catch {
        return null;
      }
    }

    const success = await createChatAndMessage();
    if (!success) {
      setError(true);
    }

    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.style.height = 'auto';
    }
    setWaiting(false);
  };

  return (
    <div id="chatbot_div_container">
      {error === true ? (
        <InfoModal
          title="Ops!"
          description="Ocorreu um erro ao criar esse chat, Tente novamente."
          onClose={() => setError(false)}
        />
      ) : waiting === true ? (
        <Loading />
      ) : (
        ''
      )}
      <section>
        <div id="chatbot_div_title">
          <img src={tomasIcon} alt="Tomas" />
          <h1>
            Olá, {payload == null ? '' : payload.username}.
            <br />
            Como posso ajudar?
          </h1>
        </div>

        <Prompt
          className="chatbot_prompt_noload"
          refPrompt={textareaRef}
          sendPrompt={() => handleButtonSend(textareaRef.current.value)}
          images={images}
          setImages={setImages}
        />

        <div id="chatbot_div_questions_container">
          {questions.map((q, index) => (
            <button
              key={index}
              className="chatbot_div_questions"
              onClick={async (e) =>
                await handleButtonSend(e.currentTarget.innerText)
              }
            >
              {q.question}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
