/* REACT ROUTER DOM */
import { Outlet, Navigate } from 'react-router-dom';

/* REACT */
import { getToken } from '../utils/auth.js';

/* COMPONENTS */
import Footer from '../components/footer/index.jsx';
import { ScrollBar } from '../components/scrollbar';

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

  if (loading) {
    //loading
    return null; 
  }

  return (
    <>
      <ScrollBar />
      {token == null ? <Outlet /> : <Navigate to="/assistente/chat" replace />}
      <Footer />
    </>
  );
}
