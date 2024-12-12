"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface User {
  id: number
  name: string
  email: string
  avatar: string
  isAdmin: boolean
}

export default function User() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    avatar: "",
    isAdmin: false,
  })

  useEffect(() => {
    fetch("localhost:8000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
  }, [])

  const handleCreateUser = async () => {
    const response = await fetch("localhost:8000/api/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    })

    if (response.ok) {
      const createdUser = await response.json()
      setUsers([...users, createdUser])
      setNewUser({
        name: "",
        email: "",
        avatar: "",
        isAdmin: false,
      })
    }
  }
  const handleSetAdmin = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isAdmin: !user.isAdmin } : user
      )
    )

    fetch("/api/users/${id}", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        isAdmin: !users.find((u) => u.id === id)?.isAdmin,
      }),
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-500 mb-8">
        User Managment
      </h1>
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-medium text-gray-500 mb-4">
          Create New User
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border rounded bg-gray-300"
          />

          <input
            type="text"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border rounded  bg-gray-300"
          />

          <input
            type="text"
            placeholder="Avatar URL"
            value={newUser.avatar}
            onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
            className="p-2 border rounded  bg-gray-300"
          />
          <div>
            <button
              onClick={handleCreateUser}
              className="btn glass mt-4 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-800"
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
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.name}
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <button
                  onClick={() => handleSetAdmin(user.id)}
                  className={
                    'mt-4 py-2 px-4 rounded ${user.isAdmin ? "bg-red-800" : "bg-green-500" } text-white'
                  }
                >
                  {user.isAdmin ? "Nullify Admin" : "Make Admin"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
