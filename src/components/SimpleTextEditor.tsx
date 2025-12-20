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
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-2">
        {/* Tabs */}
        <div className="flex gap-1 mr-4">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 rounded ${activeTab === 'write' ? 'bg-white shadow' : 'text-gray-600'}`}
          >
            ✏️ Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded ${activeTab === 'preview' ? 'bg-white shadow' : 'text-gray-600'}`}
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
              className="px-2 py-1 hover:bg-gray-200 rounded font-semibold"
              title="Heading"
            >
              H
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="px-2 py-1 hover:bg-gray-200 rounded font-bold"
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="px-2 py-1 hover:bg-gray-200 rounded italic"
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('- ', '')}
              className="px-2 py-1 hover:bg-gray-200 rounded"
              title="List"
            >
              • List
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('[Link Text](', ')')}
              className="px-2 py-1 hover:bg-gray-200 rounded"
              title="Link"
            >
              🔗
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('![Alt Text](', ')')}
              className="px-2 py-1 hover:bg-gray-200 rounded"
              title="Image"
            >
              🖼️
            </button>
          </>
        )}
      </div>

      {/* Editor/Preview Area */}
      <div style={{ minHeight: height }}>
        {activeTab === 'write' ? (
          <textarea
            id="editor-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border-0 focus:outline-none resize-none"
            style={{ minHeight: height, fontFamily: 'monospace' }}
          />
        ) : (
          <div 
            className="p-4 prose prose-lg max-w-none"
            style={{ minHeight: height }}
            dangerouslySetInnerHTML={{ __html: '<p>' + formatPreview(value) + '</p>' }}
          />
        )}
      </div>

      {/* Helper Text */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-600">
        💡 Tip: Use **bold**, *italic*, ## Heading, - lists, [links](url), ![images](url)
      </div>
    </div>
  )
}
