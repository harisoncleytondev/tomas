/* REACT ROUTER DOM */
import { Outlet, Navigate } from "react-router-dom"

/* REACT */
import { getToken } from "./utils/auth"

export default function ProtectRouter() {
  return (
    <div>
        { getToken() != null ? <Outlet/> : <Navigate to='/cadastrar' replace/> }
    </div>
  )
}