export default function ContactMap() {
  return (
    <section className="gs-reveal bg-white px-4 pb-10 md:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl md:rounded-[40px]">
        <iframe
          title="Escritório da RBS Consultoria Inteligente em Curitiba"
          src="https://www.google.com/maps?q=R.+Padre+Anchieta,+712+-+Merc%C3%AAs,+Curitiba+-+PR,+80430-060&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[300px] w-full md:h-[400px]"
        />
      </div>
    </section>
  );
}
