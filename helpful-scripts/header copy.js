const burger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

burger.addEventListener("click", function() {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle('no-scroll');
});