/* ----------------- Изменение данных пользователя ----------------- */
// Кнопки для изменения (вызова инпута)
const edit_buttons = document.querySelectorAll(".action_btn.edit");
// Начальные поля данных
const personal_data_init = document.querySelectorAll(".personal_data");
// Поля с инпутами
const personal_data_edit = document.querySelectorAll(".edit_personal_data");

// Обрабатываем клик на кнопку изменения
edit_buttons.forEach(function(button, index) {
    button.addEventListener("click", function() {
        // Скрываем все поля с инпутами
        personal_data_edit.forEach(function(data) {
            data.classList.add("none");
        });
        // Показываем текущее поле с инпутом
        personal_data_edit[index].classList.remove("none");

        // Показываем все поля с данными
        personal_data_init.forEach(function(data) {
            data.classList.remove("none");
        });
        // Скрываем текущее поле с данными
        personal_data_init[index].classList.add("none");

        warning_msg.classList.add("none");
    });
});

// Кнопки закрытия поля изенения
const close_buttons = document.querySelectorAll(".action_btn.close");
// Обрабатываем клик на кнопку закрытия
close_buttons.forEach(function(button, index) {
    button.addEventListener("click", function() {
        // Скрываем текущее поле с инпутом
        personal_data_edit[index].classList.add("none");
        // Показываем текущее поле с данными
        personal_data_init[index].classList.remove("none");

        warning_msg.classList.add("none");
    });
});


/* ----------------- Валидация ввода номера телефона ----------------- */
const cleavePhone = new Cleave('#user_phone', {
    delimiter: '-',
    blocks: [2, 3, 2, 2],
});


/* ----------------- Скрытие пароля ----------------- */
// Поле пароля
const password_field = document.getElementById("password_field");
// Содержание
let password_string = password_field.textContent;
// Массив из содержания
let password_letters = password_string.split("");
// Скрытая строка
let password_hidden_str = "";

for (let i = 0; i < password_letters.length; i++) {
    // Наполняем скрытую строку
    password_hidden_str += "*";
}
// Выводим скрытый пароль на стрницу
password_field.textContent = password_hidden_str;


/* ----------------- Выводим оповещение ----------------- */
const notification = document.getElementById("notification");

if (notification) {
    notification.classList.add("show");
    // setTimeout(() => {
    //     notification.classList.add("show");
    // }, 100);

    setTimeout(() => {
        notification.classList.add("hide");
        setTimeout(() => {
            notification.remove();
        }, 1000);
    }, 4000);
}