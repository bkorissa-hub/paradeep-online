import { Editor } from '@tinymce/tinymce-react'

interface TinyEditorProps {
  value: string
  onChange: (value: string) => void
  height?: number
}

export default function TinyEditor({ value, onChange, height = 400 }: TinyEditorProps) {
  return (
    <Editor
      apiKey="your-api-key-or-use-no-apikey-mode"
      value={value}
      onEditorChange={onChange}
      init={{
        height: height,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  )
}
