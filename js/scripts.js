(function () {
    const locomotiveScroll = new LocomotiveScroll();
})();

document.addEventListener('DOMContentLoaded', function () {
    const ticker = document.getElementById('ticker-text');
    ticker.innerHTML += ticker.innerHTML; // This duplicates the ticker content
});
  