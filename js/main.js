// Principio de Mantenibilidad: 'use-strict' previene errores comunes y promueve un código más seguro.
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // 1. INICIALIZACIÓN DE LIBRERÍAS EXTERNAS
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
  });

  // ========================================================
  // 2. LÓGICA DE VENTANAS MODALES (CON ANIMACIÓN DE CIERRE)
  // ========================================================
  const openButtons = document.querySelectorAll("[data-modal-target]");
  const closeButtons = document.querySelectorAll("[data-close-modal]");
  const overlays = document.querySelectorAll(".modal-overlay");

  // Función para cerrar un modal
  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add("is-closing"); // Añade clase para la animación de salida
    // Espera a que termine la animación antes de ocultarlo por completo
    setTimeout(() => {
      modal.classList.remove("is-visible");
      modal.classList.remove("is-closing");
      document.body.style.overflow = "auto";
    }, 350); // Debe coincidir con la duración de la transición en CSS
  };

  // ASIGNAR LISTENERS PARA ABRIR
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      if (modal) {
        // Lógica especial para el modal de Easter Egg
        if (modal.id === "modal-easteregg") {
          const quotes = [
            {
              text: "El arte de escribir es el arte de descubrir lo que crees.",
              author: "Gustave Flaubert",
            },
            {
              text: "No hay amigo tan leal como un libro.",
              author: "Ernest Hemingway",
            },
            {
              text: "Siempre imaginé que el Paraíso sería algún tipo de biblioteca.",
              author: "Jorge Luis Borges",
            },
            {
              text: "Un lector vive mil vidas antes de morir... El que no lee solo vive una.",
              author: "George R.R. Martin",
            },
            {
              text: "La pluma es la lengua del alma.",
              author: "Miguel de Cervantes",
            },
          ];
          const { text, author } =
            quotes[Math.floor(Math.random() * quotes.length)];
          document.getElementById("easter-egg-quote").textContent = `“${text}”`;
          document.getElementById(
            "easter-egg-author"
          ).textContent = `- ${author}`;
        }
        modal.classList.add("is-visible");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // ASIGNAR LISTENERS PARA CERRAR (CON EL BOTÓN 'X')
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal-overlay");
      closeModal(modal);
    });
  });

  // ASIGNAR LISTENERS PARA CERRAR (CON EL FONDO OVERLAY)
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeModal(overlay);
      }
    });
  });
});
