// Ejemplo de un slider básico en Hero.jsx
import React from "react";
import Slider from "react-slick";

  function Hero() {
    const settings = {
      dots: true,  // Mostrar puntos de navegación
      infinite: true,  // Carrusel infinito
      speed: 500,  // Velocidad de transición
      slidesToShow: 1,  // Mostrar solo una imagen a la vez
      slidesToScroll: 1,  // Desplazar una imagen a la vez
      autoplay: true,  // Hacer que el carrusel se mueva automáticamente
      autoplaySpeed: 3000,  // Velocidad del autoplay
      arrows: false,  // Desactivar flechas de navegación
      centerMode: true,  // Activar el modo centrado
      focusOnSelect: true,  // Focalizar la imagen seleccionada
  };

  return (
    <section className="relative bg-pink-100 py-12">
      <Slider {...settings}>
        <div className="relative">
          <img
            src="/img/1.jpg"  // Asegúrate de que las imágenes estén correctamente ubicadas
            alt="Producto 1"
            className="w-full h-80 sm:h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl font-bold">
            ¡Mirá nuestras remeras personalizadas!
          </div>
        </div>
        <div className="relative">
          <img
            src="/img/2.jpg"  // Asegúrate de que las imágenes estén correctamente ubicadas
            alt="Producto 2"
            className="w-full h-80 sm:h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl font-bold">
            ¡Mirá nuestras remeras personalizadas!
          </div>
        </div> 
      </Slider>
    </section>
  );
}

export default Hero;
