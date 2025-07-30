/* REACT ROUTER DOM */
import { Outlet, Navigate } from "react-router-dom"

/* REACT */
import { useEffect } from "react"

/* UTILS */
import { getToken, getPayload } from "../utils/auth.js"

export default function ProtectRouterWrapper() {
  return (
    <div>
        { getToken() != null ? <Outlet/> : <Navigate to='/criar-conta' replace/> }
    </div>
  )
}