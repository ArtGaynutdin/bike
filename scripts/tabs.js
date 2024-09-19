// Все кнопки табов
const tab_buttons = document.querySelectorAll(".tab_btn");
// Все контенты табов
const tab_contents = document.querySelectorAll(".tab_content");

// Пробегаемся по всем кнопкам
tab_buttons.forEach(function(button, index, array) {
    // Слушаем клик на кнопку
    button.addEventListener("click", function () {
        // У всех кнопок удаляем active
        array.forEach(function(element) {
            element.classList.remove("active");
        });
        // К текущей кнопке добавляем active
        button.classList.add("active");

        // Удаляем active у всех контентов
        tab_contents.forEach(function(content) {
            content.classList.remove("active");
        });

        // Добавляем active к текущему контенту
        tab_contents[index].classList.add("active");
    });
});