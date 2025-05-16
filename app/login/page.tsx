"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    setError(null)

    if (!credentials.email || !credentials.password) {
      setError("Both fields are required.")
      return
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: credentials.email,
          password: credentials.password,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Login failed.")

      localStorage.setItem("token", data.token)

      router.push("/devices")
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError("Unknown error")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/30 text-white space-y-6">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="bg-white/30 placeholder-white text-white border border-white/30"
          />
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="bg-white/30 placeholder-white text-white border border-white/30"
          />

          <Button
            onClick={handleLogin}
            className="w-full bg-white text-slate-900 hover:bg-slate-100"
          >
            Login
          </Button>

          <p className="text-center text-sm text-white/80">
            Don’t have an account?{" "}
            <a href="/register" className="underline text-white">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
