import Link from "next/link"
import { MdOutlineSettingsSuggest } from "react-icons/md"
import { FaHome } from "react-icons/fa"

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center fixed border-b glass bg-cyan-800  rounded-xl border mb-5 px-5 w-screen h-20 shadow-md ">
      <div className="flex items-center space-x-6">
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="text-slate-300 hover:text-white text-3xl"
          >
            <MdOutlineSettingsSuggest />
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link href="/devices">Devices</Link>
            </li>
            <li>
              <Link href="/floors">Floors</Link>
            </li>
            <li>
              <Link href="/users">User Managment</Link>
            </li>
          </ul>
        </div>

        <ul className="flex space-x-6">
          <li>
            <Link
              className="text-slate-300 hover:text-white text-xl"
              href="/smarthouses"
            >
              Smart Houses
            </Link>
          </li>
        </ul>
      </div>

      <div className="text-slate-300 hover:text-white text-3xl pl-4">
        <Link href="/">
          <FaHome />
        </Link>
      </div>
    </nav>
  )
}
