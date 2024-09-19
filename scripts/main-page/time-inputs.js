// Стили тогла типов времени
const timeToggle = document.getElementById("time-toggle");
const timeToggleSelection = document.getElementById("time-toggle-selection");
const timeToggleTexts = document.querySelectorAll(".toggle-text");

// Скрытые инпуты
// const inputTypeOfPrice = document.getElementById("type_of_price");

timeToggle.addEventListener("click", () => {
    // Стилизация тогла
    timeToggleSelection.classList.toggle("changed");
    timeToggleTexts.forEach(function(text) {
        text.classList.toggle("active");
    });

    // Изменение значений в инпуте
    switch(inputTypeOfPrice.value) {
        case "По часам":
            inputTypeOfPrice.value = "По дням";
            break;
        case "По дням":
            inputTypeOfPrice.value = "По часам";
            break;
    }
});

// Инициализация календарей для инпутов
const calend = new Datepicker('.time-input', {
    time: true,
    min: (function(){
        let date = new Date();
        date.setDate(date.getDate() - 1);
        return date;
    })(),
    weekStart: 1,
});