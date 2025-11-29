/**
 * LUCA INOVA - MAIN LOGIC
 * Versión Final: Robustez y Performance
 */

/* --- 1. GESTIÓN DE CARGA (ANTI-PANTALLA BLANCA) --- */
function revealPage() {
  // Solo revela si no está ya revelada
  if (!document.body.classList.contains('loaded')) {
    document.body.classList.add('loaded');
  }
}

// Opción A: Carga perfecta (todo listo)
window.addEventListener('load', revealPage);

// Opción B: Fail-Safe (Si tarda más de 2s, mostrar igual)
// Esto evita que la página parezca rota en conexiones lentas
setTimeout(revealPage, 2000);


/* --- 2. LÓGICA GENERAL --- */
document.addEventListener("DOMContentLoaded", () => {

  // NAVEGACIÓN MÓVIL
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".mobile-nav-overlay");
  const body = document.body;

  function toggleMenu() {
    const isOpen = navLinks.classList.contains("active");
    mobileBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
    navOverlay.classList.toggle("active");
    body.style.overflow = isOpen ? "" : "hidden";
  }

  function closeMenu() {
    mobileBtn.classList.remove("active");
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    body.style.overflow = "";
  }

  if (mobileBtn) mobileBtn.addEventListener("click", toggleMenu);
  if (navOverlay) navOverlay.addEventListener("click", closeMenu);

  document.querySelectorAll(".nav-links a").forEach((item) => {
    item.addEventListener("click", closeMenu);
  });

  // GESTIÓN SCROLL ANIMATIONS (IntersectionObserver)
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // HEADER FIXED STATE
  // Detecta el scroll para encoger el logo/header
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // LOGICA FLIP CARDS GLOBAL (Evita conflictos táctiles)
  // Permite girar cartas haciendo click en cualquier parte
  const cards = document.querySelectorAll('.char-card');
  if (cards.length > 0) {
    cards.forEach(card => {
      card.addEventListener('click', function (e) {
        // Ignoramos clics en botones/enlaces para que funcionen normalmente
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) return;

        // Lógica acordeón (Cerrar otras al abrir una)
        const isFlipped = this.classList.contains('is-flipped');
        cards.forEach(c => c.classList.remove('is-flipped')); // Reset global

        if (!isFlipped) {
          this.classList.add('is-flipped');
        }
      });
    });
  }

});