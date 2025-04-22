import Link from "next/link"
import { Search } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold uppercase">AllTech</h1>
          </Link>
          <span className="text-xs text-gray-500 ml-2">
            Powered by{" "}
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 inline-flex items-center justify-center">
              L
            </span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/deals" className="text-gray-700 hover:text-gray-900">
            Crazy Deals
          </Link>
          <Link href="/tech" className="text-gray-700 hover:text-gray-900">
            Recommended Tech
          </Link>
          <Link href="/articles" className="text-gray-700 hover:text-gray-900">
            Articles
          </Link>
          <Link href="/subscribe" className="text-gray-700 hover:text-gray-900 flex items-center">
            Subscribe
            <span className="ml-1 bg-red-600 text-white rounded p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-youtube"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </span>
          </Link>
        </nav>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md pl-10 pr-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>
    </header>
  )
}
