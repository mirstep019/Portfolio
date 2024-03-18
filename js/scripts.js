document.addEventListener('DOMContentLoaded', function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
    });

    // Duplikace obsahu tickeru
    const ticker = document.getElementById('ticker-text');
    if (ticker) {
        ticker.innerHTML += ticker.innerHTML;
    }

    // Cursor Animation
    const cursor = document.querySelector(".cursor");
    let mouseX = 0, mouseY = 0;
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const cursorX = mouseX;
        const cursorY = mouseY;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects for cursor enlargement
    document.querySelectorAll(".dev-logo, .what-text").forEach(item => {
        item.addEventListener("mouseenter", () => cursor.classList.add("large"));
        item.addEventListener("mouseleave", () => cursor.classList.remove("large"));
    });

    // Change cursor color on hover over section2
    const section2 = document.getElementById('section2');
    if (section2) {
        section2.addEventListener('mouseenter', () => cursor.classList.add('cursor-white'));
        section2.addEventListener('mouseleave', () => cursor.classList.remove('cursor-white'));
    }




  const whatText = document.querySelector('.what-text');

  // Předpokládejme, že chcete spustit animaci při dosažení určité scroll pozice
  window.addEventListener('scroll', () => {
    const triggerPosition = 1000; // například
    if (window.scrollY > triggerPosition) {
      whatText.classList.add('animate-title');
    }
  });

});
