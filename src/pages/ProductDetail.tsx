import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

interface Product {
  id: number
  product_name: string
  product_slug: string
  product_description: string
  product_image_url: string
  display_price: number
  original_price: number
  stock_status: string
  specifications: any
  show_call_button: boolean
  show_whatsapp_button: boolean
  show_enquiry_form: boolean
  is_featured: boolean
  badge: string | null
  seo_title: string
  seo_description: string
  seo_keywords: string
  views_count: number
  category_id: number
  category_name?: string
  related_products: any[]
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState('')

  useEffect(() => {
    console.log('🔍 Loading product with slug:', slug) // DEBUG
    fetchProduct()
    window.scrollTo(0, 0)
  }, [slug])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      console.log('📡 Fetching:', `http://localhost:5000/api/products/${slug}`) // DEBUG
      const res = await fetch(`http://localhost:5000/api/products/${slug}`)
      const data = await res.json()
      console.log('📦 API Response:', data) // DEBUG
      
      if (data.success) {
        setProduct(data.data)
        setMainImage(getImageUrl(data.data.product_image_url))
        console.log('✅ Product loaded:', data.data.product_name) // DEBUG
      } else {
        console.error('❌ Product not found:', data.message)
      }
    } catch (err) {
      console.error('❌ Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (url: string | null | undefined) => {
    return url && url.trim() !== '' 
      ? url 
      : 'https://via.placeholder.com/600x600/3B82F6/FFFFFF?text=Product+Image'
  }

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return (
          <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            In Stock
          </span>
        )
      case 'out_of_stock':
        return (
          <span className="px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Out of Stock
          </span>
        )
      case 'limited':
        return (
          <span className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            Limited Stock
          </span>
        )
      default:
        return (
          <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
            Available
          </span>
        )
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
      <div className={`${b.bg} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg inline-flex items-center gap-2`}>
        <span className="text-lg">{b.icon}</span>
        <span>{b.text}</span>
      </div>
    )
  }

  const calculateDiscount = (original: number, display: number) => {
    if (!original || original <= display) return 0
    return Math.round(((original - display) / original) * 100)
  }

  const parseSpecifications = (specs: any) => {
    try {
      if (typeof specs === 'string') {
        return JSON.parse(specs)
      }
      return specs
    } catch (e) {
      return []
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6">😕</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ← Browse All Products
          </Link>
        </div>
      </div>
    )
  }

  const discount = calculateDiscount(product.original_price, product.display_price)
  const specifications = parseSpecifications(product.specifications)

  return (
    <>
      {/* SEO Head */}
      <SEOHead
        title={product.seo_title || product.product_name}
        description={product.seo_description || product.product_description}
        keywords={product.seo_keywords}
        image={product.product_image_url}
        type="product"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate">{product.product_name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden relative group">
                {getBadge(product.badge) && (
                  <div className="absolute top-4 left-4 z-10">
                    {getBadge(product.badge)}
                  </div>
                )}
                {product.is_featured && (
                  <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Featured
                  </div>
                )}
                <img
                  src={mainImage}
                  alt={product.product_name}
                  className="w-full h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600/3B82F6/FFFFFF?text=Product+Image'
                  }}
                />
              </div>

              {/* Thumbnail Images (if you add more images later) */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <img
                      src={product.product_image_url}
                      alt=""
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.product_name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span>4.5</span>
                  </span>
                  <span>·</span>
                  <span>{product.views_count || 0} views</span>
                </div>
              </div>

              {/* Stock Status */}
              <div>{getStockBadge(product.stock_status)}</div>

              {/* Price */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-blue-600">
                    ₹{product.display_price.toLocaleString('en-IN')}
                  </span>
                  {product.original_price && product.original_price > product.display_price && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        ₹{product.original_price.toLocaleString('en-IN')}
                      </span>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                {product.original_price && product.original_price > product.display_price && (
                  <p className="text-sm text-green-700 font-semibold">
                    You save: ₹{(product.original_price - product.display_price).toLocaleString('en-IN')}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span>📋</span>
                  <span>Description</span>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.product_description || 'No description available for this product.'}
                </p>
              </div>

              {/* Specifications */}
              {specifications && specifications.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>⚙️</span>
                    <span>Specifications</span>
                  </h2>
                  <div className="space-y-2">
                    {specifications.map((spec: any, idx: number) => (
                      <div key={idx} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                        <span className="text-gray-600 font-medium">{spec.label}</span>
                        <span className="text-gray-900 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="sticky bottom-4 bg-white rounded-lg shadow-xl p-6 border-2 border-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.show_call_button && (
                    <a
                      href="tel:+911234567890"
                      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                      <span className="text-xl">📞</span>
                      <span>Call Now</span>
                    </a>
                  )}
                  {product.show_whatsapp_button && (
                    <a
                      href={`https://wa.me/911234567890?text=Hi, I'm interested in ${encodeURIComponent(product.product_name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                      <span className="text-xl">💬</span>
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
                {product.show_enquiry_form && (
                  <Link
                    to="/contact"
                    className="mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors w-full"
                  >
                    <span className="text-xl">📧</span>
                    <span>Send Enquiry</span>
                  </Link>
                )}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">🚚</div>
                  <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <p className="text-xs text-gray-600 font-medium">Quality Assured</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🔒</div>
                  <p className="text-xs text-gray-600 font-medium">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {product.related_products && product.related_products.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Related Products</h2>
                <Link to="/products" className="text-blue-600 hover:text-blue-700 font-semibold">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {product.related_products.map((related: any) => (
                  <Link
                    key={related.id}
                    to={`/products/${related.product_slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={getImageUrl(related.product_image_url)}
                        alt={related.product_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Product'
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {related.product_name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-600">
                          ₹{related.display_price}
                        </span>
                        {related.original_price && related.original_price > related.display_price && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{related.original_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
