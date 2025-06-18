/* CSS */
import "./HomeStyles.css";

/* COMPONENTS */
import ButtonBlue from "../../components/buttonPrimary";
import CardHome from "./components/cardHome";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import BackgroundDecor from "../../components/backgroundDecor";

/* REACT ICONS */
import { FaLongArrowAltRight } from "react-icons/fa";

/* REACT ROUTER DOM */
import { useNavigate } from "react-router-dom";

/* ASSETS */
import bot from "./assets/icon_bot.png";
import book from "./assets/icon_book.png";
import chat from "./assets/icon_chat.png";

export default function Home() {

  const navigate = useNavigate();

  const goTo = ( to ) => {
    navigate(to);
  }

  return (
    <div id="home_div_container">
      <NavBar active="home" />
      <BackgroundDecor />

      <div id="home_div_texts">
        <h1>
          Bem-vindo ao seu <br></br>Assistente IA
        </h1>
        <p>
          Uma inteligência feita para entender você. Converse com nosso chatbot, 
          <br></br>
          pensado para tirar dúvidas, organizar ideias e receber ajuda do seu jeito.
        </p>
      </div>

      <div id="home_div_button_start">
        <ButtonBlue onClick={() => goTo("/entrar")}>
          Começar Agora <FaLongArrowAltRight />
        </ButtonBlue>
      </div>

      <div id="home_div_cards">
        <CardHome
          image={chat}
          title="Respostas Rápidas"
          description="Obtenha respostas instantâneas para suas 
          dúvidas  e perguntas sobre diversos 
          assuntos."
        />
        <CardHome
          image={bot}
          title="Suporte 24/7"
          description="Assistência disponível a qualquer hora, respondendo quando você precisar."
        />
        <CardHome
          image={book}
          title="Inteligência Inclusiva"
          description="Receba apoio com empatia, clareza e 
          no seu ritmo. Conversas adaptadas 
          para atender diferentes formas de 
          pensar e aprender."
        />
      </div>

      <Footer />
    </div>
  );
}
