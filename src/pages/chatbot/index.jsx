/* REACT ICONS */
import { CiSettings } from 'react-icons/ci';
import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import { IoCreateOutline, IoCloseSharp } from 'react-icons/io5';

/* REACT */
import { useCallback, useEffect, useRef, useState } from 'react';

/* REACT ROUTER DOM */
import { useParams, useNavigate, replace } from 'react-router-dom';

/* CSS */
import './css/ChatBotStyles.css';
import './css/ChatBotStyles.responsive.css';

/* UTILS */
import { deleteToken, getPayload, getToken } from '../../utils/auth.js';
import { applyPreferencesToCSS } from '../../utils/costumization.jsx';

/* COMPONENTS */
import ChatMenu from '../../components/chatbot/chatmenu/index.jsx';
import { getURL } from '../../utils/api.js';
import { LoadChat, NoChat } from '../../components/chatbot/loadchat/index.jsx';

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

  useEffect(() => {
    applyPreferencesToCSS(getPayload().preferences);
  }, []);

  useEffect(() => {
    getChat();
  }, [getChat]);

  return (
    <div>
      <ShowMenu />
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

function ShowMenu() {
  const [isMenuActive, setMenuActive] = useState(false);
  const handleButtonMenu = () => {
    setMenuActive(!isMenuActive);
  };
  const navigate = useNavigate();
  const [chats, setChats] = useState({});

  useEffect(() => {
    async function getChats() {
      const response = await fetch(`${getURL()}chat/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }).then((data) => data.json());
      setChats(response.chat);
    }
    getChats();
  }, [chats]);

  return isMenuActive == false ? (
    <div id="chatbot_div_menu">
      <button onClick={handleButtonMenu}>
        <IoIosMenu />
      </button>
      <button>
        <CiSettings />
      </button>
    </div>
  ) : (
    <div>
      <div id="chatbot_div_overlay" onClick={handleButtonMenu}></div>
      <div id="chatbot_div_menu_open">
        <section id="chatbot_menu_open_header">
          <div id="chatbot_div_menu_button_close">
            <span>{getPayload().username.charAt(0).toUpperCase()}</span>
            <button onClick={handleButtonMenu}>
              <IoCloseSharp />
            </button>
          </div>
          <div>
            <form action="">
              <input type="text" name="search" placeholder="Buscar por chat" />{' '}
              <button>
                <IoIosSearch />
              </button>
            </form>
            <button
              onClick={() => {
                navigate('/assistente/temp', { replace: true });
                setTimeout(() => navigate(`/assistente/chat/`), 0);
              }}
            >
              <IoCreateOutline /> Novo chat
            </button>
          </div>
        </section>

        <section id="chatbot_menu_open_content">
          <div id="chatbot_div_menu_open_chats">
            {chats.lenght == 0
              ? 'opa'
              : chats.map((chat) => (
                  <ChatMenu
                    key={chat.chat_id}
                    id={chat.chat_id}
                    name={chat.chat_title}
                  />
                ))}
          </div>
        </section>

        <button
          id="chatbot_menu_open_footer"
          onClick={() => {
            deleteToken();
            navigate('/entrar', { replace: true });
          }}
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}
