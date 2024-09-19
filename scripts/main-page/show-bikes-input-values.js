// Получаем кнопку "Найти"
const searchButton = document.getElementById("search-btn");
// Получаем все скрытые инпуты
const searchInputs = document.querySelectorAll(".search_input");

// Обработка клика на кнопку
searchButton.addEventListener("click", () => {
    // Получаем все отмеченные чекбоксы
    const checkedCheckboxes = document.querySelectorAll(".type_checkbox:checked");

    // Получаем массив значений у всех чекнутых инпутов
    const selectedTypes = Array.from(checkedCheckboxes).map(function(checkbox) {
        let bike_type = checkbox.closest(".bike_type");
        let bike_type_value = bike_type.getAttribute("data-type");
        return bike_type_value;
    });
    
    // Заносим значения из чекнутых инпутов в скрытые инпуты формы поиска
    selectedTypes.forEach(function(type, index) {
        searchInputs[index].value = type;
    });
});