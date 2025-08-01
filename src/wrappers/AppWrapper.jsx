/* REACT ROUTER DOM */
import { Outlet, Navigate } from 'react-router-dom';

/* REACT */
import { getToken } from '../utils/auth.js';

/* COMPONENTS */
import Footer from '../components/footer/index.jsx';
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
      <Footer />
    </>
  );
}
