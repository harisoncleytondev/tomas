/* REACT ICONS */
import { IoCloseOutline } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';

/* UTILS */
import { getPayload } from '../../../utils/auth';

/* REACT */
import { useEffect, useState } from 'react';

/* REACT ROUTER DOM */
import { replace, useNavigate } from 'react-router-dom';

/* CSS */
import './css/SettingsStyles.css';
import './css/SettingsStyles.responsive.css';

export default function Settings({ onClose }) {
  const [payload, setPayload] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setPayload(await getPayload());
    }
    load();
  }, []);

  return (
    <div id="component_settings_div">
      <div id="component_settings_div_overlay" onClick={() => onClose()}>
        <div id="component_settings_div_content" onClick={(e) => e.stopPropagation()}>
          <div id="component_settings_div_title">
            <h2>Configurações</h2>
            <button onClick={() => onClose()}>
              <IoCloseOutline />
            </button>
          </div>

          <div id="component_settings_div_perfil">
            <div>
              {payload.icon ? (
                <img src={payload.icon} alt={payload.username} />
              ) : (
                <span>{payload.username?.charAt(0)?.toUpperCase() || '?'}</span>
              )}
            </div>

            <section>
              <h4>{payload.username}</h4>
              <button>
                <MdEditSquare />
              </button>
            </section>
          </div>

          <div className="component_settings_div_space"></div>
          <button>
            Alterar senha <FaArrowRight />
          </button>
          <div className="component_settings_div_space hidden"></div>
          <button>
            Alterar email <FaArrowRight />
          </button>
          <div className="component_settings_div_space hidden"></div>
          <button>
            Metodos de pagamento <FaArrowRight />
          </button>
          <div className="component_settings_div_space"></div>
          <button
            onClick={() =>
              navigate('/assistente/preferencias', { replace: true })
            }
          >
            Mudar cores do sistema <FaArrowRight />
          </button>
          <div className="component_settings_div_space"></div>
          <button>
            Politica de Privacidade <FaArrowRight />
          </button>
          <div className="component_settings_div_space hidden"></div>
          <button>
            Termos e Condições <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
