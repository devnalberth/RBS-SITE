export default function ContactMap() {
  return (
    <section className="px-4 pb-10 md:px-6 gs-reveal">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl md:rounded-[40px]">
        <iframe
          title="Empower Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.271693611463!2d-118.2551523!3d34.0522342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7b85dea2a93%3A0x1ff171838f6b8e5c!2sLos%20Angeles%2C%20CA%2090017!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[300px] w-full md:h-[400px]"
        />
      </div>
    </section>
  );
}
