import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface Service {
  id: number
  service_name: string
  service_slug: string
  description: string
  detailed_description: string
  service_image_url: string
  base_rate: number
  rate_unit: string
  show_call_button: boolean
  show_whatsapp_button: boolean
  show_booking_button: boolean
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchService()
  }, [slug])

  const fetchService = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/services/${slug}`)
      const data = await res.json()
      if (data.success) {
        setService(data.data)
      }
    } catch (err) {
      console.error('Error fetching service:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 mt-4">Loading service...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-blue-600 hover:underline">← Back to Services</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-blue-600">Services</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{service.service_name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Service Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {service.service_image_url ? (
              <img
                src={service.service_image_url}
                alt={service.service_name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-9xl">🔧</span>
              </div>
            )}
          </div>

          {/* Service Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.service_name}</h1>

            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">₹{service.base_rate}</span>
              <span className="text-xl text-gray-600 ml-2">/ {service.rate_unit.replace('_', ' ')}</span>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>

            {service.detailed_description && (
              <div className="bg-white rounded-lg p-6 shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Detailed Information</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{service.detailed_description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {service.show_booking_button && (
                <Link
                  to="/contact"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center transition-colors"
                >
                  📅 Book Now
                </Link>
              )}
              {service.show_call_button && (
                <a
                  href="tel:+911234567890"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg text-center transition-colors"
                >
                  📞 Call Now
                </a>
              )}
              {service.show_whatsapp_button && (
                <a
                  href="https://wa.me/911234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-center transition-colors"
                >
                  💬 WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
