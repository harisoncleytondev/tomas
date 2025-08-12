/* REACT ICONS */
import { CiSettings } from 'react-icons/ci';
import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import { IoCreateOutline, IoCloseSharp } from 'react-icons/io5';
import { MdOutlineDelete } from 'react-icons/md';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

/* REACT */
import { useState, useEffect } from 'react';

/* UTILS */
import { deleteToken, getPayload, getToken } from '../../../utils/auth.js';
import { getURL } from '../../../utils/api.js';

/* CSS */
import './css/MenuStyles.css';
import './css/MenuStyles.responsive.css';

/* COMPONENTS */
import PromptModal from '../../modal/promptModal/index.jsx';
import InfoModal from '../../modal/infoModal/index.jsx';
import Settings from '../settings/index.jsx';

/* FRAME MOTION */
import { motion, AnimatePresence } from 'framer-motion';

export default function Menu() {
  const [isMenuActive, setMenuActive] = useState(false);
  const [isSettingsActive, setSettingsActive] = useState(false);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [filter, setFilter] = useState([]);

  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(false);
  const [confirmId, setConfirmId] = useState(false);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    async function load() {
      const p = await getPayload();
      setPayload(p);
    }
    load();
  }, [payload]);

  const handleButtonDelete = async () => {
    setConfirm(false);
    setError(false);
    const token = await getToken();
    try {
      const response = await fetch(`${getURL()}chat/delete/${confirmId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate('/assistente/temp', { replace: true });
        setTimeout(() => navigate(`/assistente/chat/`), 0);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleNavigate = (id) => {
    navigate('/assistente/temp', { replace: true });
    setTimeout(() => navigate(`/assistente/chat/${id}`), 0);
  };

  const getChats = async () => {
    const token = await getToken();
    try {
      const response = await fetch(`${getURL()}chat/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => data.json());
      setChats(response.chat);
    } catch (error) {
      setChats([]);
    }
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

  return (
    <>
      {/* Botão de abrir o menu */}
      {!isMenuActive && (
        <div id="chatbot_div_menu">
          <button onClick={handleButtonMenu}>
            <IoIosMenu />
          </button>
          <button
            onClick={() => {
              setSettingsActive(true);
              setMenuActive(true);
            }}
          >
            <CiSettings />
          </button>
        </div>
      )}

      {/* Menu lateral */}
      <>
        {isSettingsActive && (
          <Settings
            onClose={() => {
              setSettingsActive(false);
              setMenuActive(false);
            }}
          />
        )}

        {confirm && (
          <PromptModal
            title="Confirmar exclusão"
            description="Ao confirmar você irá perder toda a conversa."
            confirmYes={handleButtonDelete}
            confirmNo={() => setConfirm(false)}
          />
        )}

        {error && (
          <InfoModal
            title="Ops!"
            description="Houve um erro ao tentar excluir esse chat."
            onClose={() => setError(false)}
          />
        )}

        <AnimatePresence>
          {isMenuActive && (
            <motion.div
              key="menu"
              id="chatbot_div_menu_open"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              <div id="chatbot_div_overlay" onClick={handleButtonMenu}></div>

              <div id="chatbot_div_menu_open">
                <section id="chatbot_menu_open_header">
                  <div id="chatbot_div_menu_button_close">
                    {payload.icon ? (
                      <img
                        src={payload.icon}
                        alt={payload.username}
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                      />
                    ) : (
                      <span>
                        {payload.username.charAt(0).toUpperCase() || '?'}
                      </span>
                    )}
                    <button onClick={handleButtonMenu}>
                      <IoCloseSharp />
                    </button>
                  </div>
                  <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        name="search"
                        placeholder="Buscar por chat"
                        onChange={(e) => handleSearch(e)}
                      />
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
                    {filter.length > 0 ? (
                      filter.map((chat) => (
                        <div key={chat.chat_id} className="chatbot_delete_chat">
                          <div
                            className="chatbot_chat_info"
                            onClick={() => handleNavigate(chat.chat_id)}
                          >
                            <h6>{chat.chat_title}</h6>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmId(chat.chat_id);
                              setConfirm(true);
                            }}
                          >
                            <MdOutlineDelete />
                          </button>
                        </div>
                      ))
                    ) : chats.length > 0 ? (
                      chats.map((chat) => (
                        <div key={chat.chat_id} className="chatbot_delete_chat">
                          <div
                            className="chatbot_chat_info"
                            onClick={() => handleNavigate(chat.chat_id)}
                          >
                            <h6>{chat.chat_title}</h6>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmId(chat.chat_id);
                              setConfirm(true);
                            }}
                          >
                            <MdOutlineDelete />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>Nenhum chat</p>
                    )}
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
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </>
  );
}
