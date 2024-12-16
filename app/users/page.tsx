"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface User {
  id: number
  name: string
  password: string
  avatar: string
  isAdmin: boolean
}

export default function User() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
    avatar: "",
    isAdmin: false,
  })

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err))
  }, [])

  const handleCreateUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`)
      const createdUser = await response.json()
      setUsers([...users, createdUser])
      setNewUser({ name: "", password: "", avatar: "", isAdmin: false })
    } catch (err) {
      console.error("Error during user creation:", err)
    }
  }

  const handleSetAdmin = async (id: number) => {
    const targetUser = users.find((u) => u.id === id)
    if (!targetUser) return

    try {
      const updatedAdminStatus = !targetUser.isAdmin

      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: updatedAdminStatus }),
      })
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`)

      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, isAdmin: updatedAdminStatus } : user
        )
      )
    } catch (err) {
      console.error("Error updating admin status:", err)
    }
  }

  return (
    <div className="pt-20">
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-medium text-gray-600 mb-4">
          Create New User
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border rounded text-black bg-gray-300"
          />
          <input
            type="text"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="p-2 border rounded text-black bg-gray-300"
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={newUser.avatar}
            onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
            className="p-2 border rounded text-black bg-gray-300"
          />
          <button
            onClick={handleCreateUser}
            className="btn glass mt-4 bg-cyan-950 text-white py-2 px-4 rounded hover:bg-blue-900"
          >
            Create User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <Image
                src={user.avatar || "/predator.jpg"}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full mb-4"
              />
              <h3 className="text-lg font-medium">{user.name}</h3>
              <button
                onClick={() => handleSetAdmin(user.id)}
                className={`mt-4 py-2 px-4 rounded ${
                  user.isAdmin ? "bg-red-800" : "bg-green-500"
                } text-white`}
              >
                {user.isAdmin ? "Nullify Admin" : "Make Admin"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
