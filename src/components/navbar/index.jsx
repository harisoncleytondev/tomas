import ButtonBlue from "../buttonPrimary";
import "./NavBarStyles.css";

export default function NavBar( {active} ) {
  return (
    <div>
      <div id="navbar">
        <div id="logo">
          <img
            src="/public/assets/icons/favicon/TomasOFC.png"
            id="TomasOFC"
          ></img>
          <h2>Tomas</h2>
        </div>

        <ul>
          <li><a href="/" id={active == "home" ? "active" : ""}>Inicio</a></li>
          <li><a href="/sobre" id={active == "about" ? "active" : ""}>Sobre Nós</a></li>
          <li><a href="" id={active == "books" ? "active" : ""}>Livros</a></li>
        </ul>

        <ButtonBlue className="component_footer_button_one">Iniciar Chat</ButtonBlue>
      </div>
    </div>
  );
}
