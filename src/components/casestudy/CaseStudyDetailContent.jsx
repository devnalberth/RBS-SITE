import { Check } from 'lucide-react';

export default function CaseStudyDetailContent({ study }) {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <article className="gs-reveal">
          {/* Challenge */}
          <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">The Challenge</h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            {study.challenge}
          </p>

          {/* Approach */}
          <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">Our Approach</h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            {study.approach}
          </p>

          {/* Steps */}
          <div className="my-8 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:my-10 md:p-8">
            <h3 className="mb-4 text-lg font-bold text-primary md:text-xl">Key Actions Taken</h3>
            <ul className="space-y-3">
              {study.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 md:text-base">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Mid Image */}
          <div className="my-8 overflow-hidden rounded-2xl md:my-10">
            <img
              src={study.midImg}
              alt="Project in action"
              className="h-[200px] w-full object-cover sm:h-[280px] md:h-[350px]"
            />
          </div>

          {/* Solution */}
          <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">The Solution</h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            {study.solution}
          </p>

          {/* Quote */}
          <div className="my-8 rounded-2xl border-l-4 border-accent bg-accent/5 p-6 md:my-10 md:p-8">
            <p className="text-base font-medium italic leading-relaxed text-primary md:text-lg">
              &ldquo;{study.quote.text}&rdquo;
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-500">— {study.quote.author}</p>
          </div>

          {/* Results */}
          <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">The Results</h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            {study.results}
          </p>

          {/* Conclusion */}
          <div className="mt-10 rounded-2xl border border-accent/10 bg-accent/5 p-6 md:p-8">
            <h3 className="mb-3 text-lg font-bold text-primary md:text-xl">Key Takeaway</h3>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
              {study.takeaway}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
