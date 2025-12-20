import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface BlogPost {
  id: number
  title: string
  slug: string
  author_name: string
  featured_image_url: string
  content: string
  published_date: string
  views_count: number
  tags: string
  related_posts: any[]
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/blog/${slug}`)
      const data = await res.json()
      if (data.success) {
        setPost(data.data)
      }
    } catch (err) {
      console.error('Error fetching blog post:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 mt-4">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-xl">👤</span>
              <span>{post.author_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <span>{formatDate(post.published_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">👁️</span>
              <span>{post.views_count} views</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.split(',').map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {post.related_posts && post.related_posts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.related_posts.map((related: any) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {related.featured_image_url && (
                    <img src={related.featured_image_url} alt={related.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{related.title}</h3>
                    <p className="text-sm text-gray-600">{formatDate(related.published_date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
