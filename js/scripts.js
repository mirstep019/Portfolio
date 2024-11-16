document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.1, // Adjust for smoothness
  });

  // Select all navbar links
  document.querySelectorAll(".links a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      // Get the target section ID from the href
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Smoothly scroll to the target section using Lenis
        lenis.scrollTo(targetElement);
      }
    });
  });

  const elementsToReveal = document.querySelectorAll(".reveal-on-scroll");

  const options = {
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal"); // Add the reveal class when in view
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, options);

  elementsToReveal.forEach((element) => {
    observer.observe(element); // Start observing each element
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Target logo element
  const devLogo = document.getElementById("devLogo");
  if (!devLogo) {
    console.error('Element with ID "devLogo" not found.');
    return;
  }

  // Scaling parameters
  const initialScale = 1.1; // Starting scale
  const finalScale = 0.1; // Final scale when it reaches the smallest size

  // Distance for full scaling effect
  const maxScroll = window.innerHeight * 1.2; // Adjust to control speed

  // Function to update logo based on scroll position
  function updateLogo(scroll) {
    const scrollRatio = Math.min(scroll / maxScroll, 1); // Clamped ratio

    // Calculate the scale based on the scroll position
    const currentScale =
      initialScale - (initialScale - finalScale) * scrollRatio;

    // Apply the scaling transformation smoothly
    devLogo.style.transform = `scale(${currentScale})`;
  }

  // Initial update on page load
  updateLogo(lenis.scroll);

  // Lenis scroll event
  lenis.on("scroll", ({ scroll }) => {
    updateLogo(scroll);
  });




  

  // Ticker functionality
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
      .querySelectorAll(".dev-logo, .skills-text, .navbar")
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

  // Card toggles functionality
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

  // Preloader animation
  const preloader = document.getElementById("preloader");
  const preloaderText = document.getElementById("preloader-text");

  const initialWord = "Miroslav Stepanek.";
  const finalWord = "dev.";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@#&ß";

  // Animation settings
  const initialScrambleDuration = 300; // Duration to show scrambled text (ms)
  const unscrambleDelay = 50; // Delay between unscrambling each letter (ms)

  // Variables for shortening to 'DEV.'
  const devScrambleDelay = 40; // Delay between scrambling each letter when shortening (ms)
  const devScrambleTimes = 5; // Number of scrambles for each letter when shortening
  const devShortenDelay = 40; // Delay between removing letters when shortening (ms)

  let currentText = [];

  // Delay function
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Generate scrambled version of 'Miroslav Stepanek' while preserving spaces
  function getScrambledText(text) {
    return text.split("").map((char) => {
      if (char === " ") return " "; // Preserve spaces
      return characters[Math.floor(Math.random() * characters.length)];
    });
  }

  async function startAnimation() {
    // Create initial scrambled text
    currentText = getScrambledText(initialWord);
    preloaderText.innerHTML = currentText.join("");

    // Show scrambled text for initialScrambleDuration
    await delay(initialScrambleDuration);

    // Gradually unscramble letters to correct letters
    for (let i = 0; i < initialWord.length; i++) {
      if (initialWord[i] !== " ") {
        // Skip spaces
        await unscrambleLetter(i);
      }
    }

    // Display the complete word for 1 second
    await delay(1500);

    // Scramble letters from left to right when shortening to 'DEV.'
    const scramblePromises = [];
    for (let i = 0; i < currentText.length; i++) {
      if (currentText[i] !== " ") {
        // Skip spaces
        scramblePromises.push(scrambleLetter(i, i * devScrambleDelay));
      }
    }
    await Promise.all(scramblePromises);

    // Transform to the final text 'DEV.'
    for (let i = currentText.length - 1; i >= finalWord.length; i--) {
      // Remove letters from the end (skip spaces)
      if (currentText[i] !== " ") {
        currentText.splice(i, 1);
        preloaderText.innerHTML = currentText.join("");
        await delay(devShortenDelay);
      }
    }

    // Replace the first letters with letters from 'DEV.'
    for (let i = 0; i < finalWord.length; i++) {
      currentText[i] = finalWord[i];
      preloaderText.innerHTML = currentText.join("");
      await delay(devShortenDelay);
    }

    // Short delay and hide preloader
    await delay(500);
    hidePreloader();
  }

  async function unscrambleLetter(index) {
    // Replace random character with the correct letter
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
    // After scrambling, you can keep a random character or set it to the original character
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
