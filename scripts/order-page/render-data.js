class Bycicle {
    constructor(id, title, daimetr, price, link) {
        this.id = id;
        this.title = title;
        this.daimetr = daimetr;
        this.price = price;
        this.link = link;
    }
}

// Создаем пустой массив для всех строк таблицы
const rows = [];

// Получаем все ключи в localStorage
const keys = Object.keys(localStorage);
// Перебираем ключи
keys.forEach(function(key) {
    // Получаем значение ключа
    let newCard = localStorage.getItem(key);
    // Проверяем если ключ называется "card_ 1,2,3..."
    if (key.includes("card_")) {
        // Вносим данные по ключу в массив строк таблицы
        rows.push(newCard);
    }
});

// Функция форматирования полученных значений
function parsingRows(row, array) {
    // Разбиваем строку по @
    let [id, title, daimetr, price, link] = row.split("@").map(String);
    // console.log("ID: " + id);
    // console.log("Title: " + title);
    // console.log("Diametr: " + daimetr);
    // console.log("Price: " + price);
    // console.log("Link: " + link);
    // Создаем объект карточки
    let card = new Bycicle(id, title, daimetr, price, link);
    // Записываем объект в массив
    array.push(card);
}

// Массив готовых объектов карточек
const cards = [];

// Парсим все строки
rows.forEach(function(row) {
    parsingRows(row, cards);
});

// Получаем итоговую таблицу
const resultTable = document.getElementById("result-table");
const order_id = resultTable.getAttribute("data-order-id");

// Получаем тип аренды
const order_type = localStorage.getItem("type_of_price");

// Функция создания элемента таблицы
function createTableElement(card, order_type) {
    // Создаем элемент таблицы
    const tableItem = document.createElement('li');
    tableItem.classList.add('table_item');

    // Создаем элемент строки
    const tableRow = document.createElement('ul');
    tableRow.classList.add('table_row');
    tableItem.appendChild(tableRow);

    // Создание элемента для текста "Фото"
    const textPhotoColumn = document.createElement('li');
    textPhotoColumn.classList.add('table_column', 'text', 'photo');
    textPhotoColumn.textContent = 'Фото';
    tableRow.appendChild(textPhotoColumn);

    // Создание элемента для текста "Название"
    const textTitleColumn = document.createElement('li');
    textTitleColumn.classList.add('table_column', 'text', 'title');
    textTitleColumn.textContent = 'Название';
    tableRow.appendChild(textTitleColumn);

    // Создание элемента для текста "Количество"
    const textQuantityColumn = document.createElement('li');
    textQuantityColumn.classList.add('table_column', 'text', 'number');
    textQuantityColumn.textContent = 'Количество';
    tableRow.appendChild(textQuantityColumn);

    // Создание элемента для текста "Цена за час/день"
    const textPriceColumn = document.createElement('li');
    textPriceColumn.classList.add('table_column', 'text', 'price');

    switch(order_type) {
        case 'По часам':
            textPriceColumn.textContent = 'Цена за час';
            break;
        case 'По дням':
            textPriceColumn.textContent = 'Цена за день';
            break;
    }
    tableRow.appendChild(textPriceColumn);

    // Создание элемента для текста "Цена"
    const textTotalPriceColumn = document.createElement('li');
    textTotalPriceColumn.classList.add('table_column', 'text', 'total');
    textTotalPriceColumn.textContent = 'Цена';
    tableRow.appendChild(textTotalPriceColumn);

    // Создание элемента для фото
    const photoColumn = document.createElement('li');
    photoColumn.classList.add('table_column', 'photo');

    // Вложенный элемент для фото
    const tablePhoto = document.createElement('div');
    tablePhoto.classList.add('table_photo');

    // Фото
    const img = document.createElement('img');
    img.src = `${card.link}`;
    img.alt = 'photo';

    tablePhoto.appendChild(img);
    photoColumn.appendChild(tablePhoto);
    tableRow.appendChild(photoColumn);

    // Создание элемента для названия
    const titleColumn = document.createElement('li');
    titleColumn.classList.add('table_column', 'value', 'title');
    titleColumn.textContent = `${card.title} (${card.daimetr}")`;
    tableRow.appendChild(titleColumn);

    // Создание элемента для кнопок
    const btnColumn = document.createElement('li');
    btnColumn.classList.add('table_column', 'value', 'buttons');

    // Кнопка "-"
    const minusBtn = document.createElement('button');
    minusBtn.classList.add('table_btn', 'minus');
    minusBtn.textContent = '-';
    btnColumn.appendChild(minusBtn);

    // Инпут с количеством
    const input = document.createElement('input');
    input.classList.add('table_input');
    input.setAttribute('readonly', true);
    input.value = '1';
    btnColumn.appendChild(input);

    // Кнопка "+"
    const plusBtn = document.createElement('button');
    plusBtn.classList.add('table_btn', 'plus');
    plusBtn.textContent = '+';
    btnColumn.appendChild(plusBtn);

    tableRow.appendChild(btnColumn);

    // Создание элемента для фиксированной цены
    const priceColumn = document.createElement('li');
    priceColumn.classList.add('table_column', 'value', 'price');
    priceColumn.textContent = `${card.price} тыс`;
    tableRow.appendChild(priceColumn);

    // Создание элемента итоговой цены
    const TotalPriceColumn = document.createElement('li');
    TotalPriceColumn.classList.add('table_column', 'value', 'total');

    // Параграф с атрибутом и значением
    const priceValue = document.createElement('p');
    priceValue.classList.add('money');
    priceValue.setAttribute('data-price', `${card.price}`);
    priceValue.textContent = `${card.price} тыс`;
    TotalPriceColumn.appendChild(priceValue);

    tableRow.appendChild(TotalPriceColumn);    

    // Создаем элемент формы
    const form = document.createElement("form");
    // Устанавливаем метод формы
    form.method = "post";
    // Устанавливаем атрибуты формы
    form.action = "/order-detail";
    form.classList.add("table-item-form");

    // Создаем скрытый инпут для order-id
    const orderIdInput = document.createElement("input");
    orderIdInput.type = "hidden";
    orderIdInput.name = "order-id";
    orderIdInput.value = `${order_id}`;
    orderIdInput.classList.add("table-item-input", "client-id");

    // Создаем скрытый инпут для bycicle-id
    const bycicleIdInput = document.createElement("input");
    bycicleIdInput.type = "hidden";
    bycicleIdInput.name = "bycicle-id";
    bycicleIdInput.value = `${card.id}`;
    bycicleIdInput.classList.add("table-item-input", "bycicle-id");

    // Создаем скрытый инпут для amount
    const amountInput = document.createElement("input");
    amountInput.type = "hidden";
    amountInput.name = "amount";
    amountInput.value = `1`;
    amountInput.classList.add("table-item-input", "amount");

    // Создаем скрытый инпут для detail-cost
    const detailCostInput = document.createElement("input");
    detailCostInput.type = "hidden";
    detailCostInput.name = "detail-cost";
    detailCostInput.value = ``;
    detailCostInput.classList.add("table-item-input", "detail-cost");

    // Добавляем инпуты в форму
    form.appendChild(orderIdInput);
    form.appendChild(bycicleIdInput);
    form.appendChild(amountInput);
    form.appendChild(detailCostInput);

    tableItem.appendChild(form);

    // Возвращаем элемент
    return tableItem;
}

// Выводим все элементы на страницу
cards.forEach(function(card) {
    // Передаем объект карточки в функцию
    let tableElement = createTableElement(card, order_type);
    // Добавляем полученный элемент в итоговую таблицу
    resultTable.appendChild(tableElement);
});