import { useEffect, useState } from 'react'
import { apiClient } from '../../../lib/apiClient'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalServices: 0,
    totalBlogPosts: 0,
    totalEnquiries: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [products, services, blog] = await Promise.all([
        apiClient.getProducts(),
        apiClient.getServices(),
        apiClient.getBlogPosts()
      ])

      setStats({
        totalProducts: products.data?.length || 0,
        totalServices: services.data?.length || 0,
        totalBlogPosts: blog.data?.length || 0,
        totalEnquiries: 0
      })
    } catch (err) {
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 mt-4">Loading dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Products Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          {/* Services Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Services</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalServices}</p>
              </div>
              <div className="text-4xl">🔧</div>
            </div>
          </div>

          {/* Blog Posts Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Blog Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBlogPosts}</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          {/* Enquiries Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Enquiries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEnquiries}</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/admin/products" className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors">
            ➕ Add New Product
          </a>
          <a href="/admin/services" className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors">
            ➕ Add New Service
          </a>
          <a href="/admin/blog" className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors">
            ➕ Write Blog Post
          </a>
          <a href="/admin/theme" className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg transition-colors">
            🎨 Edit Theme
          </a>
        </div>
      </div>
    </div>
  )
}
