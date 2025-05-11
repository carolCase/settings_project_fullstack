"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const router = useRouter()

  const handleLogin = async () => {
    setError(null)

    if (!credentials.username || !credentials.password) {
      setError("Both fields are required.")
      return
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Login failed.")
      }

      router.push("/devices")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white opacity-85 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center text-slate-500">
          Login
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />

          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
