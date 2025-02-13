document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll(".stacking-card");
  const worksContent = document.querySelector(".works-content");
  const heading = document.querySelector(".centered-h h1");
  const viewportHeight = window.innerHeight;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const worksOffset = worksContent.offsetTop; // Offset sekce works-content
    const worksHeight = worksContent.offsetHeight;
    const revealOffset = viewportHeight * 0.8; // Nadpis se objeví těsně před sekcí

    // Paralax efekt pro nadpis
    if (
      scrollPosition >= worksOffset - revealOffset &&
      scrollPosition <= worksOffset + worksHeight
    ) {
      const relativeScroll = scrollPosition - (worksOffset - revealOffset); // Relativní scroll
      const progress = Math.min(relativeScroll / viewportHeight, 1); // Progres scrollování

      heading.style.transform = `translateY(${progress * 50}%)`; // Posun nadpisu dolů
      heading.style.opacity = 2 - progress; // Zmenšující se viditelnost
    } else {
      heading.style.opacity = 0; // Skrytý nadpis
    }

    if (scrollPosition < worksOffset) {
      cards.forEach((card) => {
        card.style.opacity = "0";
        // Nastavíme pointerEvents jen pro karty, ne pro navigační odkazy
        if (!card.closest(".links")) {
          card.style.pointerEvents = "none";
        }
      });
    } else {
      // Pokud je uživatel v sekci works-content nebo níže, ukaž karty
      cards.forEach((card) => {
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      });
    }

    // Animace karet
    if (
      scrollPosition >= worksOffset &&
      scrollPosition <= worksOffset + worksHeight
    ) {
      const relativeScroll = scrollPosition - worksOffset; // Relativní scroll vůči sekci works-content

      cards.forEach((card, index) => {
        const cardStart = index * viewportHeight;
        const cardEnd = (index + 1) * viewportHeight;

        if (relativeScroll >= cardStart && relativeScroll < cardEnd) {
          // Animace aktivní karty
          const progress = (relativeScroll - cardStart) / viewportHeight;
          card.style.transform = `translateY(${(1 - progress) * 100}%)`;
        } else if (relativeScroll < cardStart) {
          // Karta je pod viewportem
          card.style.transform = `translateY(100%)`;
        } else if (relativeScroll >= cardEnd) {
          // Karta je zcela zobrazena
          card.style.transform = `translateY(0)`;
        }
      });
    }
  });

  // Logo scaling logic
  const devLogo = document.getElementById("devLogo");
  if (devLogo) {
    gsap.to(devLogo, {
      scale: 0.1, // Scale down
      y: 0,
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
          start: "top 90%",
          end: "top 80%",
          scrub: 0.2,
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

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
  
      const targetID = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetID);
  
      if (targetSection) {
        // Zastavíme jakýkoli smooth scroll (např. Lenis nebo GSAP)
        if (lenis) lenis.stop();
  
        // Okamžitý posun na cílovou sekci
        const offsetTop = targetSection.offsetTop;
  
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
  
        // Restart smooth scroll po zpoždění
        setTimeout(() => {
          if (lenis) lenis.start();
        }, 600); // Délka podle vaší potřeby
      }
    });
  });
  


  const updateLayout = () => {
    const contactContent = document.querySelector(".contact-content");

    // Kontrola šířky okna
    if (window.innerWidth <= 768) {
      // HTML pro menší obrazovky
      contactContent.innerHTML = `
        <div class="mobile-footer">
          <h1 class="contact-text-right">LET'S WORK TOGETHER</h1>
          <h1 class="contact-text-left"><sup>(5)</sup>CONTACT ME</h1>
        </div>
        <div>
        <ul class="infoul">
          <li class="email-li">EMAIL</li>
        </ul>
        <div class="row-contact">
          <div class="email-container">
            <a class="contact-link" href="mailto:mira.stepanek17@seznam.cz">mira.stepanek17@seznam.cz</a>
          </div>
        </div>
        <ul class="infoul">
          <li class="instagram-li">INSTAGRAM</li>
        </ul>
        <div class="row-contact">
          <div class="instagram-container">
            <a class="contact-link" href="https://www.instagram.com/mirasstep/">mirasstep</a>
          </div>
        </div>
        </div>
      `;
    } else {
      // Původní HTML pro větší obrazovky
      contactContent.innerHTML = `
        <h1 class="contact-text-right">LET'S WORK TOGETHER</h1>
        <h1 class="contact-text-left"><sup>(5)</sup>CONTACT ME</h1>
        <ul class="infoul">
          <li class="email-li">EMAIL</li>
          <li class="instagram-li">INSTAGRAM</li>
        </ul>
        <hr class="custom-hr">
        <div class="row-contact">
          <div class="email-container">
            <a class="contact-link" href="mailto:mira.stepanek17@seznam.cz">mira.stepanek17@seznam.cz</a>
          </div>
          <div class="instagram-container">
            <a class="contact-link" href="https://www.instagram.com/mirasstep/">mirasstep</a>
          </div>
        </div>
      `;
    }
  };

  // Změna layoutu při načtení stránky
  updateLayout();

  // Změna layoutu při změně velikosti okna
  window.addEventListener("resize", updateLayout);


});
