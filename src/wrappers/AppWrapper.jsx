/* REACT ROUTER DOM */
import { Outlet, Navigate } from 'react-router-dom';

/* REACT */
import { getToken } from '../utils/auth.js';

export default function AppWrapper() {
  return (
    <>
      {getToken() == null ? <Outlet /> : <Navigate to="/assistente/chat" replace />}
    </>
  );
}
