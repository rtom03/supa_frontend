import Link from "next/link";

export default function MobileNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-yellow-400 shadow-md p-4 flex items-center justify-between sm:hidden">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">Supabetos</div>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <Link href="/login">
          <button className="text-sm px-4 py-2 border rounded-md text-gray-700">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="text-sm px-4 py-2 bg-yellow-500 text-white rounded-md">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
}
