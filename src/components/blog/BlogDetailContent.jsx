import { Quote } from 'lucide-react';

export default function BlogDetailContent({ post }) {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <article className="gs-reveal prose-custom">
          {/* Intro */}
          <p className="mb-6 text-base leading-relaxed text-gray-600 md:text-lg md:leading-relaxed">
            {post.intro}
          </p>

          {/* Section 1 */}
          <h2 className="mb-4 mt-10 text-2xl font-bold text-primary md:text-3xl">{post.sections[0].title}</h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            {post.sections[0].content}
          </p>

          {/* Blockquote */}
          <div className="my-8 rounded-2xl border-l-4 border-accent bg-accent/5 p-6 md:my-10 md:p-8">
            <Quote className="mb-3 h-6 w-6 text-accent" />
            <p className="text-base font-medium italic leading-relaxed text-primary md:text-lg">
              &ldquo;{post.quote.text}&rdquo;
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-500">— {post.quote.author}</p>
          </div>

          {/* Section 2 */}
          <h2 className="mb-4 mt-10 text-2xl font-bold text-primary md:text-3xl">{post.sections[1].title}</h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            {post.sections[1].content}
          </p>

          {/* Key Points */}
          <div className="my-8 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
            <h3 className="mb-4 text-lg font-bold text-primary md:text-xl">Key Takeaways</h3>
            <ul className="space-y-3">
              {post.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 md:text-base">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3 */}
          <h2 className="mb-4 mt-10 text-2xl font-bold text-primary md:text-3xl">{post.sections[2].title}</h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            {post.sections[2].content}
          </p>

          {/* Mid Image */}
          <div className="my-8 overflow-hidden rounded-2xl md:my-10">
            <img
              src={post.midImg}
              alt="Article illustration"
              className="h-[200px] w-full object-cover sm:h-[280px] md:h-[350px]"
            />
          </div>

          {/* Section 4 */}
          <h2 className="mb-4 mt-10 text-2xl font-bold text-primary md:text-3xl">{post.sections[3].title}</h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            {post.sections[3].content}
          </p>

          {/* Conclusion */}
          <div className="mt-10 rounded-2xl bg-accent/5 border border-accent/10 p-6 md:p-8">
            <h3 className="mb-3 text-lg font-bold text-primary md:text-xl">Conclusion</h3>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
              {post.conclusion}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
