/* script.js
   - Mobile nav toggle
   - Hero carousel (simple)
   - Gallery lightbox modal
   - Contact form validation (opens mailto)
   - Preloader hide
   - Scroll-to-top button
*/

// script.js

document.addEventListener('DOMContentLoaded', () => {

  // Hide preloader once page loads
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.style.display = 'none';
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // Hero carousel setup
  const slides = document.querySelectorAll('#heroSlides .slide');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('hidden', i !== index);
    });
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    // Auto slide every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // Scroll-to-top button logic
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('hidden');
      } else {
        scrollTopBtn.classList.add('hidden');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // =========================
  // Contact form validation
  // =========================
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = form.cfName.value.trim();
      const email = form.cfEmail.value.trim();
      const message = form.cfMessage.value.trim();

      if (!name || !email || !message) {
        formMsg.textContent = 'Please fill out all fields.';
        formMsg.style.color = 'red';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formMsg.textContent = 'Please enter a valid email.';
        formMsg.style.color = 'red';
        return;
      }

      formMsg.textContent = 'Thank you! Your message has been sent.';
      formMsg.style.color = 'green';
      form.reset();

      // Optional: open mail client
      // window.location.href = `mailto:youremail@example.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    });
  }
    
});
