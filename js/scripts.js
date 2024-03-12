(function () {
    const locomotiveScroll = new LocomotiveScroll();
})();

const ticker = document.getElementById('ticker-text');

// Clone the original ticker content
ticker.innerHTML += ticker.innerHTML;
