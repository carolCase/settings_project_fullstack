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
    <div className="pt-20">
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-medium text-gray-600 mb-4">
          Add House User
        </h2>
        <Input
          type="text"
          placeholder="Full Name (optional)"
          value={newUser.fullName}
          onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => {
              setShowErrors(false)
              setNewUser({ ...newUser, email: e.target.value })
            }}
            className={showErrors && !newUser.email ? "border-red-500" : ""}
          />
          <Input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => {
              setShowErrors(false)
              setNewUser({ ...newUser, email: e.target.value })
            }}
            className={showErrors && !newUser.email ? "border-red-500" : ""}
          />
          <Button onClick={handleCreateUser} className="mt-4">
            Create New User
          </Button>
        </div>
      </div>
    </div>
  )
}
