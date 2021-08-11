import React, { useEffect, useRef } from "react";
import image from "./img/headshot.png"
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
            Hello, I’m Kelly! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            <br></br>
            <br></br>
            <span className="italics">Contact me at <a href="mailTo:gl443@cornell.edu">gl443@cornell.edu</a>!</span>
            </p>
          </div>
        </div>

    </div>
    )
}

