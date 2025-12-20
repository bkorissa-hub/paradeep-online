import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Category {
  id: number
  category_name: string
}

export default function ServiceForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    service_name: '',
    category_id: '',
    description: '',
    detailed_description: '',
    base_rate: '',
    rate_unit: 'per_hour',
    service_image_url: '',
    show_call_button: true,
    show_whatsapp_button: true,
    show_booking_button: true,
    is_featured: false,
    seo_title: '',
    seo_description: ''
  })

  useEffect(() => {
    fetchCategories()
    if (isEdit) {
      fetchService()
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/service-categories')
      const data = await res.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const fetchService = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/services/${id}`)
      const data = await res.json()
      if (data.success) {
        setFormData(data.data)
      }
    } catch (err) {
      console.error('Error fetching service:', err)
    }
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEdit 
        ? `http://localhost:5000/api/admin/services/${id}`
        : 'http://localhost:5000/api/admin/services'
      
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        alert(`✓ Service ${isEdit ? 'updated' : 'created'} successfully!`)
        navigate('/admin/services')
      } else {
        alert('❌ Failed to save service')
      }
    } catch (err) {
      alert('❌ Error saving service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isEdit ? 'Edit Service' : 'Create New Service'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name *</label>
            <input
              type="text"
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.category_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
            <textarea
              name="detailed_description"
              value={formData.detailed_description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Base Rate *</label>
              <input
                type="number"
                name="base_rate"
                value={formData.base_rate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rate Unit</label>
              <select
                name="rate_unit"
                value={formData.rate_unit}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="per_hour">Per Hour</option>
                <option value="per_day">Per Day</option>
                <option value="per_project">Per Project</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Image URL</label>
            <input
              type="text"
              name="service_image_url"
              value={formData.service_image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="show_call_button"
                checked={formData.show_call_button}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Show Call Button</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="show_whatsapp_button"
                checked={formData.show_whatsapp_button}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Show WhatsApp Button</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="show_booking_button"
                checked={formData.show_booking_button}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Show Booking Button</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Featured Service</span>
            </label>
          </div>

          <hr className="my-6" />
          <h3 className="text-lg font-semibold text-gray-800">SEO Settings</h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Title</label>
            <input
              type="text"
              name="seo_title"
              value={formData.seo_title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Description</label>
            <textarea
              name="seo_description"
              value={formData.seo_description}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg"
          >
            {loading ? 'Saving...' : isEdit ? '💾 Update Service' : '➕ Create Service'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
