import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImageUpload from '../../../components/ImageUpload'
import SimpleTextEditor from '../../../components/SimpleTextEditor'

interface Category {
  id: number
  category_name: string
}

export default function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category_id: '',
    author_name: 'Admin',
    featured_image_url: '',
    youtube_url: '',
    content: '',
    excerpt: '',
    is_published: false,
    is_featured: false,
    tags: '',
    seo_title: '',
    seo_description: ''
  })

  useEffect(() => {
    fetchCategories()
    if (isEdit) {
      fetchBlogPost()
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/blog-categories')
      const data = await res.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const fetchBlogPost = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/blog/${id}`)
      const data = await res.json()
      if (data.success) {
        setFormData(data.data)
      }
    } catch (err) {
      console.error('Error fetching blog post:', err)
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
        ? `http://localhost:5000/api/admin/blog/${id}`
        : 'http://localhost:5000/api/admin/blog'
      
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        alert(`✓ Blog post ${isEdit ? 'updated' : 'created'} successfully!`)
        navigate('/admin/blog')
      } else {
        alert('❌ Failed to save blog post: ' + (data.message || 'Unknown error'))
      }
    } catch (err) {
      alert('❌ Error saving blog post: ' + String(err))
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const autoFillSEO = () => {
    if (!formData.seo_title) {
      setFormData(prev => ({
        ...prev,
        seo_title: prev.title
      }))
    }
    if (!formData.seo_description && formData.excerpt) {
      setFormData(prev => ({
        ...prev,
        seo_description: prev.excerpt
      }))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <button
          type="button"
          onClick={() => navigate('/admin/blog')}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          ← Back to Blog List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-5xl">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter an engaging title for your blog post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
            />
            {formData.title && (
              <p className="text-xs text-gray-500 mt-1">
                Slug: <span className="font-mono">{generateSlug(formData.title)}</span>
              </p>
            )}
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Author Name
              </label>
              <input
                type="text"
                name="author_name"
                value={formData.author_name}
                onChange={handleChange}
                placeholder="Author name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt (Short Summary)
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              maxLength={200}
              placeholder="A brief summary that appears in blog listings and social media shares"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.excerpt.length}/200 characters
            </p>
          </div>

          {/* Featured Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image
            </label>
            <ImageUpload
              currentImageUrl={formData.featured_image_url}
              onImageUploaded={(url) => setFormData({ ...formData, featured_image_url: url })}
              uploadType="blog"
            />
            <div className="mt-2">
              <label className="block text-xs text-gray-600 mb-1">Or enter image URL manually:</label>
              <input
                type="text"
                name="featured_image_url"
                value={formData.featured_image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* YouTube URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              YouTube Video URL (Optional)
            </label>
            <input
              type="text"
              name="youtube_url"
              value={formData.youtube_url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <span>🎬</span>
              <span>Paste a YouTube URL to embed a video in your blog post</span>
            </p>
            {formData.youtube_url && (
              <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200 text-xs text-blue-700">
                ✓ Video will be embedded in the blog post
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content *
            </label>
            <SimpleTextEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Write your blog post content here... Use **bold**, *italic*, ## Heading, - lists, [links](url)"
              height="500px"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Use markdown formatting for better content styling
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="technology, tutorial, guide, tips"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Add relevant tags separated by commas for better discoverability
            </p>
          </div>

          {/* Publishing Options */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Publishing Options</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <div>
                  <span className="text-sm font-semibold text-gray-900">📢 Publish Immediately</span>
                  <p className="text-xs text-gray-600">Make this post visible to the public</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-purple-600"
                />
                <div>
                  <span className="text-sm font-semibold text-gray-900">⭐ Featured Post</span>
                  <p className="text-xs text-gray-600">Display this post prominently on the blog page</p>
                </div>
              </label>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span>🔍</span>
                <span>SEO Settings (Optional)</span>
              </h3>
              <button
                type="button"
                onClick={autoFillSEO}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Auto-fill from content
              </button>
            </div>

            <div className="space-y-4">
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
                  placeholder="Optimized title for search engines"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    Used in search results and social media shares
                  </p>
                  <p className={`text-xs ${formData.seo_title.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                    {formData.seo_title.length}/60
                  </p>
                </div>
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
                  placeholder="Brief description that appears in search results"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    Shown in Google search results under the title
                  </p>
                  <p className={`text-xs ${formData.seo_description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                    {formData.seo_description.length}/160
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                <span>Saving...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>{isEdit ? '💾' : '➕'}</span>
                <span>{isEdit ? 'Update Blog Post' : 'Create Blog Post'}</span>
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            disabled={loading}
            className="px-8 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 font-semibold py-4 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>

        {/* Save as Draft hint */}
        {!formData.is_published && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              💡 <strong>Tip:</strong> This post will be saved as a draft. Check "Publish Immediately" to make it visible to the public.
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
