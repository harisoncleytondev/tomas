/* REACT */
import { useEffect } from 'react';

/* REACT ROUTER DOM */
import { useNavigate, useParams } from 'react-router-dom';

/* UTILS */
import { setTokenLocal } from '../../utils/auth';

const AuthGoogleCallback = () => {
  const navigate = useNavigate();
  const { action, token } = useParams();

  useEffect(() => {
    if (token) {
      setTokenLocal(token);
      if (action === 'register') {
        navigate('/assistente/preferencias', { replace: true });
      } else {
        navigate('/assistente/chat', { replace: true });
      }
    } else {
      navigate('/entrar', { replace: true });
    }
  }, [action, token]);


  return <p>Autenticando via Google...</p>;
};

export default AuthGoogleCallback;
