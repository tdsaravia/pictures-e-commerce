import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://app.snipcart.com" />
          <link rel="preconnect" href="https://cdn.snipcart.com" />
          <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js" />
          <div hidden id="snipcart" data-api-key="NTUyMzdmYTItNGEzZi00NWEzLWFjOTktYjI2MzdkZDk2MjUzNjM3OTQzNDczNDM5MjU1ODkz" />
        </body>
      </Html>
    )
  }
}

export default MyDocument