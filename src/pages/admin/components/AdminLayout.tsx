import { Outlet, Link, useNavigate } from 'react-router-dom'
import { authUtils } from '../utils/auth'

export default function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    authUtils.logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">🏨 Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1">Paradeep Online</p>
        </div>

        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl">📊</span>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/theme"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl">🎨</span>
            <span>Theme Settings</span>
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl">📦</span>
            <span>Products</span>
          </Link>

          <Link
            to="/admin/services"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl">🔧</span>
            <span>Services</span>
          </Link>

          <Link
            to="/admin/blog"
            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl">📝</span>
            <span>Blog Posts</span>
          </Link>

          <hr className="my-6 border-gray-800" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-3 text-red-400 hover:bg-gray-800 transition-colors text-left"
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-semibold">Admin</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
