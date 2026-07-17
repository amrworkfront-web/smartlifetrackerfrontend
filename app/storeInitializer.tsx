"use client"

import { useEffect } from "react"
import { useAppDispatch } from "./store/hook"
import { setUser } from "./store/authSlice"

export default function StoreInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")

      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        const parsed = JSON.parse(storedUser)
        if (parsed && typeof parsed === "object") {
          dispatch(setUser(parsed))
        } else {
          localStorage.removeItem("user")
        }
      } else {
        localStorage.removeItem("user")
      }
    } catch {
      localStorage.removeItem("user")
    }
  }, [dispatch])

  return null
}
