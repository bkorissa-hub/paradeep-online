import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface BlogPost {
  id: number
  title: string
  slug: string
  category_name: string
  author_name: string
  featured_image_url: string
  youtube_url: string
  excerpt: string
  published_date: string
  views_count: number
  is_featured: boolean
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/blog')
      const data = await res.json()
      console.log('📦 Blog posts:', data) // DEBUG
      if (data.success) {
        setPosts(data.data)
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (url: string | null | undefined) => {
    if (!url || url.trim() === '') {
      return 'https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=Blog+Post'
    }
    return url
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600">Latest articles and insights</p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No blog posts yet</h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Featured Image */}
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                  <img
                    src={getImageUrl(post.featured_image_url)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450/8B5CF6/FFFFFF?text=Blog+Post'
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {post.is_featured && (
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold shadow-lg">
                        ⭐ Featured
                      </span>
                    )}
                    {post.youtube_url && (
                      <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold shadow-lg">
                        🎬 Video
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  {post.category_name && (
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3">
                      {post.category_name}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{formatDate(post.published_date)}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>👁️</span>
                      <span>{post.views_count || 0} views</span>
                    </span>
                  </div>

                  {/* Read More Button */}
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                    <span>Read Full Article</span>
                    <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
