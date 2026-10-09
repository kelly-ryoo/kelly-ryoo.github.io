import { useEffect, useState } from 'react';

function BookshelfPage() {
  const [library, setLibrary] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const books = library?.books ?? [];
  const booksByYear = books.reduce((groups, book) => {
    const year = book.read_year ? String(book.read_year) : 'Undated';
    (groups[year] ??= []).push(book);
    return groups;
  }, {});
  const readingYears = Object.keys(booksByYear).sort((first, second) => {
    if (first === 'Undated') return 1;
    if (second === 'Undated') return -1;
    return Number(second) - Number(first);
  });

  useEffect(() => {
    const controller = new AbortController();
    fetch('/data/bookshelf.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load bookshelf data');
        return response.json();
      })
      .then(setLibrary)
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadError(true);
      });

    return () => controller.abort();
  }, []);

  return (
    <main className="collection-page bookshelf-page">
      <a className="home-back collection-back page-reveal" href="#home" aria-label="Back to home"><span aria-hidden="true">↖</span> home</a>
      <header className="collection-heading bookshelf-heading page-reveal" style={{ '--reveal-order': 0 }}>
        <div>
          <p className="bookshelf-kicker">Kelly Ryoo <span>/</span> Goodreads</p>
          <h1>Books I’ve read</h1>
        </div>
        <a href="https://www.goodreads.com/user/show/204863493-kelly-r" target="_blank" rel="noreferrer">
          Open Goodreads <span aria-hidden="true">↗</span>
        </a>
      </header>
      <section className="bookshelf-content page-reveal" style={{ '--reveal-order': 1 }} aria-label="Goodreads read shelf">
        <div className="bookshelf-toolbar">
          <span className="bookshelf-count">{books.length} {books.length === 1 ? 'book' : 'books'}</span>
        </div>
        {loadError ? (
          <p className="bookshelf-empty" role="status">The bookshelf could not be loaded right now.</p>
        ) : library === null ? (
          <p className="bookshelf-empty" role="status">Loading bookshelf…</p>
        ) : books.length ? (
          <div className="bookshelf-groups">
            {readingYears.map((year) => (
              <section className="bookshelf-year-group" key={year} aria-labelledby={`bookshelf-year-${year.toLowerCase()}`}>
                <h2 className="bookshelf-year-heading" id={`bookshelf-year-${year.toLowerCase()}`}>{year}</h2>
                <ol className="bookshelf-list">
                  {booksByYear[year].map((book, index) => (
                    <li key={book.book_id}>
                      <a href={`https://www.goodreads.com/book/show/${encodeURIComponent(book.book_id)}`} target="_blank" rel="noreferrer">
                        <span className="bookshelf-number">{String(index + 1).padStart(2, '0')}</span>
                        {book.cover_url && <img className="bookshelf-cover" src={book.cover_url} alt="" loading="lazy" />}
                        <span className="bookshelf-book-title">{book.title}</span>
                        <span className="bookshelf-arrow" aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        ) : (
          <p className="bookshelf-empty" role="status">This shelf is empty.</p>
        )}
        {library?.syncedAt && <p className="bookshelf-updated">Updated {new Date(library.syncedAt).toLocaleDateString()}</p>}
      </section>
    </main>
  );
}

export default BookshelfPage;
