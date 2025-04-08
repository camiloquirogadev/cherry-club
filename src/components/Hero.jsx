// src/components/Hero.jsx
import heroImg from '/img/logo.png' // cambiá el nombre si tenés otra imagen

const Hero = () => {
  return (
    <section className="bg-pink-50 py-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-4 gap-8">

        {/* Texto */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 leading-tight">
            Productos personalizados <br className="hidden md:block" />
            hechos con 💖
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Remeras, tazas y stickers con diseños únicos. ¡Creamos algo especial para vos!
          </p>
          <a href="#productos">
            <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
              Ver productos
            </button>
          </a>
        </div>

         {/* Imagen */}
        <div className="flex-1 flex justify-center">
          <img
            src={heroImg}
            alt="Cherry Club productos personalizados"
            className="w-[300px] md:w-[400px] lg:w-[500px] rounded-2xl shadow-md object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
