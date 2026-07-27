import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const tabs = [
  {
    id: 'tab-1',
    label: 'Deep Collaboration',
    content:
      'We work side by side with your team, fostering open communication and shared accountability to ensure strategies translate into real, lasting impact.',
  },
  {
    id: 'tab-2',
    label: 'Expertise',
    content:
      'Our consultants bring proven knowledge across industries, blending strategic insight with practical execution to help you navigate complex challenges with confidence.',
  },
  {
    id: 'tab-3',
    label: 'Tailored Solutions',
    content:
      "We don't believe in one-size-fits-all. We analyze the unique fabric of your business to engineer pinpoint strategies for maximum efficiency.",
  },
];

export default function PartnershipSection() {
  const [activeTab, setActiveTab] = useState('tab-1');

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Image */}
        <div className="relative gs-reveal order-2 lg:order-1">
          <img
            src="/images/webp/partnership-optimized.webp"
            alt="Consultant"
            className="w-full h-[350px] md:h-[500px] object-cover rounded-3xl"
          />
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-primary/90 backdrop-blur text-white p-5 md:p-6 rounded-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">What to Know What&apos;s Possible</h3>
            <button className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 md:py-2.5 md:pl-6 md:pr-2.5 text-xs md:text-sm font-bold text-primary transition hover:bg-gray-100">
              Get In Touch
              <span className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-accent text-white transition">
                <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Right Tabs */}
        <div className="gs-reveal order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            The Value Behind Our <span className="font-serif-italic text-accent">Partnership</span>
          </h2>
          <p className="text-gray-600 mb-8 md:mb-10 text-sm md:text-base">
            At Empower, our partnership goes beyond delivering solutions—it&apos;s about building trust, aligning with
            your goals. We go beyond consulting to become your strategic partner—delivering tailored solutions, expert
            insight, and measurable results.
          </p>

          {/* Tabs Header */}
          <div className="flex flex-wrap gap-2 md:gap-4 border-b border-gray-200 pb-3 md:pb-4 mb-4 md:mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-2 py-1 text-sm md:text-base font-semibold transition ${
                  activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent mr-1 md:mr-2 transition-opacity ${
                    activeTab === tab.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[120px] md:min-h-[100px]">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`text-gray-600 text-sm md:text-base transition-opacity duration-300 ${
                  activeTab === tab.id ? 'opacity-100 block' : 'hidden opacity-0'
                }`}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
