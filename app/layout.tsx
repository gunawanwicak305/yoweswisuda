import "./globals.css"

export const metadata = {
  title: "Yowes Gallery",
  description: "Web Foto Wisuda",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}