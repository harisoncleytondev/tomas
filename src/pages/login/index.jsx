/* CSS */
import './css/LoginStyles.css';
import './css/LoginStyles.responsive.css';

/* COMPONENTS */
import ButtonGoogle from '../../components/buttons/buttonGoogle';
import ButtonBlue from '../../components/buttons/buttonPrimary';
import BackgroundDecor from '../../components/backgroundDecor';

/* REACT */
import { useState } from 'react';

/* REACT ROUTER DOM */
import { Link, useNavigate } from 'react-router-dom';

/* REACT ICONS */
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { getURL } from '../../utils/api';

/* UTILS */
import { setToken } from '../../utils/auth.js';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries()); // Converte para um json
    let response;
    try {
      response = await fetch(`${getURL()}user/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        navigate('/assistente/chat', { replace: true });
      }
    } catch (err) {
      response = null;
      console.log('Houve um erro ao requisitar o backend: ' + err);
    }
  };

  return (
    <div id="login_div_container">
      <BackgroundDecor />
      <div id="login_div_texts">
        <h1 id="login_text_h1">Tomas</h1>
        <h3 id="login_text_h3">Entre na sua conta</h3>
      </div>

      <form action="" id="login_form" onSubmit={(e) => handleForm(e)}>
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
              name="email"
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
                type={showPassword == false ? 'password' : 'text'}
                name="password"
                placeholder="****************"
                id="login_input_password"
                className="login_input_text login_common_input"
                required
              />
              <button
                onClick={() => {
                  showPassword == false
                    ? setShowPassword(true)
                    : setShowPassword(false);
                }}
              >
                {showPassword == false ? <FiEye /> : <FiEyeOff />}
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
            <Link id="login_text_link_forgotpassword" to={''}>
              Esqueceu a senha?
            </Link>
          </span>
        </div>

        <div id="login_div_button_join">
          <ButtonBlue id="login_button_join">Entrar</ButtonBlue>
        </div>

        <span id="login_text_span_createaccount">
          Não tem uma conta?{' '}
          <Link id="login_text_link_createaccount" to={'/cadastrar'}>
            {' '}
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
    </div>
  );
}
