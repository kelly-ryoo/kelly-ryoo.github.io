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
            <h6 className="timeline-head">Coordinator and Outreach Manager at Asian American Intervarsity</h6>
            <span className="timeline-date">Fall 2020 - Present</span>
            <div className="timeline-descrip">
              <ul>
                <li>Planned and led weekly Zoom meetings for 50+ people</li>
                <li>Oversaw communications team and managed instagram, facebook, website, email, etc.</li>
                <li>Predispotionally invited speakers, mapped out weekly topics, and oversaw roles such as tech, emcee, and scribe</li>
              </ul>
            </div>
          </div>

          {/* 2 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Communication Liaison (E-board) at Students Helping Honduras</h6>
            <span className="timeline-date">Fall 2020 - Present</span>
            <div className="timeline-descrip">
              <ul>
                <li>Attended weekly meetings and discussed ways to provide every Honduran child quality access to education</li>
                <li>Fundraised over $200 through virtual game nights, suggested donations, venmo challenges, etc.</li>
              </ul>
            </div>
          </div>

          {/* 3 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Member of Phi Alpha Delta Law Fraternity</h6>
            <span className="timeline-date">Fall 2020 - Present</span>
            <div className="timeline-descrip">
              <ul>
                <li>Prepared weekly presentations regarding topics such as humanitarian crises and controversial cases</li>
                <li>Participated in events such as Douglas debate, speech, and coffee chats</li>
              </ul>
            </div>
          </div>

          {/* 4 */}
          <div className="timeline-el last-el">
            <h6 className="timeline-head">Captain of PSAL Varsity Volleyball And Club</h6>
            <span className="timeline-date">Fall 2016 - 2020</span>
            <div className="timeline-descrip">
              <ul>
                <li>Committed 25+ hours weekly to training and games regarding individual skills and teamwork</li>
                <li>Supervised drills, workouts, and practices with 15+ students to encourage team chemistry for competitive games</li>
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