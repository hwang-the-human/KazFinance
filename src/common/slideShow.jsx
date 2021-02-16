import React, { Component } from "react";
import { Fade } from "react-slideshow-image";

class SlideShow extends Component {
  render() {
    const slideImages = ["images/1.jpg", "images/2.jpg", "images/3.jpg"];

    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
      arrows: true,
      pauseOnHover: true,
    };

    return (
      <div className="slide-container">
        <Fade {...properties}>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[0]})` }}></div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[1]})` }}></div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[2]})` }}></div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default SlideShow;
