"use client"

import { useEffect } from "react"
import { useAppDispatch } from "./store/hook"
import { setUser } from "./store/authSlice"

export default function StoreInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)))
    }
  }, [dispatch])

  return null
}
