const user_check_input = document.getElementById("user_check");
user_check_input.addEventListener("input", function() {
    switch(this.value) {
        case "":
            this.value = "cheked";
            break;
        case "cheked":
            this.value = "";
            break;
    }
    console.log(this.value);
});

function unlock_button_in_form(inputs_array, num_of_filled, phone_input, button) {
    // Пробегаемся по всем инпутам
    inputs_array.forEach(function(input, index, array) {
        input.addEventListener("input", function() {
            // Инициализируем счетчик
            let counter = 0;
            
            // Пробегаемся по всем инпутам
            array.forEach(function(element) {
                // Если не пустой
                if (element.value != "") {
                    // Счетчик ++
                    counter++;
                }
            });

            // Если все инпуты заполнены и телефон заполнен правильно
            if (counter === num_of_filled && phone_input.value.length === 12) {
                // Открываем доступ к кнопке
                button.disabled = false;
                button.classList.remove('disabled');
            } else {
                // Закрываем доступ к кнопке
                button.disabled = true;
                button.classList.add('disabled');
            }
        });
    });
}

const login_inputs = document.querySelectorAll(".reg-input.login");
const login_phone_input = document.getElementById("login_phone");
const login_button = document.getElementById("login_button");
unlock_button_in_form(login_inputs, 2, login_phone_input, login_button);

const reg_inputs = document.querySelectorAll(".reg-input.reg");
const reg_phone_input = document.getElementById("user_phone");
const reg_button = document.getElementById("reg_button");
unlock_button_in_form(reg_inputs, 4, reg_phone_input, reg_button);




/* ---------------------- Показ-Скрытие паролей в инпутах --------------- */
// Все инпуты
const password_inputs = document.querySelectorAll(".reg-input.password");
// Кнопки
const show_hide_buttons = document.querySelectorAll(".show_hide_pass");

// Проходимся по всем кнопкам
show_hide_buttons.forEach(function(button, index) {
    // Слушаем клик на каждую кнопку
    button.addEventListener("click", function() {
        // Получаем тип текущего инпута
        let type_of_input = password_inputs[index].type;
        // Проверяем тип инптуа и меняем его
        switch(type_of_input) {
            case "password":
                password_inputs[index].type = "text";
                this.innerHTML = "<img src='../../images/icons/show_icon.svg' alt='show'>";
                break;
            case "text":
                password_inputs[index].type = "password";
                this.innerHTML = "<img src='../../images/icons/hide_icon.svg' alt='hide'>";
                break;
        }
    });
});


/* ---------------------- Форматирование номера телефона --------------- */
const cleavePhone_1 = new Cleave('#login_phone', {
    delimiter: '-',
    blocks: [2, 3, 2, 2],
});
const cleavePhone_2 = new Cleave('#user_phone', {
    delimiter: '-',
    blocks: [2, 3, 2, 2],
});