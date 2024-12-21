"use client"

import { useEffect, useState } from "react"
import type { User } from "@/app/_types/CustomUser"

export default function User() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    username: "",
    password: "",
    role: "",
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/users", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
        })
        if (!res.ok) throw new Error("Failed to fetch users.")
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error("Error fetching users:", err)
      }
    }

    fetchUsers()
  }, [])

  const handleCreateUser = async () => {
    if (!newUser.username || !newUser.password) {
      alert("Username and password are required.")
      return
    }

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are sent
        body: JSON.stringify(newUser),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response from server:", errorText)
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const data = await response.json()
      console.log("User creation successful:", data)
      setUsers((prevUsers) => [...prevUsers, data])
    } catch (error) {
      console.error("Error creating user:", error)
      alert("An error occurred while creating the user. Please try again.")
    }
  }

  const handleDeleteUser = async (userId: number) => {
    const targetUser = users.find((user) => user.id === userId)
    if (!targetUser) return

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${targetUser.username}? This action cannot be undone.`
    )
    if (!confirmDelete) return

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
        credentials: "include", // Ensure cookies/session are included
      })

      if (!response.ok) throw new Error("Failed to delete user.")

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      alert(`User ${targetUser.username} has been successfully deleted.`)
    } catch (err) {
      console.error("Error deleting user:", err)
      alert("An error occurred while deleting the user. Please try again.")
    }
  }

  return (
    <div className="pt-20">
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-medium text-gray-600 mb-4">
          Add House Users
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-lg text-gray-600 bg-gray-300 shadow-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-lg text-gray-600 bg-gray-300 shadow-lg"
          />
          <button
            onClick={handleCreateUser}
            className="btn glass mt-4 w-45 bg-cyan-950 text-white py-2 px-4 rounded-lg hover:bg-cyan-700"
          >
            Create New User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div
              key={`${user.username}-${index}`} // Ensures unique key for each element
              className="bg-slate-100 p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <h3 className="text-lg font-medium text-gray-700">
                {user.username}
              </h3>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="mt-2 py-2 px-4 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
