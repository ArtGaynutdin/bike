// Сама кнопка
const burger = document.getElementById("hamburger");
// Меню
const navMenu = document.getElementById("nav-menu");

// Обработка клика на кнопку
burger.addEventListener("click", function() {
    // Меняем кнопку
    this.classList.toggle("active");
    // Меняем меню
    navMenu.classList.toggle("active");
    // Блокируем body
    document.body.classList.toggle('no-scroll');
});


const current_url = window.location.href;
const url_array = current_url.split('/');
url_array.reverse();
const current_menu_item = url_array[0];

switch(current_menu_item) {
    case 'delivery':
        clearActiveInNav(1);
        break;
    case 'places':
        clearActiveInNav(2);
        break;
    case 'contacts':
        clearActiveInNav(3);
        break;
    case 'about':
        clearActiveInNav(4);
        break;
}

function clearActiveInNav(number) {
    const nav_links = document.querySelectorAll('.nav-link');

    nav_links.forEach(function(link) {
        link.classList.remove('active');
    });
    
    nav_links[number].classList.add('active');
}