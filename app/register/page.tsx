"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRegister = async () => {
    setError(null)

    if (!form.email || !form.password) {
      setError("Email and password are required.")
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Registration failed.")
      }

      router.push("/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/30 text-white space-y-6">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name (optional)"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="bg-white/30 placeholder-white text-white border border-white/30"
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-white/30 placeholder-white text-white border border-white/30"
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="bg-white/30 placeholder-white text-white border border-white/30"
          />

          <Button
            onClick={handleRegister}
            className="w-full bg-white text-slate-900 hover:bg-slate-100"
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-white/80">
            Already have an account?{" "}
            <a href="/login" className="underline text-white">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
