import { useEffect, useState } from 'react'
import { apiClient } from '../../../lib/apiClient'

export default function ThemeEditor() {
  const [theme, setTheme] = useState({
    color_primary: '#2563eb',
    color_secondary: '#64748b',
    font_family_base: 'Inter, sans-serif',
    spacing_unit: '4px'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchTheme()
  }, [])

  const fetchTheme = async () => {
    try {
      const res = await apiClient.getTheme()
      if (res.success && res.data) {
        setTheme(res.data)
      }
    } catch (err) {
      console.error('Error fetching theme:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setTheme({ ...theme, [field]: value })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await apiClient.updateTheme(theme)
      if (res.success) {
        setMessage('✓ Theme updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('❌ Failed to update theme')
      }
    } catch (err) {
      setMessage('❌ Error updating theme')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading theme...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Theme Settings</h1>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.includes('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <div className="space-y-6">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Color</label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                value={theme.color_primary}
                onChange={(e) => handleChange('color_primary', e.target.value)}
                className="w-20 h-20 rounded border border-gray-300 cursor-pointer"
              />
              <div>
                <input
                  type="text"
                  value={theme.color_primary}
                  onChange={(e) => handleChange('color_primary', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Used for buttons, links, and highlights</p>
              </div>
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Secondary Color</label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                value={theme.color_secondary}
                onChange={(e) => handleChange('color_secondary', e.target.value)}
                className="w-20 h-20 rounded border border-gray-300 cursor-pointer"
              />
              <div>
                <input
                  type="text"
                  value={theme.color_secondary}
                  onChange={(e) => handleChange('color_secondary', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Used for secondary elements</p>
              </div>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Font Family</label>
            <input
              type="text"
              value={theme.font_family_base}
              onChange={(e) => handleChange('font_family_base', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Spacing Unit */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Spacing Unit (px)</label>
            <input
              type="text"
              value={theme.spacing_unit}
              onChange={(e) => handleChange('spacing_unit', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          {saving ? 'Saving...' : '💾 Save Changes'}
        </button>
      </div>
    </div>
  )
}
