import { useEffect, useRef, useState } from 'react';

const interests = [
  { label: 'films', title: "films i've watched", className: 'interest-films' },
  { label: 'projects', title: "projects i've made", className: 'interest-projects' },
  { label: 'photographs', title: "photographs i've taken", className: 'interest-photographs' },
  { label: 'travel', title: "places i've been", className: 'interest-travel' },
  { label: 'zines', title: "zines i've made", className: 'interest-zines' },
  { label: 'bookshelf', title: "books i've read", className: 'interest-bookshelf' },
  { label: 'teas', title: "teas i've drank", className: 'interest-teas' },
  { label: 'writing', title: "things i've written", className: 'interest-writing' },
  { label: 'films', title: "films i've watched", className: 'interest-movies' },
];

const secondaryPages = [
  { label: 'resume', title: 'resume' },
  { label: 'fun-things', title: 'fun things' },
];

const resumeVersions = [
  { id: 'engineering', label: 'Engineering', file: '/resumes/RESUME.pdf' },
  { id: 'writing-media', label: 'Writing & media', file: '/resumes/26JRESUME.pdf' },
];

const projects = [
  {
    number: '01',
    title: 'Plant Pals',
    period: 'Spring 2023',
    place: 'Ithaca, NY',
    description: 'An information retrieval system for finding plants by name, characteristics, or care needs. It ranks relevant results with Jaccard and cosine similarity, then refines suggestions based on user feedback with Rocchio’s algorithm.',
    collaboration: 'Built over two months with four other students.',
    skills: 'Python, SQL, HTML, CSS, JavaScript, information retrieval',
    image: '/projects/plant-pals.jpg',
    imageAlt: 'Plant Pals search results interface with plant recommendations',
    href: 'https://github.com/lyradsouza/4300-Plant-Pals',
    linkLabel: 'View source',
  },
  {
    number: '02',
    title: 'Podcast Website',
    period: 'Winter 2020',
    place: 'San Jose, CA',
    description: 'The official website for Learn Korean and Korean Culture, created for a podcast with more than 15,000 listeners. It brings together a home page, a complete episode list, and a page for each episode.',
    collaboration: 'Designed in Figma and Procreate, then built with React in one week.',
    skills: 'Figma, Procreate, React, HTML, CSS, Bootstrap',
    image: '/projects/podcast-website.jpg',
    imageAlt: 'Learn Korean and Korean Culture podcast website homepage',
    href: 'https://learnkoreanandkoreanculture.github.io/podcast/#/',
    linkLabel: 'Visit website',
  },
  {
    number: '03',
    title: 'Sleep Stage Deep Learning',
    period: 'Summer 2021',
    place: 'University of Missouri',
    description: 'A deep learning research project using polysomnography data to classify sleep stages, with the goal of making sleep monitoring more automatic, non-invasive, and accessible. The research was funded by the National Science Foundation.',
    collaboration: 'Developed with two other students.',
    skills: 'Python, PyTorch, LaTeX',
    image: '/projects/sleep-stage-research.jpg',
    imageAlt: 'Research poster and paper on non-invasive sleep stage classification',
  },
  {
    number: '04',
    title: 'iOS Flashcard App',
    period: 'Fall 2020',
    place: 'Ithaca, NY',
    description: 'A Quizlet-inspired flashcard app where people can create an account, build study sets, and add cards to each set.',
    collaboration: 'Built with four teammates across backend, frontend, and design.',
    skills: 'Swift, iOS',
    image: '/projects/flashcard-app.jpg',
    imageAlt: 'iOS flashcard app screens for account creation, login, and welcome',
    href: 'https://github.com/kelly-ryoo/flashcard-app-hack-challenge-frontend',
    linkLabel: 'View source',
  },
  {
    number: '05',
    title: 'Minesweeper Game',
    period: 'Fall 2019',
    place: 'Cupertino, CA',
    description: 'A JavaFX version of the classic Minesweeper game, with beginner, medium, and expert boards, flagging, and recursive cell reveals.',
    collaboration: 'Built on starter code for a programming project.',
    skills: 'Java, JavaFX',
    image: '/projects/minesweeper.jpg',
    imageAlt: 'Minesweeper game board screenshot',
    href: 'https://github.com/kelly-ryoo/Game-Minesweeper/tree/master',
    linkLabel: 'View source',
  },
];

