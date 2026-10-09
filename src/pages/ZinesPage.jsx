import { useEffect, useRef, useState } from 'react';

const ZINES_URL = '/data/zines.json';

function ZineBook({ zine, index, isOnTop, onActivate, totalZines }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [flip, setFlip] = useState(null);
  const [maxPageWidth, setMaxPageWidth] = useState(null);
  const bookRef = useRef(null);
  const lastPageIndex = zine.pages.length - 1;
  const isSpread = pageIndex > 0 && pageIndex < lastPageIndex;
  const pageRatio = zine.pageRatios?.[pageIndex] ?? 0.75;
  const pageWidth = `${(pageRatio / 0.75) * 100}%`;
  const widestPageRatio = Math.max(...(zine.pageRatios ?? [pageRatio]));
  const pageHeight = maxPageWidth === null
    ? null
    : Math.min(bookRef.current?.clientHeight ?? Infinity, maxPageWidth / widestPageRatio);

  useEffect(() => {
    const book = bookRef.current;
    if (!book) return undefined;

    const updateMaxPageWidth = () => {
      const bounds = book.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      const availableWidth = Math.max(0, Math.min(center, window.innerWidth - center) * 2 - 32);
      setMaxPageWidth(availableWidth);
    };

    const observer = new ResizeObserver(updateMaxPageWidth);
    observer.observe(book);
    window.addEventListener('resize', updateMaxPageWidth);
    updateMaxPageWidth();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateMaxPageWidth);
    };
  }, []);

  function turnPage(direction) {
    const nextIndex = direction === 'next' ? pageIndex + 1 : pageIndex - 1;
    if (nextIndex < 0 || nextIndex >= zine.pages.length) return;

    const kind = pageIndex === 0 || pageIndex === lastPageIndex
      ? 'cover-open'
      : nextIndex === 0 || nextIndex === lastPageIndex
        ? 'cover-close'
        : 'spread';
    setFlip({
      direction,
      kind,
      source: zine.pages[pageIndex],
      ratio: zine.pageRatios?.[pageIndex] ?? pageRatio,
      key: `${pageIndex}-${nextIndex}-${Date.now()}`,
    });
    setPageIndex(nextIndex);
  }

  function handlePageClick(event) {
    onActivate(zine.id);
    if (pageIndex === 0 || event.detail === 0) {
      turnPage('next');
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickedRightSide = event.clientX - bounds.left >= bounds.width / 2;
    if (clickedRightSide) turnPage('next');
    else turnPage('previous');
  }

  return (
    <article
      className={`zine-item${pageIndex > 0 ? ' is-open' : ''}${isSpread ? ' is-spread' : ''}`}
      style={{ '--zine-order': index, '--zine-layer': isOnTop ? totalZines + 1 : index }}
    >
      <div className="zine-book" ref={bookRef}>
        <button
          className="zine-page-button"
          onClick={handlePageClick}
          style={pageHeight === null
            ? { width: pageWidth, maxWidth: 'none', aspectRatio: pageRatio }
            : {
              width: `${pageRatio * pageHeight}px`,
              height: `${pageHeight}px`,
              maxWidth: `${maxPageWidth}px`,
            }}
          type="button"
          aria-label={pageIndex === 0
            ? `Open ${zine.title}, ${zine.pageCount} pages`
            : `Turn ${zine.title}, page ${pageIndex + 1} of ${zine.pageCount}`}
        >
          <span className="zine-page-stack" aria-hidden="true" />
          <img
            className={`zine-current-page${flip ? ` zine-reveal-${flip.kind} zine-reveal-${flip.kind}-${flip.direction}` : ''}`}
            src={zine.pages[pageIndex]}
            alt={`${zine.title}, ${pageIndex === 0 ? 'front cover' : pageIndex === lastPageIndex ? 'back cover' : `open spread ${pageIndex}`}`}
            loading="lazy"
            onAnimationEnd={() => setFlip(null)}
          />
          {flip && (
            <img
              key={flip.key}
              className={`zine-flipping-page zine-flipping-${flip.kind}`}
              src={flip.source}
              alt=""
              aria-hidden="true"
              style={pageHeight === null ? undefined : {
                width: `${flip.ratio * pageHeight}px`,
                height: `${pageHeight}px`,
                maxWidth: `${maxPageWidth}px`,
              }}
            />
          )}
        </button>
      </div>
    </article>
  );
}

export default function ZinesPage() {
  const [zines, setZines] = useState([]);
  const [syncStatus, setSyncStatus] = useState('loading');
  const [topZineId, setTopZineId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(ZINES_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load the zine collection.');
        return response.json();
      })
      .then((data) => {
        setZines(Array.isArray(data.zines) ? data.zines : []);
        setSyncStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setSyncStatus('error');
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="collection-page zines-page">
      <a className="home-back collection-back page-reveal" href="#home" aria-label="Back to home"><span aria-hidden="true">↖</span> home</a>
      <header className="collection-heading zines-heading page-reveal" style={{ '--reveal-order': 0 }}>
        <h1>zines i've made</h1>
        <p>Doodles, lists, and just about anything else.</p>
      </header>

      <section className="zines-gallery" aria-label="Zine collection">
        {syncStatus === 'loading' && <p className="zines-status">Gathering the zines...</p>}
        {syncStatus === 'error' && <p className="zines-status">The zine collection could not be loaded. Please try again later.</p>}
        {syncStatus === 'ready' && zines.length === 0 && (
          <p className="zines-status">New zines will appear here soon.</p>
        )}
        {zines.map((zine, index) => (
          <ZineBook
            key={zine.id}
            zine={zine}
            index={index}
            isOnTop={topZineId === zine.id}
            onActivate={setTopZineId}
            totalZines={zines.length}
          />
        ))}
      </section>
    </main>
  );
}