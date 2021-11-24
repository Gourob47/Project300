import React from "react";
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';

const Slider = () => {
  return (
    <Carousel fade>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.pexels.com/photos/1128783/pexels-photo-1128783.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="Wedding"
      />
      <Carousel.Caption>
        <h3>Wedding</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.pexels.com/photos/3473085/pexels-photo-3473085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="Second slide"
      />
  
      <Carousel.Caption>
        <h3>Concert</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.pexels.com/photos/1604991/pexels-photo-1604991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Exhibition</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  );
};

export default Slider;
