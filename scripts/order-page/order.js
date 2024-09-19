// Получаем данные из localStorage
let type_of_order = localStorage.getItem("type_of_price");
const start_datetime = localStorage.getItem("time_start");
const end_datetime = localStorage.getItem("time_end");
const type_of_delivery = localStorage.getItem("type_of_delivery");

// Тип аренды
let orderType_Container = document.getElementById("order-type");
const orderType_Input = document.getElementById("order-type-data");
// Дата и врема начала
const orderStart_Container = document.getElementById("order-start");
const orderStart_Input = document.getElementById("order-start-data");
// Дата и время конца
const orderEnd_Container = document.getElementById("order-end");
const orderEnd_Input = document.getElementById("order-end-data");
// Срок аренды
const rentalPeriod_Input = document.getElementById("rental-period-data");
// Тип доставки
const deliveryType_Container = document.getElementById("order-delivery");
const deliveryType_Input = document.getElementById("order-delivery-data");

// Выводим данные на страницу
orderType_Container.textContent = type_of_order;
orderStart_Container.textContent = start_datetime;
orderEnd_Container.textContent = end_datetime;
deliveryType_Container.textContent = type_of_delivery;
// Заполняем данными скрытые инпуты
orderType_Input.value = type_of_order;
orderStart_Input.value = start_datetime;
orderEnd_Input.value = end_datetime;
deliveryType_Input.value = type_of_delivery;


// const orderTypeParent = document.getElementById("order-type"); +++
// // Тип аренды
// let orderType = document.getElementById("order-type").textContent; +++
// // Дата и врема начала
// const orderStart = document.getElementById("order-start").textContent; +++
// // Дата и время конца
// const orderEnd = document.getElementById("order-end").textContent; +++
// // Тип доставки
// const deliveryType = document.getElementById("order-delivery"); +++

// Функция перевода часов в минуты
function timeToMinutes(datetime) {
    // Получаем значение времени
    let [date, time] = datetime.split(" ").map(String);
    // Получаем отдельно часы и минуты
    let [hours, minutes] = time.split(":").map(Number);
    // Считаем общее количество в минутах
    let timeInMinutes = hours * 60 + minutes;
    // Возвращаем
    return timeInMinutes;
}

// Функция для рассчета времени аренды      // counter - костыль
function timeDifference(startTime, endTime, counter) {
    // Получаем разници между временами в минутах
    let differenceInMinutes = endTime - startTime;

    // Получаем часы и минуты отдельно
    let hours = Math.floor(differenceInMinutes / 60);
    let minutes = differenceInMinutes % 60;

    if (counter === 1) {
        // Выводим конкретное время аренды (как дополнение)
        if (minutes === 0) {
            // Если минут 0, то выводим только часы
            let orderTypeText = ` (${hours} ч)`;
            type_of_order += orderTypeText;
            orderType_Container.textContent = type_of_order;

            let rentalValue = `${hours} ч`;
            rentalPeriod_Input.value = rentalValue;
        } else {
            // Если есть минуты, то выводим часы и минуты
            let orderTypeText = ` (${hours}ч ${minutes}мин)`;
            type_of_order += orderTypeText;
            orderType_Container.textContent = type_of_order;
            rentalPeriod_Input.value = orderTypeText;

            let rentalValue = `${hours} ч ${minutes}мин`;
            rentalPeriod_Input.value = rentalValue;
        }
    }

    // Переводим значение часов в десятичный вид
    let timeFactor;
    switch(minutes) {
        case 0:
            timeFactor = hours;
            break;
        case 15:
            timeFactor = hours + 0.25;
            break;
        case 30:
            timeFactor = hours + 0.5;
            break;
        case 45:
            timeFactor = hours + 0.75;
            break;
    }
    // Возвращаем коэффициент времени
    return timeFactor;
}

function getCurrentDate() {
    // Создаем объект Date для текущей даты
    let currentDate = new Date();

    // Получаем день, месяц и год
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    let year = currentDate.getFullYear();

    // Добавляем ведущий ноль для дней и месяцев, если они меньше 10
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;

    // Собираем строку в формате ДД.ММ.ГГГГ
    let formattedDate = day + '.' + month + '.' + year;

    // Инпут с текущей датой
    const currentDate_Input = document.getElementById("current-date-data");
    currentDate_Input.value = formattedDate;
}
getCurrentDate();

