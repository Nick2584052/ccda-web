
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Resource {
  id: number
  title: string
  author: string
  price: number
  file_url: string
}

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('resources').select('*').order('id', { ascending: false })
      if (data) setResources(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2 className="text-xl mb-4 font-bold">最新资源</h2>
      {resources.map((res) => (
        <div key={res.id} className="border rounded p-4 mb-3 bg-white">
          <div className="text-lg font-semibold">{res.title}</div>
          <div className="text-sm text-gray-600">作者：{res.author}</div>
          <div className="text-sm">价格：¥{res.price}</div>
          <a href={res.file_url} target="_blank" className="text-blue-600 text-sm underline">查看文件</a>
        </div>
      ))}
    </div>
  )
}
