/* REACT ROUTER DOM */
import { Outlet, Navigate } from "react-router-dom"

/* REACT */
import { useEffect } from "react"

/* UTILS */
import { getToken, getPayload } from "../utils/auth.js"
import { applyPreferencesToCSS } from "../utils/costumization.jsx"

export default function ProtectRouterWrapper() {

  useEffect(() => {
    applyPreferencesToCSS(getPayload().preferences);
  }, [])
  return (
    <div>
        { getToken() != null ? <Outlet/> : <Navigate to='/criar-conta' replace/> }
    </div>
  )
}