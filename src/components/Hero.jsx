import React from "react";
import Slider from "react-slick";  // Importamos react-slick

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
  };

  return (
    <section className="relative bg-pink-100 py-12">
      <Slider {...settings}>
        {/* Producto 1 */}
        <div className="relative">
          <img
            src="/img/1.jpg"  // Ruta de la imagen (asegúrate de tener la imagen en la carpeta public/img/)
            alt="Producto 1"
            className="w-full h-80 sm:h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl font-bold">
            ¡Mirá nuestras remeras personalizadas!
          </div>
        </div>

        {/* Producto 2 */}
        <div className="relative">
          <img
            src="/img/2.jpg"
            alt="Producto 2"
            className="w-full h-80 sm:h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl font-bold">
            Tazas con diseños únicos
          </div>
        </div>

        {/* Producto 3 */}
        <div className="relative">
          <img
            src="/img/3.jpg"
            alt="Producto 3"
            className="w-full h-80 sm:h-96 object-cover rounded-lg"
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

