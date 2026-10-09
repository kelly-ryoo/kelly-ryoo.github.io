export default function CollectionLayout({ title, description, children }) {
  return (
    <main className="collection-page">
      <a className="home-back collection-back page-reveal" href="#home" aria-label="Back to home"><span aria-hidden="true">↖</span> home</a>
      <header className="collection-heading page-reveal" style={{ '--reveal-order': 0 }}>
        <h1>{title}</h1>
        {description && <p className="collection-description">{description}</p>}
      </header>
      <section className="collection-content page-reveal" style={{ '--reveal-order': 1 }} aria-label={`${title} collection`}>
        {children}
      </section>
    </main>
  );
}