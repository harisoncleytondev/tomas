/* CSS */
import './css/RegisterStyles.css';
import './css/RegisterStyles.responsive.css';

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
import { MdInfoOutline } from 'react-icons/md';

/* UTILS */
import { getURL } from '../../utils/api';

import toast, { Toaster } from 'react-hot-toast';
import { setTokenLocal } from '../../utils/auth';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordStatus, setErrorPasswordStatus] = useState('');
  const [errorConfirmPassword, setConfirmPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  let navigate = useNavigate();

  const handleTerms = () => {
    navigate('/termos-e-politica');
  };

  const handleEye = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    window.location.href = `${getURL()}auth/google`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    // Verifica se a senha é válida
    function verifyPassword(password, confirmPassword) {
      if (password !== confirmPassword) {
        setErrorPasswordStatus('As senhas não conferem. Tente novamente.');
        setErrorPassword(true);
        setConfirmPassword(true);
        return false;
      }

      if (password.length < 8) {
        setErrorPasswordStatus('A senha deve conter no mínimo 8 caracteres');
        setErrorPassword(true);
        return false;
      }

      if (password.length > 16) {
        setErrorPasswordStatus('A senha deve conter no maximo 16 caracteres');
        setErrorPassword(true);
        return false;
      }

      setErrorPassword(false);
      setConfirmPassword(false);
      return true;
    }

    async function createAccount(username, email, password) {
      let object = {
        verify: false,
        token: '',
      };

      try {
        const response = await fetch(`${getURL()}user/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
          }),
        });

        if (response.status == 409) {
          setErrorEmail(true);
          object.verify = false;
          return object;
        }

        const data = await response.json();

        setErrorEmail(false);
        object.verify = true;
        object.token = data.token;
        return object;
      } catch (error) {
        setErrorEmail(true);
        return object;
      }
    }

    const validationPromise = async () => {
      const isEmailValid = await createAccount(
        formObject.name,
        formObject.email,
        formObject.password
      );
      const isPasswordValid = verifyPassword(
        formObject.password,
        formObject.confirmPassword
      );

      if (!isEmailValid.verify || !isPasswordValid) {
        throw new Error('Criação cancelada.');
      }

      setTokenLocal(isEmailValid.token);
      navigate('/assistente/preferencias');
    };
    toast.promise(validationPromise, {
      loading: 'Verificando informações...',
      success: <b>Verificações concluídas com sucesso!</b>,
      error: <b>Falha na verificação de e-mail ou senha.</b>,
    });
  };

  return (
    <div id="register_div_container">
      <Toaster position="top-center" reverseOrder={false} />
      <BackgroundDecor />
      <div id="register_div_texts">
        <h1 id="register_text_h1">Tomas</h1>
        <h3 id="register_text_h3">Crie uma conta</h3>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} id="register_form">
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
              name="name"
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
              {errorEmail === true ? (
                <span>Este e-mail não pode ser utilizado.</span>
              ) : (
                'Email'
              )}
            </label>
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              name="email"
              id="register_input_email"
              className="register_input_text register_common_input"
              required
            />
          </div>

          <div>
            <label
              title="aoba"
              className="register_input_label_text"
              htmlFor="register_input_password"
            >
              {errorPassword === true ? (
                <span>
                  {errorPasswordStatus}
                  <p title="explicando">
                    <MdInfoOutline />
                  </p>
                </span>
              ) : (
                'Senha'
              )}
            </label>
            <div id="register_div_input_password">
              <input
                type={showPassword == false ? 'password' : 'text'}
                placeholder="****************"
                name="password"
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
              {errorConfirmPassword == true ? (
                <span>As senhas não conferem. Tente novamente.</span>
              ) : (
                'Confirmar senha'
              )}
            </label>
            <div id="register_div_input_confirmpassword">
              <input
                type={showPassword == false ? 'password' : 'text'}
                placeholder="****************"
                name="confirmPassword"
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
            <input type="checkbox" id="register_input_checkbox" required />
            <label htmlFor="register_input_checkbox">
              Aceito os <span onClick={handleTerms}>termos de uso</span> e{' '}
              <span onClick={handleTerms}>política de privacidade</span>
            </label>
          </div>
        </div>

        <div id="register_div_button_join">
          <ButtonBlue id="register_button_join">Entrar</ButtonBlue>
        </div>

        <span id="register_text_span_createaccount">
          Já tem uma conta?{' '}
          <Link id="register_text_link_createaccount" to={'/entrar'}>
            {' '}
            Faça login
          </Link>
        </span>

        <div id="register_div_spaces">
          <div className="register_div_space"></div>
          <span>Ou continue com</span>
          <div className="register_div_space"></div>
        </div>

        <div id="register_div_button_google">
          <ButtonGoogle id="register_button_join_google" onClick={handleGoogle}>
            Entrar com o google
          </ButtonGoogle>
        </div>
      </form>
    </div>
  );
}
