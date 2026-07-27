import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we\'ll prorate any differences.',
  },
  {
    question: 'Is there a free trial or consultation?',
    answer: 'Yes! We offer a free initial consultation for all plans. This allows us to understand your business needs and recommend the right plan before you commit.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, bank transfers, and invoicing for Enterprise clients. Payment terms are flexible and can be discussed during onboarding.',
  },
  {
    question: 'How long are your contracts?',
    answer: 'Starter plans are project-based with no long-term commitment. Growth plans are quarterly, and Enterprise plans are customized — typically 6 to 12 months.',
  },
  {
    question: 'What if I\'m not satisfied with the results?',
    answer: 'We stand behind our work. If you\'re not seeing results within the agreed timeline, we\'ll extend our engagement at no extra cost to ensure your goals are met.',
  },
  {
    question: 'Do you offer custom or hybrid plans?',
    answer: 'Yes, especially for Enterprise clients. We can tailor a plan that combines elements from different tiers to match your exact needs and budget.',
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="gs-reveal mb-10 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Pricing <span className="font-serif-italic text-accent">FAQ</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-gray-500 md:text-base">
            Common questions about our pricing and plans.
          </p>
        </div>

        <div className="gs-reveal space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 transition hover:border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-base hover:text-accent transition md:p-6 md:text-lg"
              >
                {faq.question}
                {openIndex === i ? (
                  <Minus className="h-5 w-5 shrink-0 text-accent" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-accent" />
                )}
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === i ? '250px' : '0px' }}
              >
                <p className="px-5 pb-5 text-sm leading-relaxed text-gray-500 md:px-6 md:pb-6 md:text-base">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
