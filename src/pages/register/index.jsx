/* CSS */
import "./css/RegisterStyles.css";
import "./css/RegisterStyles.responsive.css";

/* COMPONENTS */
import ButtonGoogle from "../../components/buttonGoogle";
import ButtonBlue from "../../components/buttonPrimary";
import Footer from "../../components/footer";
import BackgroundDecor from "../../components/backgroundDecor";

/* REACT */
import { useState } from "react";

/* REACT ROUTER DOM */
import { Link, useNavigate } from "react-router-dom";

/* REACT ICONS */
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleTerms = () => {
    navigate("/termos-e-politica");
  };

  const handleEye = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div id="register_div_container">
      <BackgroundDecor />
      <div id="register_div_texts">
        <h1 id="register_text_h1">Tomas</h1>
        <h3 id="register_text_h3">Crie uma conta</h3>
      </div>

      <form action="" id="register_form">
        <div id="register_div_inputs">
          <div>
            <label
              className="register_input_label_text"
              htmlFor="register_input_email"
            >
              Nome
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              id="register_input_name"
              className="register_input_text register_common_input"
              required
            />
          </div>

          <div>
            <label
              className="register_input_label_text"
              htmlFor="register_input_email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              id="register_input_email"
              className="register_input_text register_common_input"
              required
            />
          </div>

          <div>
            <label
              className="register_input_label_text"
              htmlFor="register_input_password"
            >
              Senha
            </label>
            <div id="register_div_input_password">
              <input
                type={showPassword == false ? "password" : "text"}
                placeholder="****************"
                id="register_input_password"
                className="register_input_text register_common_input"
                required
              />
              <button
                onClick={(e) => {
                  handleEye(e);
                }}
              >
                {showPassword == false ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>

          <div>
            <label
              className="register_input_label_text"
              htmlFor="register_input_password"
            >
              Confirmar senha
            </label>
            <div id="register_div_input_confirmpassword">
              <input
                type={showPassword == false ? "password" : "text"}
                placeholder="****************"
                id="register_input_confirmpassword"
                className="register_input_text register_common_input"
                required
              />
              <button
                onClick={(e) => {
                  handleEye(e);
                }}
              >
                {showPassword == false ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>
        </div>

        <div id="register_helpers">
          <div id="register_div_remember">
            <input type="checkbox" id="register_input_checkbox" />
            <label htmlFor="register_input_checkbox">
              Aceito os <span onClick={handleTerms}>termos de uso</span> e{" "}
              <span onClick={handleTerms}>política de privacidade</span>
            </label>
          </div>
        </div>

        <div id="register_div_button_join">
          <ButtonBlue id="register_button_join">Entrar</ButtonBlue>
        </div>

        <span id="register_text_span_createaccount">
          Já tem uma conta?{" "}
          <Link id="register_text_link_createaccount" to={"/entrar"}>
            {" "}
            Faça login
          </Link>
        </span>

        <div id="register_div_spaces">
          <div className="register_div_space"></div>
          <span>Ou continue com</span>
          <div className="register_div_space"></div>
        </div>

        <div id="register_div_button_google">
          <ButtonGoogle id="register_button_join_google">
            Entrar com o google
          </ButtonGoogle>
        </div>
      </form>

      <Footer className="register_footer" />
    </div>
  );
}