function getPage() {
  const requestedPage = window.location.hash.slice(1);
  return requestedPage === 'about'
    || interests.some(({ label }) => label === requestedPage)
    || secondaryPages.some(({ label }) => label === requestedPage)
    ? requestedPage
    : 'home';
}

function Name({ home = false }) {
  return (
    <a className={`name-mark${home ? ' name-mark-home' : ''}`} href="#home">
      Kelly Ryoo
    </a>
  );
}

function Home() {
  const interestField = useRef(null);

  function applyRepulsion(activeInterest) {
    const field = interestField.current;
    if (!field) return;

    const interests = [...field.querySelectorAll('.interest')];
    const activeBounds = activeInterest.getBoundingClientRect();
    const activeX = activeBounds.left + activeBounds.width / 2;
    const activeY = activeBounds.top + activeBounds.height / 2;
    const maxOffset = window.matchMedia('(max-width: 900px)').matches ? 8 : 18;
    const radius = Math.hypot(field.clientWidth, field.clientHeight);

    interests.forEach((interest) => {
      if (interest === activeInterest) {
        interest.style.setProperty('--repel-x', '0px');
        interest.style.setProperty('--repel-y', '0px');
        return;
      }

      const bounds = interest.getBoundingClientRect();
      const deltaX = bounds.left + bounds.width / 2 - activeX;
      const deltaY = bounds.top + bounds.height / 2 - activeY;
      const distance = Math.hypot(deltaX, deltaY) || 1;
      const strength = maxOffset * Math.max(.24, 1 - distance / radius);

      interest.style.setProperty('--repel-x', `${deltaX / distance * strength}px`);
      interest.style.setProperty('--repel-y', `${deltaY / distance * strength}px`);
    });
  }

  function clearRepulsion() {
    interestField.current?.querySelectorAll('.interest').forEach((interest) => {
      interest.style.setProperty('--repel-x', '0px');
      interest.style.setProperty('--repel-y', '0px');
    });
  }

  return (
    <main className="home-page" aria-label="Kelly Ryoo home">
      <section
        className="interest-field"
        aria-label="Interests"
        ref={interestField}
        onPointerLeave={clearRepulsion}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) clearRepulsion();
        }}
      >
        {interests.map(({ label, className }, index) => (
          <a
            className={`interest ${className}`}
            style={{ '--order': index }}
            href={`#${label}`}
            key={className}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') applyRepulsion(event.currentTarget);
            }}
            onFocus={(event) => applyRepulsion(event.currentTarget)}
          >
            {label}
          </a>
        ))}
        <div className="home-center">
          <Name home />
          <a className="about-link" href="#about">about me</a>
        </div>
      </section>
      <a className="home-corner-link" href="#about" aria-label="Read about Kelly">↗</a>
    </main>
  );
}

