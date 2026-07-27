import Head from 'next/head';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogNewsletter from '@/components/blog/BlogNewsletter';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog - Empower | Strategic Insights & Business Growth</title>
        <meta
          name="description"
          content="Expert perspectives on business strategy, leadership, and growth — curated to help you make smarter decisions."
        />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <BlogHero />
        <BlogGrid />
        <BlogCategories />
        <BlogNewsletter />
      </main>
    </>
  );
}
