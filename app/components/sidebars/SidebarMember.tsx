"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const handleLogout = () => {
    document.cookie = "authToken=; Max-Age=0; path=/"

    window.location.href = "/login"
  }

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-50"
      } h-screen flex flex-col bg-white/30 backdrop-blur-md border-r border-white/30 text-white transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-bold text-white">
          {collapsed ? "SH" : "Smart Houses"}
        </span>
        <Button
          className="ml-2 hover:bg-transparent"
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex flex-col space-y-2 px-2">
        <div>
          <Link
            href="/devices"
            className="flex items-center gap-3 p-2 rounded hover:bg-white/10"
          >
            <Home size={20} />
            {!collapsed && <span>Devices</span>}
          </Link>

          {!collapsed && (
            <div className="ml-8 mt-1 text-sm space-y-1 text-white">
              <Link
                href="/devices/living-room"
                className="block hover:underline"
              >
                Living Room
              </Link>
              <Link href="/devices/kitchen" className="block hover:underline">
                Kitchen
              </Link>
              <Link href="/devices/bedroom" className="block hover:underline">
                Bedroom
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Button
        variant="ghost"
        className="w-full text-left px-4 py-2 text-white text-sm "
        onClick={handleLogout}
      >
        Logout
      </Button>

      <div className="mt-auto px-4 py-3 text-xs text-white text-center border-t hover:bg-transparent">
        {collapsed ? (
          <span>SH</span>
        ) : (
          <>
            Smart Houses v1.0.0
            <br />© Castros Inc
          </>
        )}
      </div>
    </div>
  )
}
