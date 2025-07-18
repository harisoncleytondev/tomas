/* REACT ICONS */
import { FaRegPaperPlane } from 'react-icons/fa6';

/* REACT */
import { useEffect, useRef, useState } from 'react';

/* ASSETS */
import tomasIcon from './assets/TomasOFC.png';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

/* UTILS */
import { getPayload, getToken } from '../../../utils/auth';

/* CSS */
import './css/LoadChatStyles.css';
import { getReplyBotMessage, getURL } from '../../../utils/api';

/* Chat carregado */
export function LoadChat({ chatId, messages }) {
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messageLoad, setMessageLoad] = useState([]);

  useEffect(() => {
    setMessageLoad(messages);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 0);

    return () => clearTimeout(timeout);
  }, [messageLoad]);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (textareaRef.current.value.length == 0) return;

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
          content: await getReplyBotMessage(textareaRef.current.value),
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
          content: textareaRef.current.value,
          isBot: false,
        }),
      });

      if (response.ok) {
        await newMessageBot();
        reload();
      }
    }

    await newMessageUser();
    textareaRef.current.value = '';
  };

  return (
    <div id="chatbot_div_container_load">
      <div id="chatbot_div_message_container">
        <div id="chatbot_div_message_background">
          {messageLoad.map((msg) => (
            <div
              key={msg.message_id}
              className={`chatbot_div_message chatbot_div_message_${
                msg.is_bot === true ? 'bot' : 'user'
              }`}
            >
              <p>{msg.message_content}</p>
              <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />{' '}
        </div>
      </div>

      <section>
        <form>
          <textarea
            ref={textareaRef}
            onInput={handleInput}
            name="question"
            placeholder="Sobre o que deseja conversar?"
            rows={1}
          ></textarea>
          <button onClick={async (e) => await handleSendMessage(e)}>
            <FaRegPaperPlane />
          </button>
        </form>
      </section>
    </div>
  );
}

/* Nenhum chat carregado */
export function NoChat() {
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleButtonSend = async (event) => {
    event.preventDefault();

    async function cretaMessageReply(chatId) {
      const reponse = await fetch(`${getURL()}chat/message/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          content: await getReplyBotMessage(textareaRef.current.value),
          isBot: true,
        }),
      });
    }

    async function createChatAndMessage() {
      try {
        const response = await fetch(`${getURL()}chat/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ content: textareaRef.current.value }),
        });

        if (response.ok) {
          const data = await response.json();
          await cretaMessageReply(data.chat_id);
          navigate(`/assistente/chat/${data.chat_id}`, { replace: true });
        }
      } catch (error) {
        console.log('Erro: ' + error);
      }
    }

    await createChatAndMessage();
  };

  return (
    <div id="chatbot_div_container">
      <section>
        <div id="chatbot_div_title">
          <img src={tomasIcon} alt="Tomas" />
          <h1>
            Olá, {getPayload().username}.
            <br />
            Como posso ajudar?
          </h1>
        </div>

        <form>
          <textarea
            ref={textareaRef}
            onChange={handleInput}
            name="question"
            placeholder="Sobre o que deseja conversar?"
          ></textarea>
          <button onClick={async (e) => handleButtonSend(e)}>
            <FaRegPaperPlane />
          </button>
        </form>

        <div id="chatbot_div_questions_container">
          <button className="chatbot_div_questions">
            Me ajude com meus estudos
          </button>

          <button className="chatbot_div_questions">
            Vamos conversar um pouco?
          </button>

          <button className="chatbot_div_questions">Dicas para foco</button>
        </div>
      </section>
    </div>
  );
}
