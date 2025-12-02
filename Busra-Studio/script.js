const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const typedText = document.querySelector('.typed-text');
const cvBtn = document.querySelector('#cvBtn');
const cvModal = document.querySelector('#cvModal');
const closeBtn = document.querySelector('#cvModal .close');
const yearEl = document.querySelector('#year');

/* ---- Year badge ---- */
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ---- Mobile navigation ---- */
if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  navLinks.forEach((link) =>
    link.addEventListener('click', () => navbar.classList.remove('active'))
  );
}

/* ---- Typing animation ---- */
if (typedText) {
  const words = [
    'Front-end geliştiricisiyim',
    'Modern web arayüzleri tasarlıyorum',
    'Kullanıcı odaklı deneyimler üretiyorum'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    typedText.textContent = currentChars;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const speed = isDeleting ? 60 : 110;
    const delay = (!isDeleting && charIndex === currentWord.length) ? 1200 : speed;
    setTimeout(type, delay);
  };

  type();
}

/* ---- CV modal ---- */
const toggleBodyScroll = (lock) => {
  document.body.style.overflow = lock ? 'hidden' : '';
};

const openModal = () => {
  if (!cvModal) return;
  cvModal.classList.add('show');
  cvModal.setAttribute('aria-hidden', 'false');
  toggleBodyScroll(true);
};

const closeModal = () => {
  if (!cvModal) return;
  cvModal.classList.remove('show');
  cvModal.setAttribute('aria-hidden', 'true');
  toggleBodyScroll(false);
};

cvBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});

closeBtn?.addEventListener('click', closeModal);

cvModal?.addEventListener('click', (event) => {
  if (event.target === cvModal) {
    closeModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

/* ---- Scroll Animations ---- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Tüm kartları gözlemle
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.capability-grid article, .case-grid article, .timeline article, .stack-item');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});

// Sayfa yüklendiğinde animasyonları başlat
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.capability-grid article, .case-grid article, .timeline article, .stack-item');
  cards.forEach(card => {
    card.style.opacity = '1';
  });
});
