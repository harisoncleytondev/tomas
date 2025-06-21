/* REACT ROUTER DOM */
import { Outlet } from "react-router-dom"

/* COMPONENTS */
import Footer from "./components/footer"

export default function App() {
  return (
    <div>
        <Outlet />
        <Footer />
    </div>
  )
}