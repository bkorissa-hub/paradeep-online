import { useState } from 'react'

interface SimpleTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: string
}

export default function SimpleTextEditor({ 
  value, 
  onChange, 
  placeholder = 'Start writing...', 
  height = '400px' 
}: SimpleTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.getElementById('editor-textarea') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatPreview = (text: string) => {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold & Italic
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />')
      // Lists
      .replace(/^\- (.+)$/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside my-2">$1</ul>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2 flex-wrap">
        {/* Tabs */}
        <div className="flex gap-1 mr-4 border-r pr-4">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === 'write' 
                ? 'bg-white shadow text-blue-600' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            ✏️ Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === 'preview' 
                ? 'bg-white shadow text-blue-600' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            👁️ Preview
          </button>
        </div>

        {/* Formatting Buttons (only show in write mode) */}
        {activeTab === 'write' && (
          <>
            <button
              type="button"
              onClick={() => insertFormatting('## ', '')}
              className="px-2 py-1.5 hover:bg-gray-200 rounded font-bold text-sm"
              title="Heading (## Text)"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('### ', '')}
              className="px-2 py-1.5 hover:bg-gray-200 rounded font-semibold text-sm"
              title="Subheading (### Text)"
            >
              H3
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="px-2 py-1.5 hover:bg-gray-200 rounded font-bold"
              title="Bold (**text**)"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="px-2 py-1.5 hover:bg-gray-200 rounded italic"
              title="Italic (*text*)"
            >
              I
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <button
              type="button"
              onClick={() => insertFormatting('- ', '')}
              className="px-2 py-1.5 hover:bg-gray-200 rounded text-sm"
              title="List (- item)"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('[Link Text](', 'https://example.com)')}
              className="px-2 py-1.5 hover:bg-gray-200 rounded text-sm"
              title="Link [text](url)"
            >
              🔗 Link
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('![Image Alt](', 'https://example.com/image.jpg)')}
              className="px-2 py-1.5 hover:bg-gray-200 rounded text-sm"
              title="Image ![alt](url)"
            >
              🖼️ Image
            </button>
          </>
        )}
      </div>

      {/* Editor/Preview Area */}
      <div style={{ minHeight: height, maxHeight: '600px', overflowY: 'auto' }}>
        {activeTab === 'write' ? (
          <textarea
            id="editor-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border-0 focus:outline-none resize-none font-mono text-sm"
            style={{ minHeight: height }}
          />
        ) : (
          <div 
            className="p-6 prose prose-lg max-w-none"
            style={{ minHeight: height }}
          >
            <div dangerouslySetInnerHTML={{ __html: '<div>' + formatPreview(value) + '</div>' }} />
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-600">
        <strong>💡 Markdown Tips:</strong> **bold** | *italic* | ## heading | - list | [link](url) | ![image](url)
      </div>
    </div>
  )
}
