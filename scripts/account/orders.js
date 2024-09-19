// Все открывающиеся поля
const details = document.querySelectorAll(".details");
// Все кнопки для открытия
const details_buttons = document.querySelectorAll(".show_hide_details_btn");

// Слушаем нажатие на каждую кнопку
details_buttons.forEach(function(button, index, array) {
    button.addEventListener("click", function() {
        // Если не текущий - то удалить active
        array.forEach(function(element) {
            if (element !== button) {
                element.classList.remove("active");
            }
        });
        // К текущему добавить active
        button.classList.toggle("active");

        // Если не текущее поле - скрыть
        details.forEach(function(detail, i) {
            if (i !== index) {
                detail.classList.remove("open");
            }
        });
        // Если текущее - показать
        details[index].classList.toggle("open");
    });
});

// Удаление лишних отступов
const buttons_wrappers = document.querySelectorAll(".buttons_wrapper");
buttons_wrappers.forEach(function(wrapper) {
    if (wrapper.innerHTML.trim() === "") {
        wrapper.style.marginTop = "0px";
    }
});