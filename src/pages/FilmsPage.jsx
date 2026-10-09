import LetterboxdFeed from '../components/LetterboxdFeed.jsx';
import CollectionLayout from './CollectionLayout.jsx';

export default function FilmsPage() {
  return (
    <CollectionLayout title="films i've watched">
      <div className="letterboxd-heading-links">
        <a
          className="letterboxd-profile-link"
          href="https://letterboxd.com/jerryryoo/"
          target="_blank"
          rel="noreferrer"
        >
          visit my letterboxd profile ↗
        </a>
        
      </div>
      <LetterboxdFeed />
    </CollectionLayout>
  );
}