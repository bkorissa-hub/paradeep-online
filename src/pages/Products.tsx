import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Product {
  id: number
  product_name: string
  product_slug: string
  product_description: string
  product_image_url: string
  display_price: number
  original_price: number
  stock_status: string
  is_featured: boolean
  badge: string | null
  views_count: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products')
      const data = await res.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

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

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || p.category_id?.toString() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">✓ In Stock</span>
      case 'out_of_stock':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">✗ Out of Stock</span>
      case 'limited':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">⚠ Limited</span>
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">In Stock</span>
    }
  }

  const getBadge = (badge: string | null) => {
    if (!badge) return null
    
    const badges: any = {
      hot: { icon: '🔥', text: 'Hot', bg: 'bg-red-500' },
      new: { icon: '✨', text: 'New', bg: 'bg-blue-500' },
      bestseller: { icon: '⭐', text: 'Best Seller', bg: 'bg-yellow-500' },
      sale: { icon: '💰', text: 'Sale', bg: 'bg-green-500' },
      trending: { icon: '📈', text: 'Trending', bg: 'bg-purple-500' }
    }
    
    const b = badges[badge]
    if (!b) return null
    
    return (
      <div className={`absolute top-3 left-3 ${b.bg} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10`}>
        <span>{b.icon}</span>
        <span>{b.text}</span>
      </div>
    )
  }

  const getImageUrl = (url: string | null | undefined) => {
    return url && url.trim() !== '' 
      ? url 
      : 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Product+Image'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-blue-100">Browse our premium selection of quality products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.category_name}</option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-lg">No products found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image with Badge */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {getBadge(product.badge)}
                  <img
                    src={getImageUrl(product.product_image_url)}
                    alt={product.product_name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Product+Image'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{product.product_name}</h3>
                    {product.is_featured && <span className="text-2xl ml-2">⭐</span>}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {product.product_description || 'No description available'}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">₹{product.display_price}</span>
                      {product.original_price && product.original_price > product.display_price && (
                        <span className="text-sm text-gray-400 line-through ml-2">₹{product.original_price}</span>
                      )}
                    </div>
                    {getStockBadge(product.stock_status)}
                  </div>

                  <Link
                    to={`/products/${product.product_slug}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
