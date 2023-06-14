import React, { useEffect, useState } from "react";
import "../Header/CaroEffect.css";
import Carousel from "react-bootstrap/Carousel";

import axios from "axios";

function CarouselEffect({ dark }) {
  const [caro, setCaro] = useState([]);

  const getAllCarousel = async () => {
    const { data } = await axios.get("https://food-backend-lime.vercel.app/caro/caro-get");
    if (data) {
      setCaro(data.caro);
    }
    // console.log(data.caro);
  };

  useEffect(() => {
    getAllCarousel();
  }, []);
  return (
    <div className="">
      <Carousel className={`carouse ${!dark ? "carousel" : "carousel_1"}`}>
        {caro.map((c) => {
          return (
            <Carousel.Item interval={1000} className=""  key={c._id}>
              <img className="img" src={c.image.URL} alt="First slide" />
              <Carousel.Caption className="caption1">
                <h3>{c.heading}</h3>
                <p>
                 {c.title}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
