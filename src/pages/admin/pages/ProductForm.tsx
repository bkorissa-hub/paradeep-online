import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Category {
  id: number
  category_name: string
}

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    product_name: '',
    category_id: '',
    product_description: '',
    display_price: '',
    original_price: '',
    product_image_url: '',
    specifications: '',
    stock_status: 'in_stock',
    show_call_button: true,
    show_whatsapp_button: true,
    show_enquiry_form: true,
    is_featured: false,
    badge: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: ''
  })

  useEffect(() => {
    fetchCategories()
    if (isEdit) {
      fetchProduct()
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/product-categories')
      const data = await res.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/${id}`)
      const data = await res.json()
      if (data.success) {
        setFormData({
          ...data.data,
          specifications: typeof data.data.specifications === 'string' 
            ? data.data.specifications 
            : JSON.stringify(data.data.specifications || [])
        })
      }
    } catch (err) {
      console.error('Error fetching product:', err)
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
        ? `http://localhost:5000/api/admin/products/${id}`
        : 'http://localhost:5000/api/admin/products'
      
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        alert(`✓ Product ${isEdit ? 'updated' : 'created'} successfully!`)
        navigate('/admin/products')
      } else {
        alert('❌ Failed to save product: ' + (data.message || 'Unknown error'))
      }
    } catch (err) {
      alert('❌ Error saving product: ' + String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isEdit ? 'Edit Product' : 'Create New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 max-w-3xl">
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
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

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              name="product_description"
              value={formData.product_description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your product..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Display Price (₹) *
              </label>
              <input
                type="number"
                name="display_price"
                value={formData.display_price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="999.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="original_price"
                value={formData.original_price}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="1299.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">For showing discount/strikethrough</p>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image URL
            </label>
            <input
              type="text"
              name="product_image_url"
              value={formData.product_image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {formData.product_image_url && (
              <div className="mt-3">
                <img 
                  src={formData.product_image_url} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+URL'
                  }}
                />
              </div>
            )}
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specifications (JSON format)
            </label>
            <textarea
              name="specifications"
              value={formData.specifications}
              onChange={handleChange}
              rows={4}
              placeholder='[{"label":"Brand","value":"Samsung"},{"label":"Color","value":"Black"}]'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter as JSON array or leave empty
            </p>
          </div>

          {/* Stock Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stock Status
            </label>
            <select
              name="stock_status"
              value={formData.stock_status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="limited">Limited Stock</option>
            </select>
          </div>

          {/* Badge Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Badge (Optional)
            </label>
            <select
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">No Badge</option>
              <option value="hot">🔥 Hot</option>
              <option value="new">✨ New</option>
              <option value="bestseller">⭐ Best Seller</option>
              <option value="sale">💰 Sale</option>
              <option value="trending">📈 Trending</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select a badge to highlight this product
            </p>
          </div>

          {/* Checkboxes */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="show_call_button"
                checked={formData.show_call_button}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Show Call Button on product page</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="show_whatsapp_button"
                checked={formData.show_whatsapp_button}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Show WhatsApp Button</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="show_enquiry_form"
                checked={formData.show_enquiry_form}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">Show Enquiry Form</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700 font-semibold">⭐ Featured Product (show on homepage)</span>
            </label>
          </div>

          {/* SEO Fields */}
          <hr className="my-6" />
          <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Settings (Optional)</h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SEO Title
            </label>
            <input
              type="text"
              name="seo_title"
              value={formData.seo_title}
              onChange={handleChange}
              maxLength={60}
              placeholder="Product SEO title (max 60 chars)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.seo_title.length}/60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SEO Description
            </label>
            <textarea
              name="seo_description"
              value={formData.seo_description}
              onChange={handleChange}
              rows={2}
              maxLength={160}
              placeholder="Brief description for search engines (max 160 chars)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.seo_description.length}/160 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SEO Keywords
            </label>
            <input
              type="text"
              name="seo_keywords"
              value={formData.seo_keywords}
              onChange={handleChange}
              placeholder="keyword1, keyword2, keyword3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Comma-separated keywords for SEO
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            {loading ? 'Saving...' : isEdit ? '💾 Update Product' : '➕ Create Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
