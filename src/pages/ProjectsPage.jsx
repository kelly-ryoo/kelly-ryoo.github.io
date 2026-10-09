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

export default ProjectsPage;
