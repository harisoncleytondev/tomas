/* REACT ICONS */
import { CiSettings } from 'react-icons/ci';
import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import { IoCreateOutline, IoCloseSharp } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

/* REACT */
import { useState } from 'react';

/* UTILS */
import { deleteToken, getPayload, getToken } from '../../../utils/auth.js';
import { getURL } from '../../../utils/api.js';

/* CSS */
import './css/MenuStyles.css';
import './css/MenuStyles.responsive.css';
import PromptModal from '../../modal/promptModal/index.jsx';

export default function Menu() {
  const [isMenuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [filter, setFilter] = useState([]);

  const [confirm, setConfirm] = useState(false);
  const [confirmId, setConfirmId] = useState(false);

  const handleButtonDelete = async () => {
    setConfirm(false);
    try {
      const response = await fetch(`${getURL()}chat/delete/${confirmId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        navigate('/assistente/temp', { replace: true });
        setTimeout(() => navigate(`/assistente/chat/`), 0);
      }
    } catch (error) {
      console.log('Erro ' + error);
    }
  };

  const handleNavigate = (id) => {
    navigate('/assistente/temp', { replace: true });
    setTimeout(() => navigate(`/assistente/chat/${id}`), 0);
  };

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
      {confirm === true ? (
        <PromptModal
          title="Confirmar exlusão"
          description="Ao confirmar você irá perder toda a conversa."
          confirmYes={handleButtonDelete}
          confirmNo={() => setConfirm(false)}
        />
      ) : (
        ''
      )}
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
                  <div key={chat.chat_id} className="chatbot_component_menu">
                    <span>
                      <h6>{chat.chat_title}</h6>
                    </span>
                    <button
                      onClick={() => {
                        setConfirmId(chat.chat_id);
                        setConfirm(true);
                      }}
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                ))
              : chats.length === 0
              ? ''
              : chats.map((chat) => (
                  <div key={chat.chat_id} className="chatbot_component_menu">
                    <span onClick={() => handleNavigate(chat.chat_id)}>
                      <h6>{chat.chat_title}</h6>
                    </span>
                    <button
                      onClick={() => {
                        setConfirmId(chat.chat_id);
                        setConfirm(true);
                      }}
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
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
