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
