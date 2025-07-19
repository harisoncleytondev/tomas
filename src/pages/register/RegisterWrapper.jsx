import { Outlet } from "react-router-dom"
import { RegisterProvider } from "../../contexts/RegisterContext.jsx"

export default function RegisterWrapper() {
    return (
        <RegisterProvider>
            <Outlet/>
        </RegisterProvider>
    );
}