// Форматируем дату в нужный вид
function formatingDate(datetime) {
    // Получаем дату
    let [date, time] = datetime.split(" ").map(String);

    // Разделяем и переворачиваем
    dateArr = date.split(".");
    dateArr.reverse();
    
    // Объединяем
    let formatedDate = dateArr.join("-");
    // Возвращаем
    return formatedDate;
}

// Получаем все поля с ценами
const pricesInTable = document.querySelectorAll(".money");

// Проверяем тип аренды
switch(type_of_order) {
    case "По часам":
        // Переводим в минуты начало и конец времени аренды
        startTimeInMinutes = timeToMinutes(start_datetime);
        endTimeInMinutes = timeToMinutes(end_datetime);

        // Получаем коэффициент времени
        const timeFactor = timeDifference(startTimeInMinutes, endTimeInMinutes, 1);
 
        // Проходимся по всем ценам
        pricesInTable.forEach(function(price) {
            // Получаем фиксированную цену самого велика
            let initialPrice = Number(price.getAttribute("data-price"));
            // Вычисляем новую цену с учетом времени аренды
            let fixedPrice = initialPrice * timeFactor;
            // Выводим
            price.innerHTML = fixedPrice + " тыс";
            // Вносим значение в скрытый инпут
            let table_item = price.closest(".table_item");
            let table_input_cost = table_item.querySelector(".table-item-input.detail-cost");
            table_input_cost.value = fixedPrice;
        });

        break;

    case "По дням":
        // Форматируем дату начала и конца аренды
        let startDate = new Date(formatingDate(start_datetime));
        let endDate = new Date(formatingDate(end_datetime));
        // Рассчитываем разницу в миллисекундах между двумя датами
        let differenceInMilliseconds = endDate - startDate;
        // Преобразуем миллисекунды в дни
        let differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;

        let orderTypeText = ` (${differenceInDays} дн)`;
        type_of_order += orderTypeText;
        orderType_Container.textContent = type_of_order;
        rentalPeriod_Input.value = `${differenceInDays} дн`;

        // Проходимся по всем ценам
        pricesInTable.forEach(function(price) {
            // Получаем фиксированную цену самого велика
            let initialPrice = Number(price.getAttribute("data-price"));
            // Вычисляем новую цену с учетом дней аренды
            let fixedPrice = initialPrice * differenceInDays;
            // Выводим
            price.innerHTML = fixedPrice + " тыс";
            // Вносим значение в скрытый инпут
            let table_item = price.closest(".table_item");
            let table_input_cost = table_item.querySelector(".table-item-input.detail-cost");
            table_input_cost.value = fixedPrice;
        });

        break;
}


/* ------------ Управление количеством велосипедов ------------ */
// Все кнопки минуса
const minusButtons = document.querySelectorAll(".table_btn.minus");
// Все кнопки плюса
const plusButtons = document.querySelectorAll(".table_btn.plus");

const finalPrice = document.getElementById("final-price");
const deliveryPrice = document.getElementById("final-delivery");
const tableInputs = document.querySelectorAll(".table_input");

// Скрытые инпуты цены доставки и итоговой суммы
const deliveryPrice_input = document.getElementById("user-delivery-cost");
const finalPrice_Input = document.getElementById("user-order-cost");

function getFinalPrice() {
    // Инициализация суммы
    let totalSum = 0;
    // Проходимся по всем ценам
    pricesInTable.forEach(function(pricesInTable) {
        // Получаем цену
        let pricesInTableValue = pricesInTable.textContent;
        let [initialPrice, text] = pricesInTableValue.split(" ").map(String);
        // Преобразуем цену в число
        initialPrice = Number(initialPrice);
        // Добавляем цену к сумме
        totalSum += initialPrice;
    });

    // Инициализация счетчика количества великов
    let totalCount = 0;
    // Считаем количество великов
    tableInputs.forEach(function(input) {
        totalCount += Number(input.value);
    });

    console.log(type_of_delivery);

    // Проверяем тип доставки
    switch(type_of_delivery) {
        case "В пункт выдачи":
            // Выводим информацию о цене доставки
            deliveryPrice.textContent = "0 тыс";
            // Вносим значение цены доставки в скрытый инпут
            deliveryPrice_input.value = "0";
            break;
        case "По адресу":
            // Выводим информацию о цене доставки
            if (totalCount >= 4) {
                // Выводим информацию о цене доставки
                deliveryPrice.textContent = "0 тыс";
                // Вносим значение цены доставки в скрытый инпут
                deliveryPrice_input.value = "0";
            } else {
                // Прибавляем доставку к стоимости
                totalSum += 30;
                // Выводим информацию о цене доставки
                deliveryPrice.textContent = "30 тыс";
                // Вносим значение цены доставки в скрытый инпут
                deliveryPrice_input.value = "30";
            }
            break;
    }
    
    finalPrice.textContent = totalSum + " тыс";
    finalPrice_Input.value = totalSum;
}
getFinalPrice();

