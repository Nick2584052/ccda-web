
import '../styles/globals.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <main className="max-w-3xl mx-auto p-6">
          <header className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-semibold">CCDA 数字资源平台</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}
