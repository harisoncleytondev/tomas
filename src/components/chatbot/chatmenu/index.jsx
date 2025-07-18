/* REACT ICONS */
import { MdOutlineDelete } from 'react-icons/md';

/* CSS */
import './css/ChatMenuStyles.css';

/* UTILS */
import { getURL } from '../../../utils/api.js';
import { getToken } from '../../../utils/auth.js';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

export default function ChatMenu({ id, name }) {
  const navigate = useNavigate();

  const handleButton = async () => {
    try {
      const response = await fetch(`${getURL()}chat/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.ok) {
        window.location.href = window.location.href;
      }
    } catch (error) {
      console.log('Erro ' + error);
    }
  };

  const handleNavigate = () => {
    navigate('/assistente/temp', { replace: true });
    setTimeout(() => navigate(`/assistente/chat/${id}`), 0);
  };

  return (
    <div id="chatbot_component_menu" onClick={handleNavigate}>
      <h6>{name}</h6>
      <button onClick={handleButton}>
        <MdOutlineDelete />
      </button>
    </div>
  );
}
