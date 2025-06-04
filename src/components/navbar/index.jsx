/* CSS */
import "./NavBarStyles.css";

/* COMPONENTS */
import ButtonBlue from "../buttonPrimary";

export default function NavBar({ active }) {
  return (
    <div>
      <div id="component_navbar_div_container">
        <div id="component_navbar_div_logo">
          <img
            src="/public/assets/icons/favicon/TomasOFC.png"
            id="TomasOFC"
          ></img>
          <h2>Tomas</h2>
        </div>

        <ul>
          <li>
            <a
              href="/"
              id={active == "home" ? "component_navbar_li_active" : ""}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/sobre"
              id={active == "about" ? "component_navbar_li_active" : ""}
            >
              Sobre Nós
            </a>
          </li>
          <li>
            <a
              href=""
              id={active == "books" ? "component_navbar_li_active" : ""}
            >
              Livros
            </a>
          </li>
        </ul>

        <ButtonBlue id="component_navbar_button_one">Iniciar Chat</ButtonBlue>
      </div>
    </div>
  );
}
