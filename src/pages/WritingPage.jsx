import SubstackFeed from '../components/SubstackFeed.jsx';
import CollectionLayout from './CollectionLayout.jsx';

export default function WritingPage() {
  return (
    <CollectionLayout title="things i've written">
      <div className="substack-writing">
        <div className="substack-writing-intro">
          <p className="substack-kicker">RYU <span>/</span> Substack</p>
          <h2>ryu’s internet journal ✏️</h2>
          <p>(relatively) organized word vomits</p>
          <a href="https://substack.com/@jerryryoo" target="_blank" rel="noreferrer">
            Read the publication <span aria-hidden="true">↗</span>
          </a>
        </div>
        <SubstackFeed />
      </div>
    </CollectionLayout>
  );
}