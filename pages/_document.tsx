import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
          <link rel="icon" href="/icons/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html> 
    );
  }
}

export default MyDocument;
