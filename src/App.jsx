import { useEffect, useState } from 'react';
import AboutPage from './pages/AboutPage.jsx';
import BookshelfPage from './pages/BookshelfPage.jsx';
import FilmsPage from './pages/FilmsPage.jsx';
import FunThingsPage from './pages/FunThingsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PhotographsPage from './pages/PhotographsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ResumePage from './pages/ResumePage.jsx';
import TeasPage from './pages/TeasPage.jsx';
import TravelPage from './pages/TravelPage.jsx';
import WritingPage from './pages/WritingPage.jsx';
import ZinesPage from './pages/ZinesPage.jsx';

const pages = {
  about: AboutPage,
  bookshelf: BookshelfPage,
  films: FilmsPage,
  'fun-things': FunThingsPage,
  photographs: PhotographsPage,
  projects: ProjectsPage,
  resume: ResumePage,
  teas: TeasPage,
  travel: TravelPage,
  writing: WritingPage,
  zines: ZinesPage,
};

function getPage() {
  const requestedPage = window.location.hash.slice(1);
  return pages[requestedPage] ? requestedPage : 'home';
}

export default function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const syncPage = () => setPage(getPage());
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  const Page = pages[page] ?? HomePage;

  return (
    <div className={`site-shell site-${page}`}>
      <Page />
    </div>
  );
}
