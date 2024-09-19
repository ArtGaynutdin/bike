// Все кнопки "Оплатить" в заказах
const order_payment_buttons = document.querySelectorAll('.order_button.to_pay');
// Затемнение фона
const overlay = document.getElementById('overlay');

order_payment_buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Получаем конкретную модалку
        let buttons_wrapper = this.closest('.buttons_wrapper');
        let modal_field = buttons_wrapper.querySelector('.payment_modal');
        // let order_card = this.closest('.order');
        // let modal_field = order_card.querySelector('.payment_modal');

        // Показываем модалку
        modal_field.classList.remove('none');
        overlay.classList.add('visible');

        // Вызываем метод инпут (для активации кнопки при изначальном полном заполнении)
        let first_input = buttons_wrapper.querySelector('.payment_input');
        // Создаем и вызываем событие input
        let event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        first_input.dispatchEvent(event);
    });
});

// Все кнопки закрытия модалок
const close_payment_modal_buttons = document.querySelectorAll('.payment_close_btn');
// При нажатии на кнопку скрываем конкретную модалку
close_payment_modal_buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        let modal_field = this.closest('.payment_modal');
        modal_field.classList.add('none');
        overlay.classList.remove('visible');
    });
});


/* ----------------- Механика label ----------------- */
const labels_for_check = document.querySelectorAll('.label_for_check');

labels_for_check.forEach(function(label) {
    // Слушаем клик на label
    label.addEventListener('click', function() {
        // Получаем инпут
        let wrapper = this.closest('.payment_form_item');
        let input = wrapper.querySelector('.payment_input');
        // Изменяем значение инпута
        switch(input.value) {
            case 'false':
                input.checked = true;
                input.value = 'true';
                break;
            case 'true':
                input.checked = false;
                input.value = 'false';
                break;
        }
        // Создаем и вызываем событие input
        let event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        input.dispatchEvent(event);
    });
});

const check_inputs = document.querySelectorAll('.payment_input.check');
check_inputs.forEach(function(input) {
    input.addEventListener('click', function() {
        switch(input.value) {
            case 'false':
                input.value = 'true';
                break;
            case 'true':
                input.value = 'false';
                break;
        }
    });
});


/* ----------------- Перемещение фокуса при вводе кода ----------------- */
// Все инпуты ввода кода подтверждения
const code_inputs = document.querySelectorAll('.code_input');

code_inputs.forEach(function(input, index, array) {
    input.addEventListener('input', function() {
        // Если введен символ
        if (this.value.length === 1) {
            // Если индекс текущего инпута меньше количества инпутов минус 1
            if (index < array.length - 1) {
                // Переходим на следующий инпут
                array[index + 1].focus();
            }
        }

        // Получаем все инпуты этой формы
        let form = this.closest('.code_form');
        let inputs = form.querySelectorAll('.code_input');
        let sub_btn = form.querySelector('.payment_btn');

        // Инициализируем счетчик
        let counter = 0;
        inputs.forEach(function(element) {
            // Если не пустой
            if (element.value != '') {
                // Счетчик ++
                counter++;
            }
        });

        // Если все инпуты заполнены и телефон заполнен правильно
        if (counter === 4) {
            // Открываем доступ к кнопке
            sub_btn.disabled = false;
            sub_btn.classList.remove('disabled');
            // console.log("btn is opened!");
        } else {
            // Закрываем доступ к кнопке
            sub_btn.disabled = true;
            sub_btn.classList.add('disabled');
            // console.log("btn is disabled!");
        }
    });
});


/* ----------------- Переход слайдов в модалке ----------------- */
// Все кнопки "Оплатить" в модалках
const pay_click_buttons = document.querySelectorAll('.payment_btn.first');

pay_click_buttons.forEach(function(button) {
    // Слушаем клик на кнопку
    button.addEventListener('click', function() {
        // Получаем слайды
        let modal_field = this.closest('.payment_modal');
        let first_slide = modal_field.querySelector('.payment_slide.first');
        let second_slide = modal_field.querySelector('.payment_slide.second');
        // Переключаем видимость слайдов
        first_slide.classList.add('hidden');
        second_slide.classList.remove('hidden');
    });
});


/* ----------------- Рандомный код для подтверждения в каждую форму ----------------- */
// Функция получения строки с рандомными числами
function getRandomVerifyCode() {
    // Строка
    let code_string = '';
    // Цикл добавления
    for (let i = 0; i < 4; i++) {
        let num = Math.round(Math.random() * (9 - 0) + 0);
        code_string += num;
    }
    // Возвращаем строку
    return code_string;
}

// Все скрытые инпуты кода верификации (для добавления в БД)
const code_verify_inputs = document.querySelectorAll('.payment_input.hidden');
// Вносим значение кода в инпуты
code_verify_inputs.forEach(function(input) {
    input.value = getRandomVerifyCode();
});


/* ----------------- Валидация ввода номера карты ----------------- */
const payment_cardnumber_inputs = document.querySelectorAll('.payment_input.card_number');

payment_cardnumber_inputs.forEach(function(input) {
    new Cleave(input, {
        delimiter: ' ',
        blocks: [4, 4, 4, 4],
    });
});


/* ----------------- Валидация форм карты для оплаты ----------------- */
const global_payment_inputs = document.querySelectorAll('.payment_input');

// Пробегаемся по всем инпутам
global_payment_inputs.forEach(function(input) {
    // Слушаем событие ввода
    input.addEventListener('input', function() {
        // Получаем все инпуты этой формы
        let form = this.closest('.payment_form');
        let inputs = form.querySelectorAll('.payment_input');

        let card_input = form.querySelector('.payment_input.card_number');
        let date_input_1 = form.querySelector('.payment_input.date_1');
        let date_input_2 = form.querySelector('.payment_input.date_2');
        let check_input = form.querySelector('.payment_input.check');
        let sub_btn = form.querySelector('.payment_btn');

        // console.log(inputs);
        // console.log(check_input.value);
        // console.log(sub_btn);

        // Инициализируем счетчик
        let counter = 0;
        inputs.forEach(function(element) {
            // Если не пустой
            if (element.value != '') {
                // Счетчик ++
                counter++;
            }
        });

        // console.log(counter);

        if (check_input) {
            // Если все инпуты заполнены и телефон заполнен правильно
            if (counter === 6 // + 1 это скрытый номер заказа
                && card_input.value.length === 19
                && date_input_1.value.length === 2
                && date_input_2.value.length === 2
                ) {
                // Открываем доступ к кнопке
                sub_btn.disabled = false;
                sub_btn.classList.remove('disabled');
                // console.log("btn is opened!");
            } else {
                // Закрываем доступ к кнопке
                sub_btn.disabled = true;
                sub_btn.classList.add('disabled');
                // console.log("btn is disabled!");
            }
        } else {
            if (counter === 5 // + 1 это скрытый номер заказа
                && card_input.value.length === 19
                && date_input_1.value.length === 2
                && date_input_2.value.length === 2
                ) {
                // Открываем доступ к кнопке
                sub_btn.disabled = false;
                sub_btn.classList.remove('disabled');
                // console.log("btn is opened!");
            } else {
                // Закрываем доступ к кнопке
                sub_btn.disabled = true;
                sub_btn.classList.add('disabled');
                // console.log("btn is disabled!");
            }
        }

        
    });
});