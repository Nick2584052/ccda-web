
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

interface Resource {
  id: number
  title: string
  author: string
  price: number
  file_url: string
}

export default function AdminPage() {
  const [resources, setResources] = useState<Resource[]>([])

  const fetchData = async () => {
    const { data } = await supabase.from('resources').select('*')
    setResources(data || [])
  }

  const deleteItem = async (id: number) => {
    await supabase.from('resources').delete().eq('id', id)
    fetchData()
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">资源管理</h2>
      {resources.map(r => (
        <div key={r.id} className="border p-3 mb-2">
          <strong>{r.title}</strong> - ¥{r.price}
          <button onClick={() => deleteItem(r.id)} className="ml-4 text-red-600 text-sm">删除</button>
        </div>
      ))}
    </div>
  )
}
