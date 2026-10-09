function Name({ home = false }) {
  return (
    <a className={`name-mark${home ? ' name-mark-home' : ''}`} href="#home">
      Kelly Ryoo
    </a>
  );
}

export default Name;
