document.addEventListener('DOMContentLoaded', function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),  // Kontejner pro scroll
        smooth: true,  // Zapne smooth scrolling
        direction: 'vertical'  // Nastaví vertikální scrollování
    });

    // Kontrola scrollování
    scroll.on('scroll', (args) => {
        const ticker = document.querySelector('.ticker-skills');
        const scrollPosition = args.scroll.y;  // Získání vertikální pozice

        // Nastavení horizontálního posunu tickeru
        ticker.style.transform = `translate3d(${scrollPosition * -0.5}px, 0, 0)`;
    });

    // Duplikace obsahu tickeru
    const ticker = document.getElementById('ticker-text');
    const ticker2 = document.getElementById('ticker-skills');
    if (ticker) {
        ticker.innerHTML += ticker.innerHTML;
    }
    if (ticker2) {
        ticker2.innerHTML += ticker2.innerHTML;
    }

    // Conditional Cursor Animation based on viewport width
    if (window.innerWidth > 1024) { // Custom cursor functionality for screens wider than 1024px
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
        document.querySelectorAll(".dev-logo, .skills-text, .ms-logo").forEach(item => {
            item.addEventListener("mouseenter", () => cursor.classList.add("large"));
            item.addEventListener("mouseleave", () => cursor.classList.remove("large"));
        });
        document.querySelectorAll(".what-text, .card, .ticker-skills, .about-text, .contact-text-left, .contact-text-right, .contact-link").forEach(item => {
            item.addEventListener("mouseenter", () => cursor.classList.add("large-white"));
            item.addEventListener("mouseleave", () => cursor.classList.remove("large-white"));
        });

        // Change cursor color on hover over sections
        const sections = document.querySelectorAll('#section2, #section4, #section5');
        sections.forEach(section => {
            section.addEventListener('mouseenter', () => cursor.classList.add('cursor-white'));
            section.addEventListener('mouseleave', () => cursor.classList.remove('cursor-white'));
        });
    }

    // Card toggles functionality remains unchanged
    const cardToggles = document.querySelectorAll('[data-card] .card-toggle');
    cardToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            const card = this.closest('.card');
            const content = card.querySelector('.card-content');
            const icon = card.querySelector('.toggle-icon');

            // Close any open card content and remove the active class
            document.querySelectorAll('.card .card-content').forEach(function (item) {
                if (item !== content && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.style.maxHeight = null;
                    item.closest('.card').classList.remove('active');
                    item.closest('.card').querySelector('.toggle-icon').textContent = '+';
                }
            });

            // Toggle the current card content and the active class
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                card.classList.remove('active');
                content.style.maxHeight = null;
                icon.textContent = '+';
            } else {
                content.classList.add('active');
                card.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = '-';
            }
        });
    });
});
