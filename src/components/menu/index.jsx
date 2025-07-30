/* REACT ICONS */
import { CiSettings } from 'react-icons/ci';
import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import { IoCreateOutline, IoCloseSharp } from 'react-icons/io5';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

/* REACT */
import { useState } from 'react';

/* COMPONENTS */
import ChatMenu from '../../components/chatbot/chatmenu/index.jsx';

/* UTILS */
import { getPayload, getToken } from '../../utils/auth.js';
import { getURL } from '../../utils/api.js';

/* CSS */
import './css/MenuStyles.css'
import './css/MenuStyles.responsive.css'

export default function Menu() {
  const [isMenuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [filter, setFilter] = useState([]);

  const getChats = async () => {
    const response = await fetch(`${getURL()}chat/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((data) => data.json());
    setChats(response.chat);
  };

  const handleButtonMenu = () => {
    if (!isMenuActive) {
      getChats();
    }
    setMenuActive(!isMenuActive);
  };

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();

    const filterChat = chats.filter((chat) =>
      chat.chat_title?.toLowerCase().includes(search)
    );

    setFilter(filterChat);
  };

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
            {getPayload().icon ? (
              <img
                src={getPayload().icon}
                alt={getPayload().username}
                style={{ width: 40, height: 40, borderRadius: '50%' }}
              />
            ) : (
              <span>
                {getPayload().username.charAt(0).toUpperCase() || '?'}
              </span>
            )}
            <button onClick={handleButtonMenu}>
              <IoCloseSharp />
            </button>
          </div>
          <div>
            <form action="">
              <input
                type="text"
                name="search"
                placeholder="Buscar por chat"
                onChange={(e) => handleSearch(e)}
              />{' '}
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
            {filter.length !== 0
              ? filter.map((chat) => (
                  <ChatMenu
                    key={chat.chat_id}
                    id={chat.chat_id}
                    name={chat.chat_title}
                  />
                ))
              : chats.length === 0
              ? ''
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
