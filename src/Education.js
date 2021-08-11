import React from 'react';
import map from './img/map.png'

class Education extends React.Component {
  render() {
    return (
    <div className="Education longerpg" id="Education">
        <div className="title-wrapper">
          <h1 className="title title-name">Education</h1>
        </div>

        <div className="row degree-wrapper">
          <div className="col-12 d-flex justify-content-center">
            <h6 className="degree">B.A. in Computer Science</h6>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <span className="italics">expected May 2024</span>
          </div>
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <a href="https://www.cornell.edu/" target="_blank"><img src={map} className="map"></img></a>
          </div>
        </div>
    </div>
    )
  }
}

export default Education;
