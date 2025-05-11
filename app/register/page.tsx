"use client"

import { useEffect, useState } from "react"
import type { User, NewUser } from "@/app/types/CustomUser"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([])
  const [showErrors, setShowErrors] = useState(false)

  const [newUser, setNewUser] = useState<NewUser>({
    email: "",
    password: "",
    fullName: "",
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/users", {
          method: "GET",
        })
        if (!res.ok) throw new Error("Failed to fetch users.")
        const data = await res.json()
        console.log("Fetched users:", users)
        setUsers(data)
      } catch (err) {
        console.error("Error fetching users:", err)
      }
    }

    fetchUsers()
  }, [])

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.password) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
    console.log(showErrors)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newUser),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to register user.")
      }

      alert("User registered successfully!")
    } catch (error) {
      console.error("Error creating user:", error)
      alert("An error occurred while creating the user.")
    }
  }

  return (
    <div className="flex min-h-screen justify-center px-4 pt-8 pb-8">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/30 text-white space-y-6">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        {showErrors && (
          <p className="text-red-400 text-sm text-center">
            Email and password are required.
          </p>
        )}

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name (optional)"
            value={newUser.fullName}
            onChange={(e) =>
              setNewUser({ ...newUser, fullName: e.target.value })
            }
            className="bg-white/30 placeholder-white text-white border border-white/30"
          />
          <Input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => {
              setShowErrors(false)
              setNewUser({ ...newUser, email: e.target.value })
            }}
            className={`bg-white/30 placeholder-white text-white border ${
              showErrors && !newUser.email
                ? "border-red-500"
                : "border-white/30"
            }`}
          />
          <Input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => {
              setShowErrors(false)
              setNewUser({ ...newUser, password: e.target.value })
            }}
            className={`bg-white/30 placeholder-white text-white border ${
              showErrors && !newUser.password
                ? "border-red-500"
                : "border-white/30"
            }`}
          />

          <Button
            onClick={handleCreateUser}
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
