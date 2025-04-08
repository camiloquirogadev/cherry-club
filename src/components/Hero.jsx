import React from "react";
import Slider from "react-slick";

function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="relative bg-pink-100 py-16">
      <Slider {...settings}>
        {/* Producto 1 */}
        <div className="relative">
          <img
            src="/img/producto1.jpg"  // Cambia estas imágenes por las tuyas
            alt="Producto 1"
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl font-bold">
            ¡Mirá nuestras remeras personalizadas!
          </div>
        </div>
        {/* Producto 2 */}
        <div className="relative">
          <img
            src="/img/product2.jpg"  // Cambia estas imágenes por las tuyas
            alt="Producto 2"
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl font-bold">
            Tazas con diseños únicos
          </div>
        </div>
        {/* Producto 3 */}
        <div className="relative">
          <img
            src="/img/product3.jpg"
            alt="Producto 3"
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl font-bold">
            Vinilos decorativos personalizados
          </div>
        </div>
      </Slider>
    </section>
  );
}

export default Hero;
