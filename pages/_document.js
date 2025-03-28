// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        {/* 🌐 Global Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="AI destekli ürün açıklaması üreticisi. SEO uyumlu, sade ve eğlenceli tarzlarla satışlarını artır." />

        {/* 🧠 Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta property="og:image" content="/favicon.png" />

        {/* 🏷️ Default Title (isteğe bağlı, sayfa override edebilir) */}
        <title>ProdScript | AI Ürün Açıklama Sihirbazı</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
