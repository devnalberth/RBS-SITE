import Head from 'next/head';
import Link from 'next/link';
import { ArrowUpRight, Home } from 'lucide-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Empower</title>
      </Head>
      <main className="selection:bg-accent selection:text-white">
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="gs-reveal">
              <p className="mb-4 text-[120px] font-bold leading-none text-accent/10 sm:text-[160px] md:text-[200px]">
                404
              </p>
              <h1 className="-mt-10 mb-4 text-3xl font-bold text-primary sm:text-4xl md:-mt-14 md:text-5xl">
                Page Not <span className="font-serif-italic font-normal text-accent">Found</span>
              </h1>
              <p className="mb-10 text-sm text-gray-500 md:text-base">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-primary"
                >
                  <Home className="h-4 w-4" />
                  Back to Home
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-gray-500 underline decoration-gray-300 underline-offset-4 transition hover:text-accent"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
