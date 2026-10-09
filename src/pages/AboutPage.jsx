import Name from '../components/Name.jsx';

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
        <p className="intro-line page-reveal" style={{ '--reveal-order': 1 }}>and I’m a builder, artist, and writer. I bridge my interests in tech and the humanities through <a href="https://en.wikipedia.org/wiki/Digital_humanities" target="_blank" rel="noreferrer"><em>digital humanities</em></a>.</p>
        <div className="bio-copy">
          <p className="page-reveal" style={{ '--reveal-order': 2 }}>I’m from South Korea, grew up in the San Francisco Bay Area, but now call <a href="https://www.google.com/maps/search/NY" target="_blank" rel="noreferrer"><em>New York City</em></a> home.</p>
          <p className="page-reveal" style={{ '--reveal-order': 3 }}>I’ve been a <a href="https://www.linkedin.com/in/kelly-ryoo/" target="_blank" rel="noreferrer"><em>software engineer</em></a> at <a href="https://www.cisco.com/" target="_blank" rel="noreferrer"><em>Cisco</em></a> for two years now, where I build custom AI solutions. I graduated from Cornell University in 2024 with a B.A. in <a href="https://www.cs.cornell.edu/" target="_blank" rel="noreferrer"><em>Computer Science</em></a> and <a href="https://english.cornell.edu/" target="_blank" rel="noreferrer"><em>English</em></a>.</p>
          <p className="page-reveal" style={{ '--reveal-order': 4 }}>On the weekends, you’ll often find me... brewing gongfu tea, picking up a new book, writing, making a new zine, or frolicking through the city!</p>
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

export default About;
