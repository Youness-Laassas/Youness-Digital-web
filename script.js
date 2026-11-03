// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// Animation Scroll Reveal (L'effet magique)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Pour activer les éléments déjà visibles au chargement

// Effet Typewriter (Machine à écrire) pour le Hero Section
const textArray = ["Technico-Commercial", "Développeur Digital", "Expert Relation Client", "Créateur de Sites Web"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenWords = 2000;

const typeWriterElement = document.querySelector(".typewriter");

function typeWriter() {
    const currentWord = textArray[textIndex];
    
    if (isDeleting) {
        typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
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

// Lancer l'effet au chargement
document.addEventListener("DOMContentLoaded", typeWriter);