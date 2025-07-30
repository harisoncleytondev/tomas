/* REACT */
import { useCallback, useEffect, useState } from 'react';

/* REACT ROUTER DOM */
import { useParams, useNavigate } from 'react-router-dom';

/* CSS */
import './css/ChatBotStyles.css';
import './css/ChatBotStyles.responsive.css';

/* UTILS */
import { getPayload, getToken } from '../../utils/auth.js';

/* COMPONENTS */
import { getURL } from '../../utils/api.js';
import { LoadChat, NoChat } from '../../components/chatbot/loadchat/index.jsx';
import Menu from '../../components/menu/index.jsx';

export default function ChatBot() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [getChatData, setChatData] = useState(null);
  const [messages, setMessages] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getChat = useCallback(async () => {
    if (chatId == null) {
      setChatData(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${getURL()}chat/${chatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 402) {
        return navigate('/assistente/pagamento', { replace: true });
      }
      if (response.status === 404)
        return navigate('/assistente/chat', { replace: true });
      if (response.status === 401)
        return navigate('/entrar', { replace: true });
      if (response.status === 403)
        return navigate('/assistente/chat', { replace: true });

      if (response.status === 200) {
        const json = await response.json();
        setMessages(json.messages);
        setChatData(chatId);
      }
    } catch (error) {
      console.log('Erro: ' + error);
    } finally {
      setLoading(false);
    }
  });

  const payload = getPayload();

  useEffect(() => {
    if (payload == null) {
      navigate('/entrar', { replace: true });
      return;
    }
  }, []);

  useEffect(() => {
    getChat();
  }, [getChat]);

  return (
    <div>
      <Menu />
      {isLoading === true ? (
        <LoadingChat />
      ) : getChatData == null ? (
        <NoChat />
      ) : (
        <LoadChat chatId={chatId} messages={messages} />
      )}
    </div>
  );
}

function LoadingChat() {
  return (
    <div className="loading-wrapper">
      <div className="loading-container">
        <div className="loading-bubble bot" />
        <div className="loading-bubble user" />
        <div className="loading-bubble bot" />
      </div>
    </div>
  );
}