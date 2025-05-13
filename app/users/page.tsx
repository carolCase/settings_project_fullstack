"use client"

import { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

type Role = "OWNER" | "MEMBER" | "GUEST"

interface User {
  id: number
  email: string
  fullName?: string
  role: Role
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/users", {
          method: "GET",
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch users.")
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError("Could not load users.")
        console.error(err)
      }
    }

    fetchUsers()
  }, [])

  const handleRoleChange = async (userId: number, newRole: Role) => {
    try {
      const res = await fetch(`http://localhost:8080/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      )
    } catch (err) {
      alert("Failed to update role")
      console.error(err)
    }
  }

  return (
    <div className="pt-20 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        User Management
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3"
          >
            <div>
              <p className="font-medium text-slate-700">
                {user.fullName || "No name"}
              </p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>

            <Select
              value={user.role}
              onValueChange={(val: string) =>
                handleRoleChange(user.id, val as Role)
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OWNER">Owner</SelectItem>
                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="GUEST">Guest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  )
}
