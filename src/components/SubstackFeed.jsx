import { useEffect, useState } from 'react';

export default function SubstackFeed() {
  const [posts, setPosts] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const feedUrl = 'https://jerryryoo.substack.com/feed';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&_=${Date.now()}`;

    fetch(apiUrl, { signal: controller.signal, cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Feed request failed');
        return response.json();
      })
      .then((data) => {
        if (data.status !== 'ok') throw new Error('Feed parsing failed');
        setPosts(data.items ?? []);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setLoadError(true);
      });

    return () => controller.abort();
  }, []);

  if (loadError) {
    return <p className="substack-feed-status" role="status">The latest posts couldn’t be loaded. Visit Substack to read the publication.</p>;
  }

  if (posts === null) {
    return <p className="substack-feed-status" role="status">Loading latest writing…</p>;
  }

  if (posts.length === 0) {
    return <p className="substack-feed-status" role="status">No posts found. Visit Substack to read the publication.</p>;
  }

  return (
    <ol className="substack-posts" aria-label="Latest Substack posts">
      {posts.slice(0, 8).map((post) => {
        const publishedAt = new Date(post.pubDate);
        const validDate = !Number.isNaN(publishedAt.getTime());
        const imageOverrides = {
          'https://jerryryoo.substack.com/p/love-is-a-plate-of-carefully-peeled': 'https://substackcdn.com/image/fetch/$s_!6DCi!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5f28dd91-3285-430a-8c37-5e3bcc6ca0ff_5472x3648.jpeg',
        };
        const imageUrl = imageOverrides[post.link]
          || (post.enclosure?.link || post.thumbnail)?.replace(/,w_\d+/, ',w_900');

        return (
          <li className="substack-post" key={post.link}>
            {imageUrl && (
              <a className="substack-post-image" href={post.link} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                <img src={imageUrl} alt="" loading="lazy" />
              </a>
            )}
            <a className="substack-post-link" href={post.link} target="_blank" rel="noreferrer">
              <span>{post.title}</span>
              <span aria-hidden="true">↗</span>
            </a>
            {validDate && (
              <time className="substack-post-date" dateTime={publishedAt.toISOString()}>
                {publishedAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            )}
            {post.description && <p className="substack-post-description">{post.description}</p>}
          </li>
        );
      })}
    </ol>
  );
}