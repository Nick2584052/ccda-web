'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Resource = {
  id: number;
  title: string;
  file_url: string;
  type: string;
};

export default function HomePage() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('resources').select('*');
      if (!error && data) setResources(data);
    }
    fetchData();
  }, []);

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((r) => (
        <div key={r.id} className="border p-4 rounded shadow hover:shadow-lg transition">
          <img src={r.file_url} alt={r.title} className="w-full h-48 object-cover mb-2" />
          <h3 className="text-lg font-semibold">{r.title}</h3>
          <p className="text-sm text-gray-500">{r.type}</p>
        </div>
      ))}
    </main>
  );
}