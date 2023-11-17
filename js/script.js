const preLoader = document.getElementById("loader");
const menu = document.getElementById("menu");
const navBtn = document.getElementById("menu-btn");
const darkBtn = document.getElementById("toggle");

window.addEventListener("load", function () {
  colorScheme();
  titleLoop();
  preloader();
});

window.addEventListener("scroll", function () {
  headerEffect();
});

window.addEventListener("click", menuHide);

// menu button transition
navBtn.addEventListener("click", function () {
  this.classList.toggle("change");
  menu.classList.toggle("block");
});

darkBtn.addEventListener("click", darkMode);

// Defaul theme change fetch
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    // change the dark/light mode
    document.body.classList.toggle("light");
    colorScheme();
  });

// -------------------Functions-------------------

// header background effect when scrolling
function headerEffect() {
  let header = document.getElementsByTagName("header")[0];
  // get the top value
  let sTop = this.pageYOffset;
  // toggle blur
  header.style.backdropFilter = sTop > 1 ? "blur(10px)" : "none";
  // toggle background
  header.style.background = sTop > 1 ? "var(--bg-header)" : "none";
}

// dark/light mode toggle
function darkMode() {
  // change the dark/light mode
  document.body.classList.toggle("light");

  // toggle the mode swwitch button
  let button = this.children;
  Array.from(button).forEach((icon) => icon.classList.toggle("hide"));
}

// hide menu after a click
function menuHide(e) {
  if (e.target.parentNode !== navBtn) {
    setTimeout(() => {
      navBtn.classList.remove("change");
      menu.classList.remove("block");
    }, 100);
  }
}

// preloader
function preloader() {
  const fadeOutEffect = setInterval(() => {
    if (!preLoader.style.opacity) {
      preLoader.style.opacity = 1;
    }
    if (preLoader.style.opacity > 0) {
      preLoader.style.opacity -= 0.1;
    } else {
      preLoader.style.display = "none";
      clearInterval(fadeOutEffect);
    }
  }, 50);
}

// Add light mode if browser color scheme equals to it
function colorScheme() {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    document.body.classList.add("light");

    Array.from(darkBtn.children).forEach((icon) =>
      icon.classList.toggle("hide")
    );
  }
}

function titleLoop() {
  let len = 0;
  let titleText = "Tharindu Darshana";
  let titleIncrease = true;
  setInterval(() => {
    if (titleIncrease) {
      document.title = titleText.slice(0, len++);
      if (len == titleText.length) {
        setTimeout(() => {
          titleIncrease = false;
        }, 1000);
      }
    } else {
      document.title = titleText.slice(0, len--);
      if (len == 1) {
        titleIncrease = true;
      }
    }
  }, 500);
}
