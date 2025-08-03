import '../styles/globals.css';
export const metadata = { title: "CCDA", description: "Cultural Content Display App" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}