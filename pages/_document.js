import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && <script async defer data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID} src="https://umami.joshheng.co.uk/umami.js"></script> }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
