"use client"
import { useState } from "react"

export default function Devices() {
  const [lightBrightness, setLightBrightness] = useState(50)
  const [temperature, setTemperature] = useState(22)
  const [volume, setVolume] = useState(30)
  const [doorLocked, setDoorLocked] = useState(false)
  const [securityCamera, setSecurityCamera] = useState(false)
  const [curtainOpen, setCurtainOpen] = useState(50)

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-10 mt-10 text-gray-900">
        My Home Devices
      </h1>

      <div className="max-w-fit mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/*Lights*/}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl text-gray-500 font-medium mb-4">Lights</h3>
            <label
              htmlFor="light-brightness"
              className="block mb-2 text-gray-400"
            >
              Brightness: {lightBrightness}%
            </label>
            <input
              type="range"
              id="light-brightness"
              min="0"
              max="100"
              value={lightBrightness}
              onChange={(e) => setLightBrightness(parseInt(e.target.value))}
              className="w-full h-2 bg-cyan-950 rounded-full"
            />
          </div>

          {/* Temperature */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl  text-gray-500 font-medium mb-4">
              Temperature
            </h3>
            <label htmlFor="temperature" className="block mb-2 text-gray-400">
              Temperature: {temperature}°C
            </label>
            <input
              type="number"
              id="temperature"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full p-2 border border-cyan-950 rounded"
            />
          </div>

          {/* Speaker */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl   text-gray-500 font-medium mb-4">
              Speaker
            </h3>
            <label htmlFor="volume" className="block mb-2 text-cyan-950">
              Volume: {volume}%
            </label>
            <input
              type="range"
              id="volume"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full h-2 bg-cyan-950 rounded-full"
            />
          </div>

          {/* Door Lock */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl  text-gray-500 font-medium mb-4">
              Door Lock
            </h3>
            <label htmlFor="door-lock" className="block mb-2 text-gray-400">
              Locked: {doorLocked ? "Yes" : "No"}
            </label>
            <button
              onClick={() => setDoorLocked(!doorLocked)}
              className={`w-full py-2 text-white rounded ${
                doorLocked ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {doorLocked ? "Unlock" : "Lock"}
            </button>
          </div>

          {/* Curtains */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl  text-gray-500 font-medium mb-4">
              Curtains
            </h3>
            <label htmlFor="curtain-open" className="block mb-2 text-gray-400">
              Open: {curtainOpen}%
            </label>
            <input
              type="range"
              id="curtain-open"
              min="0"
              max="100"
              value={curtainOpen}
              onChange={(e) => setCurtainOpen(parseInt(e.target.value))}
              className="w-full h-2 bg-cyan-950 rounded-full"
            />
          </div>

          {/* Security Camera */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl  text-gray-500 font-medium mb-4">
              Security Camera
            </h3>
            <label htmlFor="camera" className="block mb-2 text-gray-400">
              Security Camera: {securityCamera ? "On" : "Off"}
            </label>
            <button
              onClick={() => setSecurityCamera(!securityCamera)}
              className={`w-full py-2 text-white rounded ${
                securityCamera ? "bg-red-500" : "bg-gray-500"
              }`}
            >
              {securityCamera ? "Turn Off" : "Turn On"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
