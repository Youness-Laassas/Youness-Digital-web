document.documentElement.classList.add('js');

// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

function setMenuOpen(isOpen) {
    navLinks.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-times', isOpen);
}

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        setMenuOpen(false);
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        setMenuOpen(false);
    });
});

// Reveal sections as they enter the viewport.
const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    revealElements.forEach(element => element.classList.add('active'));
} else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add('active'));
}

/* Effet Typewriter */
const textArray = ["Technico-Commercial", "Développeur Digital", "Expert Relation Client", "Créateur de Sites Web"];
let textIndex = 0;
let charIndex = textArray[0].length - 1;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenWords = 2000;
const typeWriterElement = document.querySelector(".typewriter");

function typeWriter() {
    if (prefersReducedMotion) {
        typeWriterElement.textContent = textArray[0];
        return;
    }

    const currentWord = textArray[textIndex];

    if (isDeleting) {
        charIndex--;
        typeWriterElement.textContent = currentWord.substring(0, charIndex);
    } else {
        charIndex++;
        typeWriterElement.textContent = currentWord.substring(0, charIndex);
    }

    let timeoutSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
        timeoutSpeed = delayBetweenWords;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
    }

    setTimeout(typeWriter, timeoutSpeed);
}

typeWriter();