import React from "react";
//import meubel from './src/assets/meubel.png'
import meubel from "/src/assets/meubel.png";
import { SlArrowRight } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import "./Hero.scss";


const Hero: React.FC = () => {
  const location = useLocation();
  const url = location.pathname;



  return (
    <>
      <div className="herobg">
        <div className="hero">
          <img src={meubel} alt="meubel" className="meubel"/>
          <h1 className="heroHeader">
            {url === "/shop"
              ? "Shop"
              : url === "/checkout"
              ? "Checkout"
              : url === "/cart"
              ? "Cart"
              : "Shop"}
          </h1>
          <div className="heroTexts">
            <a href="/">Home</a>
            <SlArrowRight />
            <a href="">
              {url === "/shop"
                ? "Shop"
                : url === "/checkout"
                ? "Checkout"
                : url === "/cart"
                ? "Cart"
                : "Shop"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
