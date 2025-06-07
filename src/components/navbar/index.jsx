/* CSS */
import "./NavBarStyles.css";

/* COMPONENTS */
import ButtonBlue from "../buttonPrimary";

/* REACT */
import { useRef, useState } from "react";

/* REACT ICONS */
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

/* REACT DOM */
import { Link } from "react-router-dom";

/* ASSETS */
import bot from "./assets/icons/TomasOFC.png";

export default function NavBar({ active }) {
  const menu = useRef(null);
  let [icon_menu, setMenuIcon] = useState(false);

  const openMenuMobile = () => {
    menu.current.classList.forEach((c) => {
      if (c.includes("component_navbar_div_menu_mobile_disabled")) {
        menu.current.classList.remove(
          "component_navbar_div_menu_mobile_disabled"
        );
        menu.current.classList.add("component_navbar_div_menu_mobile_active");
        setMenuIcon(true);
      } else {
        menu.current.classList.remove(
          "component_navbar_div_menu_mobile_active"
        );
        menu.current.classList.add("component_navbar_div_menu_mobile_disabled");
        setMenuIcon(false);
      }
    });
  };

  const links = (
    <ul>
      <li>
        <Link
          className="component_navbar_link"
          to="/"
          id={active == "home" ? "component_navbar_li_active" : ""}
        >
          Inicio
        </Link>
      </li>
      <li>
        <Link
          className="component_navbar_link"
          to="/sobre"
          id={active == "about" ? "component_navbar_li_active" : ""}
        >
          Sobre Nós
        </Link>
      </li>
    </ul>
  );

  return (
    <div>
      <div id="component_navbar_div_container">
        <div id="component_navbar_div_logo">
          <img src={bot} id="TomasOFC"></img>
          <h2>Tomas</h2>
        </div>

        {links}

        <div id="component_navbar_div_menu_mobile_icon">
          <button onClick={() => openMenuMobile()}>
            {icon_menu == true ? <IoMdClose /> : <IoMenu />}
          </button>
        </div>

        <div
          className="component_navbar_div_menu_mobile_disabled"
          id="component_navbar_div_menu_mobile"
          ref={menu}
        >
          {links}

          <div id="component_navbar_div_menu_mobile_btn">
            <ButtonBlue id="component_navbar_button_two">
              Iniciar Chat
            </ButtonBlue>
          </div>
        </div>

        <ButtonBlue id="component_navbar_button_one">Iniciar Chat</ButtonBlue>
      </div>
    </div>
  );
}
