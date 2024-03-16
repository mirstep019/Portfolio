// SCROLL -----------------------------------------------------------------
(function () {
    const locomotiveScroll = new LocomotiveScroll();
})();

// TICKER ANIMACE -----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const ticker = document.getElementById('ticker-text');
    ticker.innerHTML += ticker.innerHTML; // Duplikuje obsah tickeru
});

// CURSOR ANIMATION FOR DEV LOGO AND HEADINGS -----------------------------------------------------------------
const cursor = document.querySelector(".cursor");
const logoAndH = document.querySelectorAll(".dev-logo"); // Oprava selektoru
const hoversAnim = document.querySelectorAll(".dev-logo"); // Oprava selektoru

let mouseX = 0, mouseY = 0; // Aktuální pozice kurzoru
let cursorX = 0, cursorY = 0; // Pozice vlastního kurzoru
const speed = 0.1; // Rychlost "dohánění"

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor(); 

logoAndH.forEach(item => {
    item.addEventListener("mouseenter", () => {
        cursor.classList.add("large");
    });
    item.addEventListener("mouseleave", () => {
        cursor.classList.remove("large");
    });
});

// ZMĚNA BARVY KURZORU PŘI PŘEJETÍ MYŠÍ NAD SEKCÍ #section2 -----------------------------------------------------------------
const section2 = document.getElementById('section2'); // Získání sekce #section2

section2.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-white'); 
});

section2.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-white'); 
});

const msLogo = document.querySelector('.ms-logo'); // Get the element with class="ms-logo"

window.addEventListener('scroll', () => {
    if (isLogoBelowSection2(section2)) {
        msLogo.classList.add('ms-logo-white'); // Add ms-logo-white class
    } else {
        msLogo.classList.remove('ms-logo-white'); // Remove ms-logo-white class
    }
});

// Function to check if the logo is below section2
function isLogoBelowSection2(section) {
    const sectionRect = section.getBoundingClientRect();
    return sectionRect.top <= 0 && sectionRect.bottom >= 0; // Check if section2 is within the viewport
}
