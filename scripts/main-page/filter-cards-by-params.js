// Получаем сообщение о том что ничего не найдено
const notFoundMassege = document.querySelector(".not-found");

// Получаем инпуты отдельно
const inputBrand = document.getElementById("input-brand");
const inputDiametr = document.getElementById("input-diametr");
const inputPriceSort = document.getElementById("input-sortprice");

// Получаем все инпуты
// const filterInputs = document.querySelectorAll(".filter-input");
// Получаем все параметры
const allParams = document.querySelectorAll(".filter-param");

// Для всех инпутов изначально вносим значение "Все"
// filterInputs.forEach(function(input) {
//     input.value = allParams[0].textContent;
// });

function filterCards(cards) {
    // Значения в инпутах
    brandInputValue = inputBrand.value;
    diametrInputValue = inputDiametr.value;

    diametrInputValue = diametrInputValue.replace(/'/g, '');

    // Проходим по все карточкам
    cards.forEach(function(card) {
        // Значения data-атрибутов карточки
        brandCardValue = card.getAttribute("data-brand");
        diametrCardValue = card.getAttribute("data-diametr");

        // Совпадения data-атрибута и значения инпута
        brandBooleanValue = brandCardValue.includes(brandInputValue);
        diametrBooleanValue = diametrCardValue.includes(diametrInputValue);

        // Если data-атрибуты в карточке совпадают с обоими инпутами - выводим
        if (brandBooleanValue === true && diametrBooleanValue === true) {
            card.classList.remove("none");
            card.classList.add("visible");
        }
        // Если фильтр только по превому инпуту
        else if (brandBooleanValue === true && diametrInputValue === "Все") {
            card.classList.remove("none");
            card.classList.add("visible");
        }
        // Если фильтр только по второму инпуту
        else if (brandInputValue === "Все" && diametrBooleanValue === true) {
            card.classList.remove("none");
            card.classList.add("visible");
        }
        // Если вывести все карточки
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
    cards.forEach(function(card) {
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

// Получаем кнопку сброса фильтров
const reloadButton = document.getElementById("reload-button");
reloadButton.addEventListener("click", () => {
    // Устанавливаем стандартные значения в инпуты
    inputBrand.value = "Все";
    inputDiametr.value = "Все";
    inputPriceSort.value = "Все";

    // Инициализируем нажатие на параметр
    allParams[0].click();

    // Сворачиваем все dropdown менюшки
    dropdowns.forEach(function(element) {
        element.classList.remove("active");
    });
});