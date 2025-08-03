
'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  const handleUpload = async () => {
    if (!file) return setMessage('请上传文件')
    const fileName = Date.now() + '_' + file.name
    const { data: fileData, error: uploadError } = await supabase.storage.from('resources').upload(fileName, file)
    if (uploadError) return setMessage('文件上传失败')

    const { publicUrl } = supabase.storage.from('resources').getPublicUrl(fileName).data
    const { error: dbError } = await supabase.from('resources').insert([{ title, author, price: parseFloat(price), file_url: publicUrl }])
    if (dbError) return setMessage('数据库写入失败')
    setMessage('✅ 上传成功')
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">上传资源</h2>
      <input type="text" placeholder="标题" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="text" placeholder="作者" value={author} onChange={(e) => setAuthor(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="number" placeholder="价格" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-2" />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">上传</button>
      <p className="text-sm mt-2">{message}</p>
    </div>
  )
}
