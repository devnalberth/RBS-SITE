import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Manrope: 400 Regular, 500 Medium (Span), 600 Semibold (Button), 700/800
            Playfair Display: 700 Bold (H1-H4) + 600 italico (palavra em destaque) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased bg-brand-secondary text-color-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
