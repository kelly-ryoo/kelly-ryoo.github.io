import { useEffect, useState } from 'react';
import CollectionLayout from './CollectionLayout.jsx';

const TEAS_URL = '/data/teas.json';

export default function TeasPage() {
  const [teas, setTeas] = useState([]);
  const [syncStatus, setSyncStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetch(TEAS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load the tea collection.');
        return response.json();
      })
      .then((data) => {
        setTeas(Array.isArray(data.teas) ? data.teas : []);
        setSyncStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setSyncStatus('error');
      });
    return () => controller.abort();
  }, []);

  return (
    <CollectionLayout
      title="teas i've drank"
    >
      <section className="tea-gallery" aria-label="Tea collection">
        {syncStatus === 'loading' && <p className="tea-gallery-status">Gathering the teas...</p>}
        {syncStatus === 'error' && <p className="tea-gallery-status">The tea collection could not be loaded. Please try again later.</p>}
        {syncStatus === 'ready' && teas.length === 0 && (
          <p className="tea-gallery-status">New teas will appear here soon.</p>
        )}
        {teas.map((tea) => (
          <figure className="tea-item" key={tea.id}>
            <img src={tea.image} alt={tea.title} loading="lazy" />
            <figcaption>{tea.title}</figcaption>
          </figure>
        ))}
      </section>

      <section className="tea-instagram" aria-label="Instagram feed">
        <h2>from ryooibos</h2>
        <div className="instagram-gallery">
          <iframe
            title="Latest tea posts from Instagram"
            src="https://www.instagram.com/ryooibos/embed"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <a href="https://www.instagram.com/ryooibos/" target="_blank" rel="noreferrer">
            View on Instagram ↗
          </a>
        </div>
      </section>
    </CollectionLayout>
  );
}