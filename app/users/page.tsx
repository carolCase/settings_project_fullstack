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
  const imageLibrary = [
    "/predator.jpg",
    "/alien.jpg",
    "/terminator.jpg",
    "/subzero.jpg",
    "/reptile.jpeg",
    "/kitana.jpg",
    "/raiden.jpg",
  ]

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
    if (newUser.name.length < 2 || newUser.name.length > 16) {
      alert("Name must be between 2 and 16 characters")
      return
    }

    if (newUser.password.length < 3 || newUser.password.length > 6) {
      alert("Password must be between 3 to 6 characters")
    }

    const randomImage =
      imageLibrary[Math.floor(Math.random() * imageLibrary.length)]
    const userWithAvatar = {
      ...newUser,
      avatar: newUser.avatar || randomImage,
    }

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userWithAvatar),
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

  const handleDeleteUser = async (id: number) => {
    const targetUser = users.find((u) => u.id === id)
    if (!targetUser) return

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${targetUser.name}? This action cannot be undone.`
    )
    if (!confirmDelete) return

    try {
      const response = await fetch("http://localhost:8080/api/users/${id}", {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete user, please try again")
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
      console.log("User ${targetUser.name} has been deleted.")
      alert("User ${targetUser.name} has been successsfully deleted.")
    } catch (error) {
      console.error("Error deleting user:", error)
      alert(
        "An error occurred while deleting the user, please try again later."
      )
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
          Add House Users
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg text-gray-600 bg-gray-300 shadow-lg "
          />
          <input
            type="text"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-lg text-gray-600 bg-gray-300 shadow-lg "
          />
          <button
            onClick={handleCreateUser}
            className="btn glass mt-4 w-45 bg-cyan-950 text-white py-2 px-4 rounded-lg hover:bg-cyan-700"
          >
            Create New User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-slate-100 p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <Image
                src={user.avatar || "/predator.jpg"}
                alt={user.name ? `${user.name}'s avatar` : "Default avatar"}
                width={100}
                height={100}
                className="rounded-full mb-4"
              />
              <h3 className="text-lg font-medium text-gray-700">{user.name}</h3>
              <button
                onClick={() => handleSetAdmin(user.id)}
                className={`mt-4 py-2 px-4 rounded ${
                  user.isAdmin ? "bg-gray-900" : "bg-cyan-800"
                } text-white`}
              >
                {user.isAdmin ? "Remove Admin" : "Make Admin"}
              </button>
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
