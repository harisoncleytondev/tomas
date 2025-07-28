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
import {
  deleteToken,
  setTokenLocal,
  setTokenSession,
} from '../../utils/auth.js';

export default function Login() {
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
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
        deleteToken();
        if (rememberMe) {
          setTokenLocal(token);
        } else {
          setTokenSession(token);
        }
        navigate('/assistente/chat', { replace: true });
      } else {
        setError(true);
      }
    } catch (err) {
      response = null;
      console.log('Houve um erro ao requisitar o backend: ' + err);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    window.location.href = `${getURL()}auth/google`;
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
              {error === false ? (
                'Email'
              ) : (
                <>
                  Email -{' '}
                  <span style={{ color: 'red' }}>
                    Email ou senha inválidos.
                  </span>
                </>
              )}
            </label>
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              name="email"
              id="login_input_email"
              className="login_input_text login_common_input"
              style={error === false ? {} : { borderColor: 'red' }}
              required
            />
          </div>

          <div>
            <label
              className="login_input_label_text"
              htmlFor="login_input_password"
            >
              {error === false ? (
                'Senha'
              ) : (
                <>
                  Senha -{' '}
                  <span style={{ color: 'red' }}>
                    Email ou senha inválidos.
                  </span>
                </>
              )}
            </label>
            <div id="login_div_input_password">
              <input
                type={showPassword == false ? 'password' : 'text'}
                name="password"
                placeholder="****************"
                id="login_input_password"
                style={error === false ? {} : { borderColor: 'red' }}
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
            <input
              type="checkbox"
              id="login_input_checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
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
          <Link id="login_text_link_createaccount" to={'/criar-conta'}>
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
          <ButtonGoogle id="login_button_join_google" onClick={(e) => handleGoogle(e)}>
            Entrar com o google
          </ButtonGoogle>
        </div>
      </form>
    </div>
  );
}