function About() {
  return (
    <main className="about-page">
      <a className="home-back" href="#home" aria-label="Back to home"><span aria-hidden="true">↖</span> home</a>
      <section className="about-copy" aria-labelledby="about-title">
        <header className="about-heading page-reveal" style={{ '--reveal-order': 0 }}>
          <span className="hello">Hi, I’m</span>
          <div className="name-wrap">
            <span className="name-pronunciation">Yeonha</span>
            <h1 id="about-title"><Name /></h1>
          </div>
        </header>
        <p className="intro-line page-reveal" style={{ '--reveal-order': 1 }}>and I work at the intersection of <strong>technology,</strong></p>
        <div className="bio-copy">
          <p className="page-reveal" style={{ '--reveal-order': 2 }}>I’m from South Korea, grew up in the San Francisco Bay Area, but now call <a href="https://en.wikipedia.org/wiki/New_York_City"><em>New York City</em></a> home.</p>
          <p className="page-reveal" style={{ '--reveal-order': 3 }}>I’ve been a <a href="https://www.cisco.com/"><em>software engineer</em></a> at <a href="https://www.cisco.com/"><em>Cisco</em></a> for 2 years now, where I build custom AI solutions, bridging my interests in tech and the humanities through <a href="https://en.wikipedia.org/wiki/Digital_humanities"><em>digital humanities</em></a>.</p>
          <p className="page-reveal" style={{ '--reveal-order': 4 }}>I graduated from Cornell University in 2024 with a B.A. in <a href="https://www.cs.cornell.edu/"><em>Computer Science</em></a> and <a href="https://english.cornell.edu/"><em>English</em></a>.</p>
          <p className="page-reveal" style={{ '--reveal-order': 5 }}>On the weekends, you’ll often find me... brewing gongfu tea, picking up a new book, writing, making a new zine, or frolicking through the city!</p>
        </div>
      </section>
      <aside className="about-side" aria-label="More about Kelly">
        <div className="role-cloud page-reveal" style={{ '--reveal-order': 1 }} aria-hidden="true">
          <span>writer</span>
          <span>bibliophile</span>
          <span>engineer</span>
          <span>designer</span>
          <span>artist</span>
        </div>
        <figure className="portrait-frame page-reveal" style={{ '--reveal-order': 3 }}>
          <img src="/images/profile.png" alt="Kelly at an archaeological site" />
        </figure>
        <nav className="about-links page-reveal" style={{ '--reveal-order': 5 }} aria-label="More links">
          <a href="#resume">resume</a>
          <a href="#projects">projects</a>
          <a href="#writing">writings</a>
          <a href="mailto:ryoo.kellyy@gmail.com">contact</a>
        </nav>
      </aside>
    </main>
  );
}

function ResumeEntry({ organization, location, role, dates, children }) {
  return (
    <article className="resume-entry">
      <div className="resume-entry-heading">
        <h3>{organization}</h3>
        <span>{location}</span>
      </div>
      <div className="resume-entry-subheading">
        <p>{role}</p>
        <span>{dates}</span>
      </div>
      {children}
    </article>
  );
}

function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      <div className="resume-section-content">{children}</div>
    </section>
  );
}

function SupascribeFeed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.supascribe.com/v1/loader/S2GANcT3knSZIb6FLHA5xRfpo5s1.js';
    script.async = true;
    document.body.append(script);

    return () => script.remove();
  }, []);

  return <div className="supascribe-feed" data-supascribe-embed-id="246444627998" data-supascribe-feed />;
}

