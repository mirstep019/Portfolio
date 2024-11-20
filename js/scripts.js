document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll(".stacking-card");
  const worksContent = document.querySelector(".works-content");
  const viewportHeight = window.innerHeight;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const worksOffset = worksContent.offsetTop; // Starting position of works-content
    const relativeScroll = scrollPosition - worksOffset; // Scroll relative to works-content

    // Ensure stacking logic works within the `.works-content` section
    if (relativeScroll >= 0 && relativeScroll <= cards.length * viewportHeight) {
      cards.forEach((card, index) => {
        const cardStart = index * viewportHeight;
        const cardEnd = (index + 1) * viewportHeight;

        if (relativeScroll >= cardStart && relativeScroll < cardEnd) {
          // Card is actively being scrolled into position
          const progress = (relativeScroll - cardStart) / viewportHeight;
          card.style.transform = `translateY(${(1 - progress) * 100}%)`;
        } else if (relativeScroll < cardStart) {
          // Card is below the viewport
          card.style.transform = `translateY(100%)`;
        } else if (relativeScroll >= cardEnd) {
          // Card is fully stacked
          card.style.transform = `translateY(0)`;
        }
      });
    }

    // Fix for ensuring the first card is not visible at the bottom
    if (relativeScroll < 0) {
      cards.forEach((card) => {
        card.style.transform = `translateY(100%)`; // Reset all cards below the viewport
      });
    }
  });




  // Logo scaling logic
  const devLogo = document.getElementById("devLogo");
  if (devLogo) {
    gsap.to(devLogo, {
      scale: 0.1, // Scale down
      scrollTrigger: {
        trigger: "#section1",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }


   // Reveal elements on scroll
   const elementsToReveal = document.querySelectorAll(".reveal-on-scroll");
   elementsToReveal.forEach((element) => {
     gsap.fromTo(
       element,
       { opacity: 0, y: 20 },
       {
         opacity: 1,
         y: 0,
         scrollTrigger: {
           trigger: element,
           start: "top 80%",
           end: "top 60%",
           scrub: true,
         },
       }
     );
   });

  // Ticker animations
  const ticker = document.getElementById("ticker-text");
  const ticker2 = document.getElementById("ticker-skills");
  const ticker3 = document.getElementById("ticker-skills2");

  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
    gsap.to(ticker, {
      x: `-${ticker.offsetWidth / 2}px`,
      duration: 30,
      repeat: -1,
      ease: "linear",
    });
  }
  if (ticker2) {
    ticker2.innerHTML += ticker2.innerHTML;
    gsap.to(ticker2, {
      x: `-${ticker2.offsetWidth / 2}px`,
      duration: 30,
      repeat: -1,
      ease: "linear",
    });
  }
  if (ticker3) {
    ticker3.innerHTML += ticker3.innerHTML;
    gsap.to(ticker3, {
      x: `-${ticker3.offsetWidth / 2}px`,
      duration: 30,
      repeat: -1,
      ease: "linear",
    });
  }

  // Cursor animations (without GSAP)
  if (window.innerWidth > 1024) {
    const cursor = document.querySelector(".cursor");
    let mouseX = 0,
      mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    document.querySelectorAll(".hover-target").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        cursor.classList.add("large");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("large");
      });
    });
  }

  // Card toggle functionality
  const cardToggles = document.querySelectorAll("[data-card] .card-toggle");
  cardToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const card = this.closest(".card");
      const content = card.querySelector(".card-content");
      const icon = card.querySelector(".toggle-icon");

      // Close other active cards
      document.querySelectorAll(".card .card-content").forEach(function (item) {
        if (item !== content && item.classList.contains("active")) {
          item.classList.remove("active");
          gsap.to(item, { maxHeight: 0, duration: 0 });
          item.closest(".card").classList.remove("active");
          item.closest(".card").querySelector(".toggle-icon").textContent = "+";
        }
      });

      // Toggle current card
      if (content.classList.contains("active")) {
        content.classList.remove("active");
        card.classList.remove("active");
        gsap.to(content, { maxHeight: 0, duration: 0 });
        icon.textContent = "+";
      } else {
        content.classList.add("active");
        card.classList.add("active");
        gsap.to(content, { maxHeight: content.scrollHeight, duration: 0 });
        icon.textContent = "-";
      }
    });
  });

  // Preloader animation
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => preloader.remove(),
    });
  });
});
