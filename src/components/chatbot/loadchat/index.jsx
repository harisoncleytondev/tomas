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

  useEffect(() => {
    setMessageLoad(messages);
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMessage == false) return;

    const timeout = setTimeout(() => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    setNewMessage(false);
    return () => clearTimeout(timeout);
  }, [messageLoad]);

  const handleSendMessage = async () => {
    if (textareaRef.current.value.length === 0) return;
    if (waiting) return;
    const message = textareaRef.current.value;
    textareaRef.current.value = '';

    setWaiting(true);

    async function reload() {
      const response = await fetch(`${getURL()}chat/${chatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessageLoad(data === null ? messageLoad : data.messages);
      }

      return null;
    }

    async function newMessageBot() {
      const response = await fetch(`${getURL()}chat/message/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          content: await askToBot({
            history: messageLoad,
            systemPrompt: getPrompt(),
            question: message,
            temperature: 0.5,
          }),
          isBot: true,
        }),
      });
    }

    async function newMessageUser() {
      const response = await fetch(`${getURL()}chat/message/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          content: message,
          isBot: false,
        }),
      });

      if (response.ok) {
        await newMessageBot();
        reload();
      }
    }

    await newMessageUser();
    textareaRef.current.style.height = 'auto';
    setNewMessage(true);
    setWaiting(false);
  };

  return (
    <div id="chatbot_div_container_load">
      <div id="chatbot_div_message_container">
        <div id="chatbot_div_message_background">
          {messageLoad.map((msg) => (
            <div
              key={msg.message_id}
              ref={messagesEndRef}
              className={`chatbot_div_message chatbot_div_message_${
                msg.is_bot ? 'bot' : 'user'
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
              >
                {msg.message_content}
              </ReactMarkdown>
              <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
      <Prompt
        className="chatbot_prompt_load"
        refPrompt={textareaRef}
        sendPrompt={handleSendMessage}
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

  useEffect(() => {
    async function load() {
      const systemPrompt = `Você gera perguntas muito curtas e simples para ajudar pessoas neurodivergentes no dia a dia. Só perguntas, sem respostas, no JSON:

{
  "message": [
    {"question": "Pergunta aqui?"}
  ]
}

Não envie texto fora do JSON.`;

      const res = await askToBot({
        systemPrompt: systemPrompt,
        question: 'Mê dê 3 perguntas pequenas.',
      });
      const json = JSON.parse(res);
      setQuestions(json.message);
      console.log(questions);
    }

    load();
  }, []);

  const handleButtonSend = async (message) => {
    if (message.length === 0) return;
    if (waiting) return;

    setWaiting(true);
    async function createMessageReply(chatId) {
      const reponse = await fetch(`${getURL()}chat/message/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          content: await askToBot({
            systemPrompt: getPrompt(),
            question: message,
            temperature: 0.5,
          }),
          isBot: true,
        }),
      });
    }

    async function createChatAndMessage() {
      try {
        const title = await askToBot({
          systemPrompt: `Você é uma inteligência artificial que recebe uma mensagem ou uma conversa e gera um título curto, claro e descritivo que resume os temas principais discutidos.  
O título deve conter no máximo 5 palavras, ser direto, e usar os nomes das funções, variáveis ou tópicos mais importantes da conversa.  
O título deve parecer um nome de chat simples, sem aspas, vírgulas desnecessárias ou frases completas — apenas os termos-chave unidos por "e" ou "–".  
Por exemplo, para uma conversa sobre "useEffect" e "messagesEndRef", o título seria: "useEffect e messagesEndRef".
`,
          question: message,
          temperature: 0.5,
        });

        const response = await fetch(`${getURL()}chat/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            title,
            content: message,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          await createMessageReply(data.chat_id);

          navigate(`/assistente/chat/${data.chat_id}`, { replace: true });
        } else {
          console.error('Erro ao criar chat:', response.statusText);
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    }

    await createChatAndMessage();
    textareaRef.current.value = '';
    textareaRef.current.style.height = 'auto';
    setWaiting(false);
  };

  return (
    <div id="chatbot_div_container">
      <section>
        <div id="chatbot_div_title">
          <img src={tomasIcon} alt="Tomas" />
          <h1>
            Olá, {getPayload() == null ? '' : getPayload().username}.
            <br />
            Como posso ajudar?
          </h1>
        </div>

        <Prompt
          className="chatbot_prompt_noload"
          refPrompt={textareaRef}
          sendPrompt={() => handleButtonSend(textareaRef.current.value)}
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