function ResumePage() {
  const [version, setVersion] = useState('engineering');
  const isEngineering = version === 'engineering';
  const selectedVersion = resumeVersions.find(({ id }) => id === version);

  return (
    <main className="resume-page">
      <a className="home-back resume-back" href="#home" aria-label="Back to home"><span aria-hidden="true">↖</span> home</a>
      <header className="resume-toolbar">
        <div>
          <p className="resume-kicker">Kelly Ryoo <span>/</span> Resume</p>
          <h1>Resume</h1>
        </div>
        <div className="resume-actions">
          <div className="resume-switch" role="group" aria-label="Choose resume version">
            {resumeVersions.map(({ id, label }) => (
              <button
                aria-pressed={version === id}
                key={id}
                onClick={() => setVersion(id)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <a className="resume-download" href={selectedVersion.file} download>
            Download PDF <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <article className="resume-document" aria-label={`${selectedVersion.label} resume`}>
        <header className="resume-contact">
          <h2>Kelly Ryoo</h2>
          <address>
            <span>New York, NY</span>
            <a href="tel:+16692715044">669-271-5044</a>
            <a href="mailto:ryoo.kellyy@gmail.com">ryoo.kellyy@gmail.com</a>
            <a href="https://linkedin.com/in/kelly-ryoo" target="_blank" rel="noreferrer">LinkedIn</a>
          </address>
        </header>

        {isEngineering ? (
          <>
            <ResumeSection title="Education">
              <ResumeEntry organization="Cornell University, College of Arts and Sciences" location="Ithaca, NY" role="Bachelor of Arts in Computer Science, Literatures in English" dates="May 2024">
                <p>GPA: 3.8/4.0 (Dean’s List)</p>
                <p>Coursework: Analysis of Algorithms, Intro to Artificial Intelligence, Intro to Machine Learning, Language and Information, Operating Systems, Computer System Organization and Programming, Functional Programming, Discrete Structures, Object Oriented Programming and Data Structures</p>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Experience">
              <ResumeEntry organization="Cisco Systems" location="New York, NY" role="Software Engineer" dates="September 2024 – Present">
                <ul>
                  <li>Engineered an end-to-end agentic AI NL2SQL pipeline (LangGraph, LLM, Python) with custom prompt engineering to help 20K+ company sellers query business data without SQL knowledge, with automated retry and LLM-driven query correction on failure.</li>
                  <li>Built a RAG-backed context pipeline for the NL2SQL system using pgvector similarity search over a PostgreSQL knowledge base of schemas, business glossary, and example queries, with Redis for conversational memory.</li>
                  <li>Designed MCP servers and a Python REST wrapper API around Helios, an internal AI assistant, enabling engineering teams to build and extend custom chatbot applications on top of existing AI infrastructure.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Cornell University" location="Ithaca, NY" role="Teaching Assistant" dates="January – May 2024">
                <ul>
                  <li>Supported 100+ students in CS 4300 (Language and Information); hosted weekly office hours, assessed homeworks and final projects, advised and mentored a team of students about information retrieval systems (Python) and web development.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Cisco Systems" location="San Jose, CA" role="Software Engineering Intern" dates="June – August 2023">
                <ul>
                  <li>Analyzed lower-level forecast data and built out two machine learning models (Linear Regression, Neural Network) in Python and TensorFlow to predict company-wide earnings and improve forecasting process.</li>
                  <li>Automated product test cases for NGF using Cucumber and Selenium, writing 26 scenarios, 11 step definitions, and 18 Java functions, thereby reducing manual testing effort significantly.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="McMahon Lab" location="Ithaca, NY" role="Undergraduate Researcher" dates="January – October 2021">
                <ul>
                  <li>Programmed lab laser instruments with Python to enable experiments and collection of data.</li>
                  <li>Formulated experiments with the RSA (Real Time Spectrum Analyzer) machine and wrote Python code to collect data during swept mode.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="University of Missouri" location="Columbia, MO" role="Research Intern" dates="May – July 2021">
                <ul>
                  <li>Conducted literature reviews of 10 research papers about bed sensors and sleep data machine learning algorithms.</li>
                  <li>Collaborated with two other interns to design and program a deep learning (CNN-LSTM hybrid) model that classifies polysomnography data, achieving a noninvasive solution to monitor sleep quality and related disorders.</li>
                  <li>Attained an 85% accuracy rate using PyTorch to preprocess, extract features, and classify sleep stages.</li>
                </ul>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Projects">
              <ResumeEntry organization="Plant Pals" location="" role="" dates="Spring 2023">
                <ul>
                  <li>Designed and programmed an online information retrieval system that allows users to query plant information.</li>
                  <li>Implemented Jaccard similarity, Cosine similarity, and Rocchio’s relevance feedback algorithms in Python.</li>
                  <li>Built the front-end layout and website features using HTML, CSS, and JavaScript.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Podcast Website" location="" role="" dates="Summer 2021">
                <ul>
                  <li>Designed the website layout, user interface, and visual graphics for the podcast “Learn Korean and Korean Culture” to serve over 90,000 listeners, then programmed the website using React, HTML, CSS, and Bootstrap.</li>
                </ul>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Skills & interests">
              <p><strong>Programming:</strong> Python, Java, SQL (Oracle, PostgreSQL), JavaScript, React, HTML/CSS, C, OCaml, R</p>
              <p><strong>Tools & skills:</strong> LangGraph, LangChain, FastAPI, REST APIs, Flask, vector search, Redis, Git, Selenium, Cucumber, PyTorch, Bootstrap, Anthropic, OpenAI, NLP, Agile, RAG, LLM</p>
              <p><strong>Interests:</strong> AI and technology policy, large language models, digital humanities, literature, social impacts of tech</p>
            </ResumeSection>
          </>
        ) : (
          <>
            <ResumeSection title="Education">
              <ResumeEntry organization="Cornell University, College of Arts and Sciences" location="Ithaca, NY" role="Bachelor of Arts in Computer Science, Literatures in English" dates="May 2024">
                <p>GPA: 3.8/4.0 (Dean’s List)</p>
                <p>Coursework: Intro to Artificial Intelligence, Intro to Machine Learning, Language and Information, Analysis of Algorithms</p>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Writing & media">
              <ResumeEntry organization="State of the Pod" location="Ithaca, NY" role="Writer and Host" dates="August 2021 – May 2023">
                <ul>
                  <li>Co-wrote, produced, and hosted episodes for a student-run tech and science podcast, collaborating with a team of two in a professional podcast studio.</li>
                  <li>Researched and reported on AI topics including generative art, creative authorship, and AI language and humor for a public audience.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Guac Magazine" location="Ithaca, NY" role="Staff Writer" dates="August 2022 – May 2024">
                <ul>
                  <li>Wrote and revised travel and culture articles covering East Asia, Europe, and beyond through the full editorial process, from pitching to print and digital (Medium) publication.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Creme de Cornell" location="Ithaca, NY" role="Editor" dates="January 2022 – May 2024">
                <ul>
                  <li>Edited food and cooking stories for grammar, style, and flow; worked directly with writers to develop and refine pitches in line with magazine standards.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Learn Korean and Korean Culture Podcast" location="Remote" role="Creator, Host, Producer" dates="August 2020 – November 2021">
                <ul>
                  <li>Independently researched, scripted, recorded, edited, and published a podcast that grew to 90,000+ listeners across platforms, maintaining a 4.9 star-rating on Spotify with nearly 200 reviews.</li>
                  <li>Designed and coded the companion website from scratch using Figma, React, HTML, CSS, and Bootstrap.</li>
                  <li>Produced supplementary educational materials (vocabulary lists, resource guides) and managed all marketing and distribution.</li>
                </ul>
              </ResumeEntry>
              <ResumeEntry organization="Gatty Rewind Podcast, Cornell Southeast Asia Program" location="Ithaca, NY" role="Producer" dates="August 2023 – May 2024">
                <ul>
                  <li>Managed end-to-end podcast production including recording, audio editing in Adobe Audition, and mic setup.</li>
                  <li>Wrote episode descriptions and created promotional and marketing materials in Figma.</li>
                  <li>Collaborated closely with the host to develop episode concepts and maintain consistent editorial voice.</li>
                </ul>
              </ResumeEntry>
            </ResumeSection>

            <ResumeSection title="Skills & interests">
              <p><strong>Programming:</strong> Python, Java, SQL (Oracle, PostgreSQL), JavaScript, React, HTML/CSS, C, OCaml, R, LangGraph, FastAPI, REST APIs, Flask, vector search, Redis, Git, Selenium, Cucumber, PyTorch, Bootstrap, Anthropic, OpenAI, NLP, Agile, RAG, LLM</p>
              <p><strong>Media & design:</strong> Adobe Audition, Adobe Lightroom, Figma, podcast production, scripting, web publishing</p>
              <p><strong>Interests:</strong> AI and technology policy, large language models, digital humanities, literature, social impacts of tech</p>
            </ResumeSection>
          </>
        )}
      </article>
    </main>
  );
}

function CollectionPage({ page }) {
  const { title } = interests.find(({ label }) => label === page)
    ?? secondaryPages.find(({ label }) => label === page);

  return (
    <main className="collection-page">
      <a className="home-back collection-back page-reveal" href="#home" aria-label="Back to home"><span aria-hidden="true">↖</span> home</a>
      <header className="collection-heading page-reveal" style={{ '--reveal-order': 0 }}>
        <h1>{title}</h1>
      </header>
      <section className="collection-content page-reveal" style={{ '--reveal-order': 1 }} aria-label={`${title} collection`}>
        {page === 'photographs' && (
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
        )}
        {page === 'writing' && (
          <div className="substack-writing">
            <div className="substack-writing-intro">
              <p className="substack-kicker">RYU <span>/</span> Substack</p>
              <h2>ryu’s internet journal ✏️</h2>
              <p>(relatively) organized word vomits</p>
              <a href="https://substack.com/@jerryryoo" target="_blank" rel="noreferrer">
                Read the publication <span aria-hidden="true">↗</span>
              </a>
            </div>
            <SupascribeFeed />
          </div>
        )}
      </section>
    </main>
  );
}

const bookshelfShelves = [
  { id: 'read', label: 'Read', title: 'Books I’ve read' },
  { id: 'currently_reading', label: 'Currently reading', title: 'Currently reading' },
  { id: 'to_read', label: 'Want to read', title: 'Want to read' },
];

function BookshelfPage() {
  const [shelf, setShelf] = useState('read');
  const [library, setLibrary] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const selectedShelf = bookshelfShelves.find(({ id }) => id === shelf);
  const books = library?.shelves?.[shelf] ?? [];

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
          <p className="bookshelf-kicker">Kelly Ryoo <span>/</span> StoryGraph</p>
          <h1>{selectedShelf.title}</h1>
        </div>
        <a href="https://app.thestorygraph.com/profile/kellyryoo?redirect=true" target="_blank" rel="noreferrer">
          Open StoryGraph <span aria-hidden="true">↗</span>
        </a>
      </header>
      <section className="bookshelf-content page-reveal" style={{ '--reveal-order': 1 }} aria-label="StoryGraph bookshelf">
        <div className="bookshelf-toolbar">
          <div className="bookshelf-switch" role="group" aria-label="Choose a bookshelf">
            {bookshelfShelves.map(({ id, label }) => (
              <button aria-pressed={shelf === id} key={id} onClick={() => setShelf(id)} type="button">
                {label}
              </button>
            ))}
          </div>
          <span className="bookshelf-count">{books.length} {books.length === 1 ? 'book' : 'books'}</span>
        </div>
        {loadError ? (
          <p className="bookshelf-empty" role="status">The bookshelf could not be loaded right now.</p>
        ) : library === null ? (
          <p className="bookshelf-empty" role="status">Loading bookshelf…</p>
        ) : books.length ? (
          <ol className="bookshelf-list">
            {books.map((book, index) => (
              <li key={book.book_id}>
                <a href={`https://app.thestorygraph.com/books/${encodeURIComponent(book.book_id)}`} target="_blank" rel="noreferrer">
                  <span className="bookshelf-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="bookshelf-book-title">{book.title}</span>
                  <span className="bookshelf-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="bookshelf-empty" role="status">This shelf is empty.</p>
        )}
        {library?.syncedAt && <p className="bookshelf-updated">Updated {new Date(library.syncedAt).toLocaleDateString()}</p>}
      </section>
    </main>
  );
}

function ProjectsPage() {
  return (
    <main className="collection-page projects-page">
      <a className="home-back collection-back page-reveal" href="#home" aria-label="Back to home"><span aria-hidden="true">↖</span> home</a>
      <header className="collection-heading projects-heading page-reveal" style={{ '--reveal-order': 0 }}>
        <p className="projects-kicker">Selected work <span>/</span> 2019–2023</p>
        <h1>Projects</h1>
        <p className="projects-intro">Software, research, and small ideas made real.</p>
      </header>
      <section className="projects-grid" aria-label="Selected projects">
        {projects.map((project, index) => (
          <article
            className="project-item page-reveal"
            key={project.number}
            style={{ '--reveal-order': index + 1 }}
          >
            <img className="project-image" src={project.image} alt={project.imageAlt} loading="lazy" />
            <div className="project-details">
              <div className="project-meta">
                <span>{project.number} <span aria-hidden="true">/</span> {project.period}</span>
                <span>{project.place}</span>
              </div>
              <h2>{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <p className="project-collaboration">{project.collaboration}</p>
              <p className="project-skills"><strong>Made with</strong> {project.skills}</p>
              {project.href && (
                <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
                  {project.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const syncPage = () => setPage(getPage());
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  return (
    <div className={`site-shell site-${page}`}>
      {page === 'about'
        ? <About />
        : page === 'resume'
          ? <ResumePage />
        : page === 'projects'
          ? <ProjectsPage />
        : page === 'bookshelf'
          ? <BookshelfPage />
        : interests.some(({ label }) => label === page) || secondaryPages.some(({ label }) => label === page)
          ? <CollectionPage page={page} />
          : <Home />}
    </div>
  );
}