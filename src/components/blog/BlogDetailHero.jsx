import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

export default function BlogDetailHero({ post }) {
  return (
    <section className="px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
      <div className="mx-auto max-w-4xl">
        <div className="gs-reveal">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-[1.15] tracking-tight text-primary sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <div className="mb-8 flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-bold text-primary">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.author.role}</p>
            </div>
          </div>
        </div>

        <div className="gs-reveal overflow-hidden rounded-2xl md:rounded-3xl">
          <img
            src={post.img}
            alt={post.title}
            className="h-[250px] w-full object-cover sm:h-[350px] md:h-[450px]"
          />
        </div>
      </div>
    </section>
  );
}
