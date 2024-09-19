const swiper = new Swiper(".places_slider", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    navigation: {
        nextEl: '.next-btn',
        prevEl: '.prev-btn',
    },
    breakpoints: {
        1200: {
            slidesPerView: 4,
        },
        992: {
            slidesPerView: 3,
        },
        680: {
            slidesPerView: 2,
        }
    }
});