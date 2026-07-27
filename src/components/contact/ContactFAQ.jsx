import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How quickly will I hear back after submitting the form?',
    answer: 'We respond to all inquiries within 24 business hours. For urgent matters, please call us directly at +99 1234 5478.',
  },
  {
    question: 'Do you offer free initial consultations?',
    answer: 'Yes! We offer a complimentary 30-minute consultation to understand your business needs and recommend the best approach before any commitment.',
  },
  {
    question: 'Can I visit your office in person?',
    answer: 'Absolutely. Our Los Angeles office is open during business hours. We recommend scheduling an appointment to ensure a team member is available to meet with you.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, we work with clients globally. We conduct meetings via video conferencing and can accommodate different time zones for your convenience.',
  },
  {
    question: 'What information should I prepare before reaching out?',
    answer: 'A brief overview of your business, current challenges, and goals is helpful. Don\'t worry if you\'re unsure — our team will guide you through the discovery process.',
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="gs-reveal mb-10 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Common <span className="font-serif-italic text-accent">Questions</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm text-gray-500 md:text-base">
            Quick answers to help you get in touch the right way.
          </p>
        </div>

        <div className="gs-reveal space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white transition hover:border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-bold transition hover:text-accent md:p-6 md:text-lg"
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
