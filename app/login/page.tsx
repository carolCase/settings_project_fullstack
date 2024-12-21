"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    if (error) setError(null)

    if (!credentials.username || !credentials.password) {
      setError("Both username and password are required.")
      return
    }

    try {
      // Create URL encoded body
      const urlEncodedBody = new URLSearchParams({
        username: credentials.username,
        password: credentials.password,
      }).toString()

      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include", // Send cookies with the request
        body: urlEncodedBody,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Login failed. Please try again.")
      }

      // If successful, navigate to devices page
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
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="w-full px-4 py-2 border-gray-300 rounded focus:ring focus:ring-cyan-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full px-4 py-2 border-gray-300 rounded focus:ring focus:ring-cyan-500"
          />
          <button
            onClick={handleLogin}
            className="w-full py-2 px-4 border-lg bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
