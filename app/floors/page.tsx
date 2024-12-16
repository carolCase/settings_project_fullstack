"use client"

import Image from "next/image"
import { useState } from "react"

export default function Floors() {
  const [isModalOneOpen, setModalOneOpen] = useState(false)
  const [isModalTwoOpen, setModalTwoOpen] = useState(false)

  return (
    <div className="mt-12 flex justify-items-start space-x-16">
      <Image
        src="/house_floors.jpg"
        alt="House Floors"
        width={500}
        height={500}
        className="rounded-lg shadow-lg"
      />

      <div className="flex flex-col space-y-6 ml-auto">
        <div>
          <button
            onClick={() => setModalOneOpen(true)}
            className="px-4 py-2 bg-cyan-900 hover:bg-cyan-700 text-white rounded-lg shadow"
          >
            First Floor
          </button>
          {isModalOneOpen && (
            <div className="fixed inset-0 bg-cyan-950 bg-opacity-10 flex items-center justify-center z-50">
              <div className="bg-cyan-900 bg-opacity-90 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">First Floor</h2>
                <p>Devices on First Floor:</p>
                <ul className="list-disc pl-5">
                  <li>Lights</li>
                  <li>Temperature</li>
                  <li>Curtains</li>
                  <li>Security Camera</li>
                </ul>
                <button
                  onClick={() => setModalOneOpen(false)}
                  className="mt-4 px-4 py-2 bg-cyan-950 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setModalTwoOpen(true)}
            className="px-4 py-2 bg-cyan-900 hover:bg-cyan-700 text-white rounded-lg shadow"
          >
            Second Floor
          </button>
          {isModalTwoOpen && (
            <div className="fixed inset-0 bg-cyan-950 bg-opacity-10 flex items-center justify-center z-50">
              <div className="bg-cyan-900 bg-opacity-90 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Second Floor</h2>
                <p>Devices on Second Floor:</p>
                <ul className="list-disc pl-5">
                  <li>Lights</li>
                  <li>Temperature</li>
                  <li>Curtains</li>
                  <li>Speaker</li>
                </ul>
                <button
                  onClick={() => setModalTwoOpen(false)}
                  className="mt-4 px-4 py-2 bg-cyan-950 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
