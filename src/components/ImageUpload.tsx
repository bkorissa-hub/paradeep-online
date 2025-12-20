import { useState } from 'react'

interface ImageUploadProps {
  currentImageUrl?: string
  onImageUploaded: (url: string) => void
  uploadType: 'products' | 'services' | 'blog'
}

export default function ImageUpload({ currentImageUrl, onImageUploaded, uploadType }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>(currentImageUrl || '')
  const [error, setError] = useState<string>('')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setError('')
    setUploading(true)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to server
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`http://localhost:5000/api/upload/${uploadType}`, {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (data.success) {
        onImageUploaded(data.data.url)
        setPreview(data.data.url)
      } else {
        setError(data.message || 'Upload failed')
        setPreview(currentImageUrl || '')
      }
    } catch (err) {
      setError('Upload failed. Please try again.')
      setPreview(currentImageUrl || '')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview('')
    onImageUploaded('')
  }

  return (
    <div className="space-y-3">
      {/* Preview */}
      {preview && (
        <div className="relative rounded-lg overflow-hidden border-2 border-gray-300">
          <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg"
          >
            🗑️
          </button>
        </div>
      )}

      {/* Upload Button */}
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <span className="text-4xl mb-2">📤</span>
          <p className="text-sm text-gray-600 font-medium">
            {uploading ? 'Uploading...' : 'Click to upload image'}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP (MAX. 5MB)</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </label>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          ❌ {error}
        </div>
      )}

      {/* Success Message */}
      {preview && !uploading && !error && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          ✓ Image uploaded successfully
        </div>
      )}
    </div>
  )
}
