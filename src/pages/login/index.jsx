/* CSS */
import "./LoginStyles.css";

/* COMPONENTS */
import ButtonGoogle from "../../components/buttonGoogle";
import ButtonBlue from "../../components/buttonPrimary";
import Footer from "../../components/footer";
import BackgroundDecor from "../../components/backgroundDecor";

/* REACT */
import { useState } from "react";

/* REACT ROUTER DOM */
import { Link } from "react-router-dom";

/* REACT ICONS */
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div id="login_div_container">
      <BackgroundDecor />
      <div id="login_div_texts">
        <h1 id="login_text_h1">Tomas</h1>
        <h3 id="login_text_h3">Entre na sua conta</h3>
      </div>

      <form action="" id="login_form">
        <div id="login_div_inputs">
          <div>
            <label
              className="login_input_label_text"
              htmlFor="login_input_email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              id="login_input_email"
              className="login_input_text login_common_input"
              required
            />
          </div>

          <div>
            <label
              className="login_input_label_text"
              htmlFor="login_input_password"
            >
              Senha
            </label>
            <div id="login_div_input_password">
              <input
                type={showPassword == false ? "password" : "text"}
                placeholder="****************"
                id="login_input_password"
                className="login_input_text login_common_input"
                required
              />
              <button onClick={() => {showPassword == false ? setShowPassword(true) : setShowPassword(false)}}>
                <FiEye/>
              </button>
            </div>
          </div>
        </div>

        <div id="login_helpers">
          <div id="login_div_remember">
            <input type="checkbox" id="login_input_checkbox" />
            <label htmlFor="login_input_checkbox">Lembrar de mim</label>
          </div>

          <span>
            <Link id="login_text_link_forgotpassword" to={""}>
              Esqueceu a senha?
            </Link>
          </span>
        </div>

        <div id="login_div_button_join">
          <ButtonBlue id="login_button_join">Entrar</ButtonBlue>
        </div>

        <span id="login_text_span_createaccount">
          Não tem uma conta?{" "}
          <Link id="login_text_link_createaccount" to={"/cadastrar"}>
            {" "}
            Cadastre-se
          </Link>
        </span>

        <div id="login_div_spaces">
          <div className="login_div_space"></div>
          <span>Ou continue com</span>
          <div className="login_div_space"></div>
        </div>

        <div id="login_div_button_google">
          <ButtonGoogle id="login_button_join_google">
            Entrar com o google
          </ButtonGoogle>
        </div>
      </form>

      <Footer className="login_footer" />
    </div>
  );
}
