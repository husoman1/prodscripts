// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        {/* META */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="ProdScript ile saniyeler içinde AI destekli ürün açıklamaları üret. SEO uyumlu, eğlenceli ve sade metin tarzlarıyla satışlarını artır!"
        />
        <meta property="og:title" content="ProdScript | AI Ürün Açıklaması Yazıcı" />
        <meta property="og:description" content="E-ticaret açıklamaları artık çok kolay. GPT destekli metinler ile hemen başla!" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://prodscript.com" />
        <meta property="og:type" content="website" />

        {/* FAVICON */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* SEO Boost */}
        <link rel="canonical" href="https://prodscript.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
