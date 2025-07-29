/* REACT ROUTER DOM */
import { Outlet, Navigate } from 'react-router-dom';

/* REACT */
import { getToken } from '../utils/auth.js';

/* COMPONENTS */
import Footer from '../components/footer/index.jsx';
import { ScrollBar } from '../components/scrollbar';

export default function AppWrapper() {
  return (
    <>
      <ScrollBar />
      {getToken() == null ? <Outlet /> : <Navigate to="/assistente/chat" replace />}
      <Footer />
    </>
  );
}
