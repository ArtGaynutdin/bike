const bycicles = document.querySelectorAll(".bycicle");

// Получаем сообщение о том что ничего не найдено
const notFoundMassege = document.querySelector(".not-found");
// Получаем оболочку всех карточек
const cardsWrapper = document.querySelector(".cards");

// Получаем инпуты отдельно
const inputBrand = document.getElementById("input-brand");
const inputDiametr = document.getElementById("input-diametr");
const inputPriceSort = document.getElementById("input-sortprice");

// Получаем все инпуты
const inputs = document.querySelectorAll(".input-params");
// Получаем все параметры
const allParams = document.querySelectorAll(".option__param");

// Для всех инпутов изначально вносим значение "Все"
inputs.forEach(function(input) {
    input.value = allParams[0].textContent;
});

// Обработка клика на любой выпадающий параметр
allParams.forEach(function(param) {
    param.addEventListener("click", () => {
        filterCards();
        sortCardsByPrice();
    });
});

function filterCards() {
    // Значения в инпутах
    brandInputValue = inputBrand.value;
    diametrInputValue = inputDiametr.value;
    // console.log("Значения инпутов: 1) " + brandInputValue + "; 2) " + diametrInputValue);

    // Проходим по все карточкам
    bycicles.forEach(function(card, index) {
        // console.log("Карточка номер " + index, ":");

        // Значения data-атрибутов карточки
        brandCardValue = card.getAttribute("data-brand");
        diametrCardValue = card.getAttribute("data-diametr");
        // console.log("Значения атрибутов: 1) " + brandCardValue + "; 2) " + diametrCardValue);

        // Совпадения data-атрибута и значения инпута
        brandBooleanValue = brandCardValue.includes(brandInputValue);
        diametrBooleanValue = diametrCardValue.includes(diametrInputValue);
        // console.log("Что это match: 1) " + brandBooleanValue + "; 2) " + diametrBooleanValue);

        // Если data-атрибуты в карточке совпадают с обоими инпутами - выводим
        if (brandBooleanValue === true && diametrBooleanValue === true) {
            card.classList.remove("none");
            card.classList.add("visible");
        }
        else if (brandBooleanValue === true && diametrInputValue === "Все") {
            card.classList.remove("none");
            card.classList.add("visible");
        }
        else if (brandInputValue === "Все" && diametrBooleanValue === true) {
            card.classList.remove("none");
            card.classList.add("visible");
        }
        else if (brandInputValue === "Все" && diametrInputValue === "Все") {
            card.classList.remove("none");
            card.classList.add("visible");
        }
        // Если не совпадают то скрываем
        else {
            card.classList.remove("visible");
            card.classList.add("none");
        }
    });

    // Получаем все видимые карточки
    let visibleCards = [];
    bycicles.forEach(function(card) {
        if(card.classList.contains("visible")) {
            visibleCards.push(card);
        }
    });

    // Скрываем сообщение
    notFoundMassege.classList.add("none");
    // Если ничего не найдено - показываем сообщение
    if (visibleCards.length === 0) {
        notFoundMassege.classList.remove("none");
    }
}

const reloadButton = document.getElementById("reload-button");
reloadButton.addEventListener("click", () => {
    inputBrand.value = "Все";
    inputDiametr.value = "Все";
    inputPriceSort.value = "Все";
    allParams[0].click();
    dropdowns.forEach(function(element) {
        element.classList.remove("active");
    })
    // dropdown.classList.remove("active");
});