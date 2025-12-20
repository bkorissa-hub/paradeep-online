import { useEffect, useState } from 'react'
import { apiClient } from '../lib/apiClient'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  useEffect(() => {
    fetchData()
  }, [selectedCategory])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [servicesRes, categoriesRes] = await Promise.all([
        apiClient.getServices({ category_id: selectedCategory || undefined }),
        apiClient.getServiceCategories()
      ])

      if (servicesRes.success && servicesRes.data) {
        setServices(servicesRes.data)
      } else {
        setError(servicesRes.message || 'Failed to fetch services')
      }

      if (categoriesRes.success && categoriesRes.data) {
        setCategories(categoriesRes.data)
      }
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm mb-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="text-gray-600 mt-2">Professional services tailored to your needs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Category Filter */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
            }`}
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
              }`}
            >
              {cat.category_name}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 mt-4">Loading services...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">⚠️ {error}</p>
          </div>
        )}

        {!loading && services.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found</p>
          </div>
        )}

        {!loading && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                {service.service_image_url && (
                  <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img
                      src={service.service_image_url}
                      alt={service.service_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.service_name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
