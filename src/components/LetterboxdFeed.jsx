import { useEffect, useState } from 'react';

const feedUrl = 'https://letterboxd.com/jerryryoo/rss/';

export default function LetterboxdFeed() {
  const [films, setFilms] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/data/letterboxd.json', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Letterboxd feed request failed');
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.films)) throw new Error('Letterboxd feed parsing failed');
        setFilms(data.films);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadFailed(true);
      });

    return () => controller.abort();
  }, []);

  if (loadFailed) {
    return <p className="letterboxd-status" role="status">The latest films couldn’t be loaded. Visit the <a href={feedUrl}>RSS feed</a> or <a href="https://letterboxd.com/jerryryoo/">Letterboxd profile</a>.</p>;
  }

  if (films === null) {
    return <p className="letterboxd-status" role="status">Loading recent films…</p>;
  }

  if (films.length === 0) {
    return <p className="letterboxd-status" role="status">No films found in the feed.</p>;
  }

  const recentFilms = films.map((film) => {
    const ratingSeparator = film.title.lastIndexOf(' - ');
    const filmLabel = ratingSeparator === -1 ? film.title : film.title.slice(0, ratingSeparator);
    const rating = ratingSeparator === -1 ? '' : film.title.slice(ratingSeparator + 3);
    const yearMatch = filmLabel.match(/, (\d{4})$/);
    const title = yearMatch ? filmLabel.slice(0, yearMatch.index) : filmLabel;
    return { ...film, title, year: yearMatch?.[1], rating };
  });

  return (
    <ol className="letterboxd-films" aria-label="Recent films logged on Letterboxd">
      {recentFilms.map((film) => (
        <li className="letterboxd-film" key={film.guid || film.link}>
          <a href={film.link} target="_blank" rel="noreferrer">
            {film.thumbnail && <img src={film.thumbnail.replace(/^http:/, 'https:')} alt={`${film.title}${film.year ? ` (${film.year})` : ''} film poster`} loading="lazy" />}
            <span className="letterboxd-film-title">{film.title}</span>
            <span className="letterboxd-film-meta">
              {film.year && <span>{film.year}</span>}
              {film.rating && <span className="letterboxd-film-rating" aria-label={`Rated ${film.rating}`}>{film.rating}</span>}
            </span>
            <span className={`letterboxd-film-tag${film.tag ? '' : ' letterboxd-film-tag-empty'}`}>
              {film.tag || 'untagged'}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}