/* CSS */
import "./ErrorPageStyles.css";

/* COMPONENTS */
import ButtonBlue from "../../components/buttonPrimary";

/* REACT ICONS */
import { FaHouseChimney } from "react-icons/fa6";

/* REACT ROUTER */
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ errorId, description }) {
  const navigate = useNavigate();

  return (
    <div id="error_div_container">
      <div id="error_div_robot">
        <svg
          width="150"
          height="200"
          viewBox="0 0 150 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="40" y="50" width="70" height="100" rx="10" fill="#2463eb" />

          <rect x="35" y="10" width="80" height="50" rx="10" fill="#2463eb" />

          <circle cx="55" cy="30" r="5" fill="white" />
          <circle cx="95" cy="30" r="5" fill="white" />

          <rect x="65" y="40" width="20" height="4" rx="2" fill="white" />

          <line
            x1="75"
            y1="0"
            x2="75"
            y2="10"
            stroke="#2463eb"
            stroke-width="3"
          />
          <circle cx="75" cy="0" r="3" fill="#2463eb" />

          <rect x="25" y="75" width="10" height="30" rx="5" fill="#2463eb" />
          <rect x="115" y="75" width="10" height="30" rx="5" fill="#2463eb" />

          <rect x="55" y="150" width="8" height="30" rx="4" fill="#2463eb" />
          <rect x="85" y="150" width="8" height="30" rx="4" fill="#2463eb" />

          <rect x="60" y="95" width="30" height="20" rx="5" fill="#ffffff33" />
          <text
            x="75"
            y="110"
            font-family="Arial"
            font-size="12"
            text-anchor="middle"
            fill="white"
          >
            {errorId}
          </text>
        </svg>
      </div>

      <h1>{errorId}</h1>
      <h2 id="error_text_h2">Oops! Página não encontrada</h2>

      <p id="error_text_description">{description}</p>

      <div id="error_div_button">
        <ButtonBlue onClick={() => navigate("/")} id="error_button_exit">
          <FaHouseChimney /> Voltar para o Início
        </ButtonBlue>
      </div>
      <div id="error_div_list">
        <h4>Algumas sugestões:</h4>
        <ul>
          <li>• Verifique se o endereço está correto</li>
          <li>• Tente voltar à página anterior</li>
          <li>• Visite nossa página inicial</li>
        </ul>
      </div>
    </div>
  );
}
