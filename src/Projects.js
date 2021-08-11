import React from 'react';

class Projects extends React.Component {
  render() {
    return (
    <div className="Projects longerpg" id="Projects">
        <div className="title-wrapper">
          <h1 className="title title-name">Projects</h1>
        </div>

        <div class="timeline-wrapper">
        <div className="timeline">
        <div className="dot-container">

          {/* 1 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Podcast Website</h6>
            <span className="timeline-date">Summer 2021</span>
            <div className="timeline-descrip">
              <ul>
                <li>Built a website for my podcast Learn Korean and Korean Culture using HTML, CSS, and React</li>
                <li>Check it out <a href="https://learnkoreanandkoreanculture.github.io/podcast/#/" target="_blank">here</a></li>
              </ul>
            </div>
          </div>

          {/* 2 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Flashard App</h6>
            <span className="timeline-date">Fall 2020</span>
            <div className="timeline-descrip">
              <ul>
                <li>Collaborated with four other students (1 frontend, 2 backend, 1 design) to build an IOS flashcard app in Swift</li>
                <li>Won first place for Best Remote App at the HackChallenge</li>
                <li>Check out the repo <a href="https://github.com/kelly-ryoo/flashcard-app-hack-challenge-frontend" target="_blank">here</a></li>
              </ul>
            </div>
          </div>

          {/* 3 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Hidden Treasure</h6>
            <span className="timeline-date">Spring 2019</span>
            <div className="timeline-descrip">
              <ul>
                <li>Designed and programmed a text adventure game using Java</li>
                <li>Check out the repo <a href="https://github.com/kelly-ryoo/Game-Hidden-Treasure" target="_blank">here</a></li>
              </ul>
            </div>
          </div>

          {/* 4 */}
          <div className="timeline-el last-el">
            <h6 className="timeline-head">Samurai's Revenger</h6>
            <span className="timeline-date">Spring 2019</span>
            <div className="timeline-descrip">
              <ul>
                <li>Designed and programmed an interactive and responsive adventure game in javaFX with two other students</li>
                <li>Check out the repo <a href="https://github.com/kelly-ryoo/Game-Samurais-Revenge" target="_blank">here</a></li>
              </ul>
            </div>
          </div>

           {/* 5 */}
          <div className="timeline-el last-el">
            <h6 className="timeline-head">Minesweeper</h6>
            <span className="timeline-date">Spring 2019</span>
            <div className="timeline-descrip">
              <ul>
                <li>Programmed the minesweeper game in javaFX</li>
                <li>Check out the repo <a href="https://github.com/kelly-ryoo/Game-Minesweeper" target="_blank">here</a></li>
              </ul>
            </div>
          </div>

        </div>
      
      </div>
      </div>
        
    </div>
    )
  }
}

export default Projects;
