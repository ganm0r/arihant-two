import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-full bg-gradient-to-l from-blue-200 via-green-200 to-blue-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
