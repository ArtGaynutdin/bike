// Кнопки выбора типа оплаты
const paymentButtons = document.querySelectorAll(".payment-type-btn");
// Скрытый инпут с типом оплаты
const paymentInput = document.getElementById("user-payment");

// Пробегаемся по всем кнопкам
paymentButtons.forEach(function(btn, index, array) {
    // Обрабатываем клик
    btn.addEventListener("click", function() {
        // Для всех кнопок удаляем "active"
        array.forEach(function(element) {
            element.classList.remove("active");
        });
        // Для текущей кнопки добавляем
        btn.classList.add("active");

        // Меняем значение в инпуте
        switch(paymentInput.value) {
            case "Онлайн":
                paymentInput.value = "На месте";
                break;
            case "На месте":
                paymentInput.value = "Онлайн";
                break;
        }
    });
});

// Фактическое время возврата
const endDate = document.querySelector(".return-info.date");
const endTime = document.querySelector(".return-info.time");
// Тип аренды
const typeOfOrder = document.getElementById("order-type-data");
// Текущее время возврата (наверху)
let [endDateValue, endTimeValue] = end_datetime.split(" ").map(String);

// Проверяем тип аренды
switch(typeOfOrder.value) {
    case "По часам":
        // Выводим фактическую дату возврата
        endDate.textContent = endDateValue;
        endTime.textContent = endTimeValue;
        break;
    case "По дням":
        // Выводим фактическую дату возврата
        endDate.textContent = endDateValue;
        endTime.textContent = "9:00 - 18:00";
        break;
}

// Валидация ввода номера телефона
const cleavePhone = new Cleave('#user-phone', {
    delimiter: '-',
    blocks: [2, 3, 2, 2],
});

// Получаем все инпуты
const registrationInputs = document.querySelectorAll(".reg-input");
// Получаем инпут телефона
const userPhoneInput = document.getElementById("user-phone");
// Получаем кнопку отправки
const submitOrderButton = document.getElementById("submit-order-btn");
// Пробегаемся по всем инпутам
registrationInputs.forEach(function(input, index, array) {
    // Слушаем событие ввода
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
        if (counter === 5 && userPhoneInput.value.length === 12) {
            // Открываем доступ к кнопке
            submitOrderButton.disabled = false;
            submitOrderButton.classList.remove('disabled');
            // console.log("btn is opened!");
        } else {
            // Закрываем доступ к кнопке
            submitOrderButton.disabled = true;
            submitOrderButton.classList.add('disabled');
            // console.log("btn is disabled!");
        }
    });
});

// Сообщение с предупреждение о верном вводе
const arrangeMessage = document.querySelector(".arrange-message");
// Слушаем клик на кнопку регистрации
submitOrderButton.addEventListener("click", function() {
    // Инициализируем счетчик
    let counter = 0;
    // Пробегаемся по всем инпутам
    registrationInputs.forEach(function(input) {
        // Если инпут не пуст
        if (input.value != "") {
            // Счетчик ++
            counter++;
        }
    });
    // Если хоть один инпут не заполнен и телефон не верен
    if (counter !== 5 && userPhoneInput.value.length !== 12) {
        // Показываем сообшение
        if (arrangeMessage.classList.contains("none")) {
            arrangeMessage.classList.remove("none");
        }
    } else {
        console.log("Заказ успешно оформлен!");
    }
});