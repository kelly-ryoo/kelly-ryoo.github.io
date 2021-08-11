import React from "react";

class Experience extends React.Component {
  render() {
    return (
    <div className="Experience longerpg" id="Experience">
        <div className="title-wrapper">
          <h1 className="title title-name">Experience</h1>
        </div>
        

        <div class="timeline-wrapper">
        <div className="timeline">

          {/* 1 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Intern at Ben Kallos’ Campaign for Manhattan Borough President</h6>
            <span className="timeline-date">Winter 2020 - Present</span>
            <div className="timeline-descrip">
              <ul>
                <li>Increased ballot access by using platforms such as MiniVan to collect petition signatures from voters</li>
                <li>Organized voter outreach by connecting with residents through phone banking, petitioning, emailing, etc.</li>
                <li>Navigated excel and organized data to utilize voter information and petition signatures</li>
                <li>Built fundraising lists to organize accurate data regarding funds for the campaign</li>
              </ul>
            </div>
          </div>

          {/* 2 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Student Manager at Cornell Dining</h6>
            <span className="timeline-date">Fall 2020 - Present</span>
            <div className="timeline-descrip">
              <ul>
                <li>Served 200+ students daily through managing the hot line, salad bar, drinks station, and line host</li>
                <li>Managed payroll, scheduled weekly shifts, and trained all workers</li>
                <li>Maintained high standards of customer service during high-volume, fast-paced operations</li>
              </ul>
            </div>
          </div>

        {/* 3 */}
        <div className="timeline-el">
            <h6 className="timeline-head">Intern at Summer Youth Enrollment Program (SYEP)</h6>
            <span className="timeline-date">Summer 2020</span>
            <div className="timeline-descrip">
              <ul>
                <li>Devised solution designs for multivariable problems and partnered with a company, EmpireBlue</li>
                <li>Collaborated to formulate presentations on potential solutions to food deserts and inequity</li>
              </ul>
            </div>
          </div>

        {/* 4 */}
        <div className="timeline-el">
            <h6 className="timeline-head">Teacher’s Assistant at Overseas Chinese Mission Summer Camp</h6>
            <span className="timeline-date">Summer 2019</span>
            <div className="timeline-descrip">
              <ul>
                <li>Assisted with daily supervision of 60+ students during field trips, class activities, snack breaks, etc.</li>
                <li>Planned lessons and prepared materials for selected math and reading lessons</li>
                <li>Maintained order in the classroom and resolved conflict between students</li>
              </ul>
            </div>
          </div>

        {/* 5 */}
        <div className="timeline-el last-el">
            <h6 className="timeline-head">Tutor at Mr. Li’s Learning Center</h6>
            <span className="timeline-date">Spring 2017 - 2019</span>
            <div className="timeline-descrip">
              <ul>
                <li>Conducted one-on-one private sessions for strategies regarding test-taking, studying, note-taking, etc.</li>
              </ul>
            </div>
          </div>

      
      </div>
      </div>
      </div>
    )
  }
}

export default Experience;
