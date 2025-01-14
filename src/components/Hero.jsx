import React, { useState, useEffect } from "react";
import heroImage1 from "../assets/images/BG.jpg";
import heroImage2 from "../assets/images/HeroBanner.jpg";
import heroImage3 from "../assets/images/Groceries.jpg";
import heroImage4 from "../assets/images/Accessories.jpg";
import heroImage5 from "../assets/images/perfumes.jpg";

const Hero = () => {
  const images = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,  
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative bg-cover bg-center h-[90vh] flex items-center justify-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-20 text-center text-white p-8">
        <h1 className="text-5xl font-extrabold mb-4 text-shadow-md animate__animated animate__fadeIn animate__delay-1s">
          Welcome to ShopEase
        </h1>
        <p className="text-xl mb-6 text-shadow-md animate__animated animate__fadeIn animate__delay-2s">
          Shop the best products online in your ease
        </p>
        <button
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-lg rounded-lg transition transform hover:scale-110 duration-300 ease-in-out"
          onClick={scrollDown}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
