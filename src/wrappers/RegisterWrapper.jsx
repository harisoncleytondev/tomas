/* REACT ROUTER DOM */
import { Navigate, Outlet } from "react-router-dom"

/* PROVIDER */
import { RegisterProvider } from "../contexts/RegisterContext.jsx"

/* UTILS */
import { getToken } from "../utils/auth.js";

export default function RegisterWrapper() {
    return (
        <RegisterProvider>
            { getToken() == null ? <Outlet/> : <Navigate to='/assistente/chat' replace/> }
        </RegisterProvider>
    );
}