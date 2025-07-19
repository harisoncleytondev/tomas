/* REACT ROUTER DOM */
import { Outlet, Navigate } from "react-router-dom"

/* REACT */
import { getToken } from "../utils/auth.js"

export default function ProtectRouterWrapper() {
  return (
    <div>
        { getToken() != null ? <Outlet/> : <Navigate to='/criar-conta' replace/> }
    </div>
  )
}