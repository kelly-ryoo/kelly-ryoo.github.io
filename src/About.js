import React, { useEffect, useRef } from "react";
import image from "./img/headshot.jpg"
import CircleType from "circletype";

/* https://circletype.labwire.ca/ */
export default function About(){
  const circleInstance = useRef();
  useEffect(() => {
    new CircleType(circleInstance.current).radius(200);
  }, []);

  return (
    <div className="About longerpg section-1" id="About">

        <div className="title-wrapper">
          <h1 className="title title-name" id="about-title" ref={circleInstance}>About</h1>
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <img src={image} className="headshot"></img>
          </div>
        </div>

        <div className="row about-p-wrapper">
          <div className="col-12 d-flex justify-content-center">
            <p className="about-p">
            Hello, I’m Kelly! I'm currently a sophomore at the College of Arts and Sciences at Cornell University, Ithaca, NY. 
            My interests include software engineering, machine learning, front-end website development, and graphic deisgn. 
            I also love reading, playing the guitar, watercoloring, and recently I've been trying to learn how to skateboard. 
            <br></br>
            <br></br>
            <span className="italics">Feel free to contact me at <a href="mailTo:kyr5@cornell.edu">kyr5@cornell.edu</a>!</span>
            </p>
          </div>
        </div>

    </div>
    )
}

