import React from "react";

function Footer() {
  return (
    <footer className="bg-pink-100 text-pink-800 text-center py-6 mt-10">
      <p className="mb-2">
        &copy; {new Date().getFullYear()} Cherry Club. Todos los derechos reservados.
      </p>
      <a
        href="https://www.instagram.com/tienda.cherry.club/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        🍒 Seguinos en Instagram @tienda.cherry.club
      </a>
    </footer>
  );
}

export default Footer;
