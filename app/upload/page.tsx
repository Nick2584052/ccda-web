'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage.from('resources').upload(file.name, file);
    if (error) {
      alert('Upload failed');
      return;
    }
    const url = supabase.storage.from('resources').getPublicUrl(file.name).data.publicUrl;
    await supabase.from('resources').insert({ name: file.name, file_url: url });
    alert('Uploaded successfully');
  };

  return (
    <div>
      <h1>Upload</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
