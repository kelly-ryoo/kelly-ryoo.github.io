import CollectionLayout from './CollectionLayout.jsx';

export default function PhotographsPage() {
  return (
    <CollectionLayout title="photographs i've taken">
      <div className="instagram-gallery">
        <iframe
          title="Latest photographs from Instagram"
          src="https://www.instagram.com/yeonha_ryu/embed"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <a href="https://www.instagram.com/yeonha_ryu/" target="_blank" rel="noreferrer">
          View on Instagram ↗
        </a>
      </div>
    </CollectionLayout>
  );
}