// Функция для получения фиксированной цены с учетом времени аренды
function getFixedPrice(columnPrice) {  
    // Проверяем нет ли data- атрибута
    // Это нужно для получены цены лишь один раз
    if (!columnPrice.hasAttribute("data-initial")) {
        // Получаем текстовое знаение
        let columnPriceValue = columnPrice.textContent;
        // Получаем цену
        let [initialPrice, text] = columnPriceValue.split(" ").map(String);
        // Преобразуем цену в число
        initialPrice = Number(initialPrice);
        // Записываем цену в data- атрибут
        columnPrice.setAttribute("data-initial", initialPrice);
    }

    // Получаем значение цены из артрибута
    let fixedPrice = columnPrice.getAttribute("data-initial");
    // Возвращаем цену
    return fixedPrice;
}

// Перебор всех кнопок "минус"
minusButtons.forEach(function(btn) {
    // Слушаем клик
    btn.addEventListener("click", function() {
        // Получаем инпут в котором сидит текущее количество великов
        let column = this.closest(".table_column");
        let input = column.querySelector(".table_input");
        // Получаем текущее количество великов
        let value = input.value;
        value = Number(value);

        // Получаем тег с ценой (для вызова функции)
        let row = this.closest(".table_row");
        let columnPrice = row.querySelector(".money");

        // Если количество > 1
        if (value > 1) {
            // Уменьшаем значение в инпуте
            input.value = value - 1;
            // Получаем цену из функции
            let fixedPrice = getFixedPrice(columnPrice);
            // Высчитываем новую цену с учетом количества
            let newPrice = (value - 1) * fixedPrice;
            // Выводим новыу цену
            columnPrice.innerHTML = newPrice + " тыс";
            // Вносим значение цены в скрытый инпут
            let table_item = this.closest(".table_item");
            let table_input_cost = table_item.querySelector(".table-item-input.detail-cost");
            table_input_cost.value = newPrice;
            // Вносим значение количества в скрытый инпут
            let table_input_amount = table_item.querySelector(".table-item-input.amount");
            table_input_amount.value = value - 1;
        } else {
            // Если 1 то не изменяем значение
            input.value = value;
        }
        // Подсчет итоговой стоимости
        getFinalPrice();        
    });
});

// Перебор всех кнопок "плюс"
plusButtons.forEach(function(btn) {
    // Слушаем клик
    btn.addEventListener("click", function() {
        // Получаем инпут в котором сидит текущее количество великов
        let column = this.closest(".table_column");
        let input = column.querySelector(".table_input");
        // Получаем текущее количество великов
        let value = input.value;
        value = Number(value);

        // Получаем тег с ценой (для вызова функции)
        let row = this.closest(".table_row");
        let columnPrice = row.querySelector(".money");

        // Если количество < 99
        if (value < 99) {
            // Увеличиваем значение в инпуте
            input.value = value + 1;
            // Получаем цену из функции
            let fixedPrice = getFixedPrice(columnPrice);
            // Высчитываем новую цену с учетом количества
            let newPrice = (value + 1) * fixedPrice;
            // Выводим новыу цену
            columnPrice.innerHTML = newPrice + " тыс";
            // Вносим значение цены в скрытый инпут
            let table_item = this.closest(".table_item");
            let table_input_cost = table_item.querySelector(".table-item-input.detail-cost");
            table_input_cost.value = newPrice;
            // Вносим значение количества в скрытый инпут
            let table_input_amount = table_item.querySelector(".table-item-input.amount");
            table_input_amount.value = value + 1;
        } else {
            // Если 99 то не изменяем значение
            input.value = value;
        }
        // Подсчет итоговой стоимости
        getFinalPrice();
    });
});