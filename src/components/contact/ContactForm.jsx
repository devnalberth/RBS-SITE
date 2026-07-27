import { ArrowUpRight } from 'lucide-react';

export default function ContactForm() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="gs-reveal grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left — Form */}
          <div>
            <h2 className="mb-2 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Send Us a <span className="font-serif-italic text-accent">Message</span>
            </h2>
            <p className="mb-8 text-sm text-gray-500 md:mb-10 md:text-base">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <form className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">Service Interested In</label>
                <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-accent focus:bg-white md:text-base">
                  <option value="">Select a service</option>
                  <option value="wealth-finance">Wealth Finance</option>
                  <option value="risk-assessment">Risk Assessment</option>
                  <option value="team-strategy">Team Strategy</option>
                  <option value="growth-planning">Growth Planning</option>
                  <option value="innovation">Innovation Consulting</option>
                  <option value="operations">Operational Excellence</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project or challenge..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-accent focus:bg-white md:text-base"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-5 rounded-full bg-accent py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-primary"
              >
                Send Message
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition group-hover:text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </form>
          </div>

          {/* Right — Image & Info */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/images/webp/hero-optimized.webp"
                alt="Our office"
                className="h-[250px] w-full object-cover sm:h-[300px] lg:h-[350px]"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center rounded-3xl bg-accent p-8 text-white md:p-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <h3 className="relative mb-3 text-2xl font-bold md:text-3xl">Office Hours</h3>
              <p className="relative mb-6 text-sm text-indigo-100 md:text-base">
                We&apos;re here to help during the hours below. Custom appointments are also available.
              </p>
              <div className="relative space-y-3 text-sm font-medium md:text-base">
                <div className="flex justify-between border-b border-indigo-500/50 pb-2">
                  <span>Monday – Thursday</span>
                  <span>08:00 – 18:00</span>
                </div>
                <div className="flex justify-between border-b border-indigo-500/50 pb-2">
                  <span>Friday</span>
                  <span>09:00 – 17:00</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Saturday &amp; Sunday</span>
                  <span>08:30 – 19:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
