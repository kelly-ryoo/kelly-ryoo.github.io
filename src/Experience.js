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
            <h6 className="timeline-head">Undergraduate Researcher at McMahon Lab</h6>
            <span className="timeline-date">Jan 2021 - Present</span>
            <div className="timeline-descrip">
              <ul>
                <li>Working at Cornell University's McMahon Lab to research building neural networks through coupling frequency modes in a fiber laser</li>
                <li>Focusing on programming lab instruments (mainly spectrum analyzers)</li>
              </ul>
            </div>
          </div>

          {/* 2 */}
          <div className="timeline-el">
            <h6 className="timeline-head">Research Intern at the University of Missouri</h6>
            <span className="timeline-date">May 2021 - Jul 2021</span>
            <div className="timeline-descrip">
              <ul>
                <li>Participating in an NSF funded REU (Research Experience for Undergraduates) program focusing on consumer networking technologies</li>
                <li>Collaborated with 2 other interns to design and code a deep learning model to automatically classify sleep stages</li>
                <li>Check out the my presenavirtual forum <a href="https://dl.mospace.umsystem.edu/mu/islandora/object/mu%3A428910" target="_blank">here</a></li>
                <li>Wrote a paper summarizing our work and results, currently working on submitting it to the <a href="https://ieeebibm.org/BIBM2021/" target="_blank">BIBM conference</a></li>
              </ul>
            </div>
          </div>

        {/* 3 */}
        <div className="timeline-el">
            <h6 className="timeline-head">Web Development Intern</h6>
            <span className="timeline-date">Jul 2019 - May 2021</span>
            <div className="timeline-descrip">
              <ul>
                <li>Learned and worked with web development languages (HTML, CSS, Javascript), along with frameworks (Bootstrap) and Wordpress</li>
                <li>Helped build or improve parts of Wordpress websites for clients</li>
                <li>Translated design .psd files into HTML and CSS code </li>
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
