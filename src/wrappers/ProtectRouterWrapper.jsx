/* REACT ROUTER DOM */
import { Outlet, Navigate } from 'react-router-dom';

/* REACT */
import { useEffect, useState } from 'react';

/* UTILS */
import { getToken } from '../utils/auth.js';

export default function ProtectRouterWrapper() {
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
    <div>
      {token != null ? <Outlet /> : <Navigate to="/criar-conta" replace />}
    </div>
  );
}
