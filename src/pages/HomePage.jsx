import { useRef } from 'react';
import Name from '../components/Name.jsx';
import { interests } from '../data/pages.js';

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

export default Home;
