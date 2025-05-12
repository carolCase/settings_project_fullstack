"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/login")
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-slate-500 text-xl">Redirecting to login...</p>
    </div>
  )
}
