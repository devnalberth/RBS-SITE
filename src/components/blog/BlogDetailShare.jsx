import { Link2, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function BlogDetailShare({ post }) {
  return (
    <section className="px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="gs-reveal flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:flex-row md:p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-2">
            <span className="mr-1 text-xs font-semibold text-gray-400">Share:</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 transition hover:border-accent hover:text-accent">
              <Twitter className="h-3.5 w-3.5" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 transition hover:border-accent hover:text-accent">
              <Linkedin className="h-3.5 w-3.5" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 transition hover:border-accent hover:text-accent">
              <Facebook className="h-3.5 w-3.5" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 transition hover:border-accent hover:text-accent">
              <Link2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
