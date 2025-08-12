/* REACT ROUTER DOM */
import { Outlet, Navigate } from 'react-router-dom';

/* REACT */
import { getToken } from '../utils/auth.js';

/* COMPONENTS */
import { ScrollBar } from '../components/scrollbar';
import Loading from '../components/loading/index.jsx';

/* REACT */
import { useEffect, useState } from 'react';

export default function AppWrapper() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const t = await getToken();
      setToken(t);
      setLoading(false);
    };

    function applyPreferencesToCSS() {
      const root = document.documentElement;
      root.style.setProperty('--background-color', '#000B3E');
      root.style.setProperty('--button-color', '#374680');
      root.style.setProperty('--extra-color', '#142671');
      root.style.setProperty('--font-one', `Baloo 2', sans-serif`);
      root.style.setProperty('--font-one-size', `45px`);
      root.style.setProperty('--font-one-spacing', `0.8px`);
      root.style.setProperty('--font-two', `'Lexend Deca', sans-serif`);
      root.style.setProperty('--font-two-size', `16px`);
      root.style.setProperty('--font-two-spacing', `0.8px`);
      root.style.setProperty('--text-color', '#fff');
    }

    applyPreferencesToCSS();
    checkToken();
  }, []);

  return (
    <>
      <ScrollBar />
      {loading === true ? (
        <Loading />
      ) : token == null ? (
        <Outlet />
      ) : (
        <Navigate to="/assistente/chat" replace />
      )}
    </>
  );
}
