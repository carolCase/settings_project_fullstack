import Link from "next/link"
import { MdOutlineSettingsSuggest } from "react-icons/md"
//
export default function NavBar() {
  return (
    <nav className="flex space-x-6 fixed border-b mb-5  px-5 w-screen h-20 shadow-xl items-center bg-gray-800 z-50">
      <Link className="text-slate-300 hover:text-white text-3xl" href="/">
        <MdOutlineSettingsSuggest />
      </Link>
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
