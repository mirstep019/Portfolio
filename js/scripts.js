document.addEventListener("DOMContentLoaded", function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    getDirection: true,
    getSpeed: true,
  });

  scroll.update(); // Aktualizace po načtení

  // Kontrola scrollování
  scroll.on("scroll", (args) => {
    const ticker = document.querySelector(".ticker-skills");
    const scrollPosition = args.scroll.y; // Získání vertikální pozice

    // Nastavení horizontálního posunu tickeru
    ticker.style.transform = `translate3d(${scrollPosition * -0.5}px, 0, 0)`;
  });

  // Duplikace obsahu tickeru
  const ticker = document.getElementById("ticker-text");
  const ticker2 = document.getElementById("ticker-skills");
  const ticker3 = document.getElementById("ticker-skills2");

  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
  }
  if (ticker2) {
    ticker2.innerHTML += ticker2.innerHTML;
  }
  if (ticker3) {
    ticker3.innerHTML += ticker3.innerHTML;
  }

  // Conditional Cursor Animation based on viewport width
  if (window.innerWidth > 1024) {
    // Custom cursor functionality for screens wider than 1024px
    const cursor = document.querySelector(".cursor");
    let mouseX = 0,
      mouseY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      const cursorX = mouseX;
      const cursorY = mouseY;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects for cursor enlargement
    document
      .querySelectorAll(".dev-logo, .skills-text, .ms-logo")
      .forEach((item) => {
        item.addEventListener("mouseenter", () =>
          cursor.classList.add("large")
        );
        item.addEventListener("mouseleave", () =>
          cursor.classList.remove("large")
        );
      });
    document
      .querySelectorAll(
        ".what-text, .card, .about-text, .contact-text-left, .contact-text-right, .contact-link"
      )
      .forEach((item) => {
        item.addEventListener("mouseenter", () =>
          cursor.classList.add("large")
        );
        item.addEventListener("mouseleave", () =>
          cursor.classList.remove("large")
        );
      });
  }

  // Card toggles functionality remains unchanged
  const cardToggles = document.querySelectorAll("[data-card] .card-toggle");
  cardToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const card = this.closest(".card");
      const content = card.querySelector(".card-content");
      const icon = card.querySelector(".toggle-icon");

      // Close any open card content and remove the active class
      document.querySelectorAll(".card .card-content").forEach(function (item) {
        if (item !== content && item.classList.contains("active")) {
          item.classList.remove("active");
          item.style.maxHeight = null;
          item.closest(".card").classList.remove("active");
          item.closest(".card").querySelector(".toggle-icon").textContent = "+";
        }
      });

      // Toggle the current card content and the active class
      if (content.classList.contains("active")) {
        content.classList.remove("active");
        card.classList.remove("active");
        content.style.maxHeight = null;
        icon.textContent = "+";
      } else {
        content.classList.add("active");
        card.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        icon.textContent = "-";
      }
    });
  });

  const preloader = document.getElementById("preloader");
  const preloaderText = document.getElementById("preloader-text");

  const initialWord = "Miroslav Stepanek.";
  const finalWord = "dev.";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@#&ß";

  // Nastavení proměnných pro úpravu rychlosti a délky animací
  const initialScrambleDuration = 400; // Doba, po kterou se zobrazí scrambled text (v ms)
  const unscrambleDelay = 50; // Zpoždění mezi rozkódováním každého písmene (v ms)

  // Proměnné pro zkracování na 'DEV.'
  const devScrambleDelay = 40; // Zpoždění mezi scramblingem každého písmene při zkracování (v ms)
  const devScrambleTimes = 5; // Počet scramblingů pro každé písmeno při zkracování
  const devShortenDelay = 80; // Zpoždění mezi odstraněním písmen při zkracování (v ms)

  let currentText = [];

  // Funkce pro zpoždění
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Generování scrambled verze 'Miroslav Stepanek' se zachováním mezer
  function getScrambledText(text) {
    return text.split("").map((char) => {
      if (char === " ") return " "; // Zachovat mezery
      return characters[Math.floor(Math.random() * characters.length)];
    });
  }

  async function startAnimation() {
    // Vytvoření počátečního scrambled textu
    currentText = getScrambledText(initialWord);
    preloaderText.innerHTML = currentText.join("");

    // Zobrazení scrambled textu po dobu initialScrambleDuration
    await delay(initialScrambleDuration);

    // Postupné rozkódování písmen na správná písmena
    for (let i = 0; i < initialWord.length; i++) {
      if (initialWord[i] !== " ") {
        // Přeskočit mezery
        await unscrambleLetter(i);
      }
    }

    // Zobrazení kompletního slova na 1 sekundu
    await delay(1500);

    // Scrambling písmen zleva doprava při zkracování na 'DEV.'
    const scramblePromises = [];
    for (let i = 0; i < currentText.length; i++) {
      if (currentText[i] !== " ") {
        // Přeskočit mezery
        scramblePromises.push(scrambleLetter(i, i * devScrambleDelay));
      }
    }
    await Promise.all(scramblePromises);

    // Přeměna na finální text 'DEV.'
    for (let i = currentText.length - 1; i >= finalWord.length; i--) {
      // Odstranění písmen z konce (přeskočit mezery)
      if (currentText[i] !== " ") {
        currentText.splice(i, 1);
        preloaderText.innerHTML = currentText.join("");
        await delay(devShortenDelay);
      }
    }

    // Nahrazení prvních písmen písmeny z 'DEV.'
    for (let i = 0; i < finalWord.length; i++) {
      currentText[i] = finalWord[i];
      preloaderText.innerHTML = currentText.join("");
      await delay(devShortenDelay);
    }

    // Krátké zpoždění a skrytí preloaderu
    await delay(500);
    hidePreloader();
  }

  async function unscrambleLetter(index) {
    // Nahrazení náhodného znaku správným písmenem
    currentText[index] = initialWord[index];
    preloaderText.innerHTML = currentText.join("");
    await delay(unscrambleDelay);
  }

  async function scrambleLetter(index, initialDelay) {
    await delay(initialDelay);

    for (let i = 0; i < devScrambleTimes; i++) {
      currentText[index] =
        characters[Math.floor(Math.random() * characters.length)];
      preloaderText.innerHTML = currentText.join("");
      await delay(devScrambleDelay);
    }
    // Po scramblingu může zůstat náhodný znak nebo můžete vrátit původní znak
  }

  function hidePreloader() {
    preloader.style.transition = "transform 1s ease-in-out";
    preloader.style.transform = "translateY(-100%)";
    setTimeout(() => {
      preloader.remove();
    }, 1000);
  }

  startAnimation();
});
