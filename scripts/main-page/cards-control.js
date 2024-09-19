let paramClickHandlers = [];
let buttonClickHandlers = [];

// Функция для сбора карточек и кнопок после загрузки результатов поиска
function collectCardsAndButtons() {
    // Форма со скрытыми инпутами карточек
    const arrangeForm = document.getElementById("arrange_form");
    // Кнопка "Оформить"
    const arrangeButton = document.getElementById("arrange-btn");
    // Сообщение о полном заполнении дат
    const arrangeMessage = document.querySelector(".arrange-message");
    // Функция установки статуса кнопки "Оформить"
    function toggleArrangeButton() {
        const checkedButtons = document.querySelectorAll('.bycicle__to-cart.checked');
        if (checkedButtons.length > 0) {
            arrangeButton.disabled = false;
            arrangeButton.classList.remove('disabled');
        } else {
            arrangeButton.disabled = true;
            arrangeButton.classList.add('disabled');
        }
    }
      

    // Находим все карточки товаров и кнопки внутри блока с id="cards"
    const cards = Array.from(document.querySelectorAll('#cards .bycicle'));
    const buttons = Array.from(document.querySelectorAll('#cards .bycicle__to-cart'));

    paramClickHandlers.forEach(handler => {
        allParams.forEach(param => {
          param.removeEventListener("click", handler);
        });
    });
    buttonClickHandlers.forEach(handler => {
        buttons.forEach(button => {
          button.removeEventListener("click", handler);
        });
    });
    paramClickHandlers = [];
    buttonClickHandlers = [];  

    // Обработка клика на любой выпадающий параметр
    allParams.forEach(param => {
        const paramClickHandler = () => {
            filterCards(cards);
            sortCardsByPrice(cards);
        };
        param.addEventListener("click", paramClickHandler);
        paramClickHandlers.push(paramClickHandler);
    });

    // Счетчик скрытых инпутов (с данными из карточек)
    let counter = 1;
    
    buttons.forEach(button => {
        const buttonClickHandler = () => {
            // Меняем класс кнопки
            button.classList.toggle("checked");
            // Функция установки disabled для кнопки "Оформить"
            toggleArrangeButton();
            // Действие кнопки
            switch (button.textContent) {
                // Если выбираем
                case "Выбрать":
                    // Меняем текст кнопки
                    button.textContent = "Выбрано";

                    // Получаем нужные данные с карточки продукта
                    let card = button.closest(".bycicle");
                    let id = card.getAttribute("data-card-id");
                    let price = card.getAttribute("data-price");
                    let diametr = card.getAttribute("data-diametr");
                    let title = card.querySelector(".bycicle__title").textContent;
                    let photoLink = card.querySelector("img").getAttribute("src");

                    // Формируем инпут с полученными данными
                    let input = document.createElement("input");
                    input.type = "hidden";
                    input.name = "bike_" + counter;
                    input.classList.add("card-data");
                    input.value = `${id}@${title}@${diametr}@${price}@${photoLink}`;
                    // input.value = `Title: ${title}, Price: ${price}, Photo: ${photoLink}`;

                    // Добавляем созданный инпут в форму arrangeForm
                    arrangeForm.appendChild(input);
                    // Увеличиваем счетчик для следующего велосипеда
                    counter++;
                    break;
                // Если снимаем выбор
                case "Выбрано":
                    // Меняем текст кнопки
                    button.textContent = "Выбрать";
                    // Удаляем инпут с соответствующим именем
                    let inputsToRemove = arrangeForm.querySelectorAll(`input[name="bike_${counter - 1}"]`);
                    inputsToRemove.forEach(input => input.remove());
                    // Уменьшаем счетчик, если он больше 1
                    if (counter > 1) {
                        counter--;
                    }
                    break;
            }
        };
        button.addEventListener("click", buttonClickHandler);
        buttonClickHandlers.push(buttonClickHandler);
    });

    // Обработка нажатия на кнопку "Оформить"
    arrangeButton.addEventListener("click", function() {
        // Если кнопка доступна (поля даты и времени заполнены)
        if (valueTimeStart.value && valueTimeEnd.value) {
            localStorage.clear();
            
            // Тип аренды
            localStorage.setItem('type_of_price', inputTypeOfPrice.value);
            // Дата и время начала
            localStorage.setItem('time_start', valueTimeStart.value);
            // Дата и время конца
            localStorage.setItem('time_end', valueTimeEnd.value);
            // Тип доставки
            localStorage.setItem('type_of_delivery', valueTypeOfDelivery.value);

            // Цикл со всеми скрытыми инпутами (данные с карточек)
            const cardDataHiddenInputs = document.querySelectorAll(".card-data");
            console.log("Столько карточек нажато: " + cardDataHiddenInputs.length);

            cardDataHiddenInputs.forEach(function(input, index) {
                localStorage.setItem(`card_${index}`, input.value);
            });

            console.log("Load to Storage!");
            window.location.href = '/order';
        }
        // Если кнопка не доступна (поля даты и времени не заполнены)
        else {
            if (arrangeMessage.classList.contains("none")) {
                arrangeMessage.classList.remove("none");
            }
        }
    });
}

// Ожидаем событие отправки формы поиска
document.addEventListener('DOMContentLoaded', function() {
    const findForm = document.getElementById("find_form");
    findForm.addEventListener('submit', function (event) {
        // console.log("submit on form button!");
        event.preventDefault();

        // Форма со скрытыми инпутами карточек
        const arrangeForm = document.getElementById("arrange_form");

        arrangeForm.innerHTML = '<button type="button" class="action-button disabled" id="arrange-btn" disabled>Оформить</button>';

        // Сообщение о полном заполнении дат
        const arrangeMessage = document.querySelector(".arrange-message");
        if (!arrangeMessage.classList.contains("none")) {
            arrangeMessage.classList.add("none");
        }

        // Куда выводим карточки
        const resultCards = document.getElementById("cards");

        // AJAX-запрос
        setTimeout(() => {
            let searchQuery = new URLSearchParams(new FormData(this));
            fetch('/search-bikes', {
                method: 'POST',
                body: searchQuery,
            })
            .then(response => response.text())
            .then(data => {
                // Вставляем полученные карточки в блок с id="cards"
                resultCards.innerHTML = data;
                // После загрузки карточек собираем массивы карточек и кнопок
                collectCardsAndButtons();
            })
            .catch(error => console.error('Ошибка при выполнении запроса:', error));

            // Очищаем значения в скрытых инпутах
            searchInputs.forEach(function(input) {
                input.value = "";
            });
        }, 100);
    });
});