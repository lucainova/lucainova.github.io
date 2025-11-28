/**
 * LUCA INOVA - ARQUITECTURA JS
 * Principio: Interactividad mínima y eficiente.
 */
window.addEventListener('load', () => {
  // Al cargar todo, añadimos la clase .loaded al body
  // Esto dispara la transición de opacidad en Header y Main,
  // PERO deja el fondo (que está fixed) intacto desde el principio.
  document.body.classList.add('loaded');
});

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. CONFIGURACIÓN DEL MENÚ MÓVIL ---
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".mobile-nav-overlay");
  const body = document.body;

  // Función para alternar el estado
  function toggleMenu() {
    const isOpen = navLinks.classList.contains("active");

    // Toggle de clases
    mobileBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
    navOverlay.classList.toggle("active");

    // Bloquear scroll cuando el menú está abierto para evitar "scroll-bleeding"
    if (!isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }

  // Funciones para cerrar
  function closeMenu() {
    mobileBtn.classList.remove("active");
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    body.style.overflow = "";
  }

  // Event Listeners
  if (mobileBtn) {
    mobileBtn.addEventListener("click", toggleMenu);
  }

  // Cerrar al hacer click en el overlay oscuro
  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }

  // Cerrar al hacer click en cualquier enlace (navegación fluida)
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  // --- 2. GESTIÓN DE ANIMACIONES HERO (Simple & Clean) ---
  // Usamos IntersectionObserver para detectar cuando los elementos entran en pantalla
  // En el caso del hero, como ya está en pantalla, el CSS delay maneja la entrada inicial.
  // Este código queda preparado para secciones futuras "fade-on-scroll".

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible"); // Clase que activaría animaciones si no fueran automáticas
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, observerOptions);

  // Seleccionamos elementos animados futuros (Secciones Vitrina, etc)
  // const animatedElements = document.querySelectorAll('.scroll-animate');
  // animatedElements.forEach(el => observer.observe(el));
});
