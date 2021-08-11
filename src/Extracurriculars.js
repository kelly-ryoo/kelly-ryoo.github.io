import React from 'react';

class Extracurriculars extends React.Component {
  render() {
    return (
    <div className="Extracurriculars longerpg" id="Extracurriculars">
        <div className="title-wrapper">
          <h1 className="title title-name">Extracurriculars</h1>
        </div>

        <div class="timeline-wrapper">
        <div className="timeline">
        <div className="dot-container">

          {/* 1 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Design Co-Director at Women In Computing at Cornell</h6>
            <span className="timeline-date">Aug 2021 - Present</span>
            <div className="timeline-descrip">
              <ul>
                <li>Creating designs for organization initiatives, publicity, and merch using Procreate and Figma</li>
              </ul>
            </div>
          </div>

          {/* 2 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Social Co-Director at Women In Computing at Cornell</h6>
            <span className="timeline-date">Spring 2021</span>
            <div className="timeline-descrip">
              <ul>
                <li>Collaborated with the other social co-director to organize and host social events for the executive board and general body</li>
                <li>Strengthened the community of women engineers at Cornell by creating fun activities and events to network with other engineers</li>
              </ul>
            </div>
          </div>

          {/* 3 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Creator Studio Team Lead at Cornell Creatives</h6>
            <span className="timeline-date">Spring 2021</span>
            <div className="timeline-descrip">
              <ul>
                <li>Directed the newly launched Creator Studio program, creating a space for creators to connect and inspire each other</li>
                <li>Led a committee of eight students to organize weekly workshops and events</li>
              </ul>
            </div>
          </div>

          {/* 4 */}
          <div className="timeline-el last-el">
            <h6 className="timeline-head">Graphic Designer at Passionfruit</h6>
            <span className="timeline-date">Fall 2020</span>
            <div className="timeline-descrip">
              <ul>
                <li>Designing and creating graphics for Passionfruit, an online social activism platform</li>
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

export default Extracurriculars;