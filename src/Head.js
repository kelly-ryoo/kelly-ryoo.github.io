import React from 'react'
import $ from "jquery"
import logo from './img/logo.png'
/*https://github.com/michalsnik/aos*/

export default function Head(){

  var idleTime = 0;
  $(document).ready(function () {
  //Increment the idle time counter every minute.
  var idleInterval = setInterval(timerIncrement, 1000); // 1 minute
  
  //Zero the idle timer on mouse movement.
  $(this).mousemove(function (e) {
      idleTime = 0;
      $('.navbar').fadeIn('slow');
  });
  $(this).keypress(function (e) {
      idleTime = 0;
  });
  });
  
  function timerIncrement() {
  idleTime = idleTime + 1;
  if (idleTime > 1) {
    $('.navbar').fadeOut('slow');
  }
  }


    return (
    <div className="Head exactpg section-0" id="Head">
        <div className="topLogo" id="topLogo"><a href="#Head"><img src={logo}></img></a></div>

          <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#About">about</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Education">education</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Experience">experience</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#Extracurriculars">extracurriculars</a>
                </li>
              </ul>
            </div>
          </nav>

        <div className="head-title-wrapper" y={[-20, 20]} tagOuter="figure">
            <h1 className="title title-name">Kelly Ryoo</h1>
          <p className="title-subtitle">computer science student</p>
        </div>
    </div>
    )
}


