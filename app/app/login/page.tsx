
'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage('登录失败')
    } else {
      setMessage('验证码已发送，请查收邮箱')
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">登录</h2>
      <input
        type="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleLogin} className="bg-black text-white px-4 py-2 rounded">
        获取验证码
      </button>
      <p className="text-sm mt-2 text-gray-600">{message}</p>
    </div>
  )
}
