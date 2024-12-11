import Link from "next/link"
import { MdOutlineSettingsSuggest } from "react-icons/md"

export default function NavBar() {
  return (
    <nav className="flex space-x-6 fixed border-b mb-5 px-5 w-screen h-20 shadow-xl items-center bg-gray-800 z-50">
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
            <Link href="/settings1">Settings 1</Link>
          </li>
          <li>
            <Link href="/settings2">Settings 2</Link>
          </li>
        </ul>
      </div>

      <ul className="flex space-x-6">
        <li>
          <Link
            className="text-slate-300 hover:text-white text-xl"
            href="/user"
          >
            User
          </Link>
        </li>
        <li>
          <Link
            className="text-slate-300 hover:text-white text-xl"
            href="/settings_dashboard"
          >
            Settings Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  )
}
