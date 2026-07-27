import Head from 'next/head';

const sections = [
  {
    title: '1. Terms of Service',
    content: 'By accessing and using Empower\'s website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use our services. These terms apply to all visitors, users, and clients of Empower.',
  },
  {
    title: '2. Services',
    content: 'Empower provides strategic business consulting, including but not limited to wealth finance, risk assessment, team strategy, growth planning, innovation consulting, and operational excellence. The specific scope of services will be outlined in individual service agreements between Empower and the client.',
  },
  {
    title: '3. Intellectual Property',
    content: 'All content on this website, including text, graphics, logos, images, and software, is the property of Empower and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without prior written consent from Empower.',
  },
  {
    title: '4. Client Confidentiality',
    content: 'Empower is committed to maintaining the confidentiality of all client information. We will not disclose any proprietary information, business data, or strategic plans shared during our engagement without explicit written consent, except where required by law.',
  },
  {
    title: '5. Payment Terms',
    content: 'Payment terms will be specified in individual service agreements. Unless otherwise stated, invoices are due within 30 days of issuance. Late payments may incur additional fees as outlined in the service agreement. All prices are subject to applicable taxes.',
  },
  {
    title: '6. Limitation of Liability',
    content: 'Empower provides consulting advice and recommendations based on our professional expertise. However, final business decisions remain the responsibility of the client. Empower shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or recommendations.',
  },
  {
    title: '7. Privacy Policy',
    content: 'We collect and process personal data in accordance with applicable data protection laws. Information collected through our website and service engagements is used solely for the purpose of delivering our services and improving user experience. We do not sell personal data to third parties.',
  },
  {
    title: '8. Modifications',
    content: 'Empower reserves the right to modify these Terms & Conditions at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after modifications constitutes acceptance of the updated terms.',
  },
  {
    title: '9. Governing Law',
    content: 'These Terms & Conditions shall be governed by and construed in accordance with the laws of the State of California, United States. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Los Angeles, California.',
  },
  {
    title: '10. Contact',
    content: 'If you have any questions about these Terms & Conditions, please contact us at contactinfo@gmail.com or visit our office at Los Angeles, CA 90017, United States.',
  },
];

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - Empower</title>
        <meta name="description" content="Read the Terms and Conditions for using Empower's website and consulting services." />
      </Head>
      <main className="selection:bg-accent selection:text-white">
        {/* Hero */}
        <section className="px-4 pb-10 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="gs-reveal">
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                Legal
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl md:text-6xl">
                Terms & <span className="font-serif-italic font-normal text-accent">Conditions</span>
              </h1>
              <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
                Last updated: May 1, 2026. Please read these terms carefully before using our services.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 pb-16 sm:px-6 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="gs-reveal space-y-8 md:space-y-10">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="mb-3 text-xl font-bold text-primary md:text-2xl">{section.title}</h2>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base md:leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
