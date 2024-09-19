// Функция для загрузки данных и вывода результатов
function loadOrders() {
    // Получаем данные из формы
    var formData = new FormData(document.querySelector('.filters_wrapper'));

    // Отправляем запрос на сервер
    fetch('/filter_orders', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Выводим результаты в элемент с id "orders_wrapper"
        document.getElementById('orders_wrapper').innerHTML = data;
        // Механика dropdowns
        dropdown_mechanics();
        // После загрузки заказов, собираем их все
        open_close_details();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Вызываем функцию загрузки данных при загрузке страницы
window.onload = function() {
    loadOrders();
};
// Вызываем функцию загрузки данных при нажатии на кнопку "Найти"
const result_form = document.getElementById('result_form');
result_form.addEventListener('submit', function(event) {
    event.preventDefault();
    loadOrders();
});
// Вызываем функцию загрузки данных при нажатии на кнопку "Сбросить"
const reset_btn = document.getElementById('reset_btn');
reset_btn.addEventListener('click', function() {
    // Для того чтобы инпуты обнулились
    setTimeout(() => {
        loadOrders();
    }, 100);
});


/* ------------------ Вспомогательные функции ------------------ */
function open_close_details() {
    // Все открывающиеся поля
    const details = document.querySelectorAll(".details");
    // Все кнопки для открытия
    const details_buttons = document.querySelectorAll(".show_hide_details_btn");

    // Слушаем нажатие на каждую кнопку
    details_buttons.forEach(function(button, index, array) {
        button.addEventListener("click", function() {
            console.log('click on details_button!');

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


    // Убираем disabled для кнопок подтверждения
    const change_inputs = document.querySelectorAll('.change_input');

    change_inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            let form = input.closest('.change_status_form');
            let button = form.querySelector('.submit_change_btn');

            button.disabled = false;
            button.classList.remove('disabled');
        });
    });
}

function dropdown_mechanics() {
    // Собираем все dropdown'ы
    const dropdowns = Array.from(document.querySelectorAll('.dropdown.in_order'));
    console.log(dropdowns.length);

    // Пробегаемся по всем dropdown'ам
    dropdowns.forEach(function(dropdown, drop_index, array) {
        // Слушаем клик на dropdown
        dropdown.addEventListener('click', function() {
            console.log('click on dropdown!');

            // У всех элементов кроме текущего удаляем active
            array.forEach(function(element, index) {
                if (index !== drop_index) {
                    element.classList.remove('active');
                }

                // Получаем z-index псевдо-элемента ::before
                let style = window.getComputedStyle(element, '::before');
                let zIndex = parseInt(style.getPropertyValue('z-index'));

                // Изменяем z-index для псевдо-элемента ::before
                zIndex = "4";
                element.style.setProperty('--before-z-index', zIndex);

                // Изменяем z-index для инпута и поля выбора
                element.querySelector('.input-params').style.zIndex = "3";
                element.querySelector('.option').style.zIndex = "2";
            });

            // Получаем z-index псевдо-элемента ::before
            let style = window.getComputedStyle(this, '::before');
            let zIndex = parseInt(style.getPropertyValue('z-index'));

            // Изменяем z-index для псевдо-элемента ::before
            zIndex = "8";
            this.style.setProperty('--before-z-index', zIndex);
            // Изменяем z-index для инпута и поля выбора
            this.querySelector('.input-params').style.zIndex = "7";
            this.querySelector('.option').style.zIndex = "6";

            // Скрываем или показываем выподающее меню
            if (this.classList.contains('active')) {
                // console.log(this.classList.contains("active"));
                this.classList.remove('active');
            } else {
                // console.log(this.classList.contains("active"));
                this.classList.add('active');
            }
        });

        // Находим все параметры
        let params = Array.from(dropdown.querySelectorAll('.option__param'));
        // console.log(params.length);
        // Вносим значение параметра в инпут
        params.forEach(function(param) {
            // Обработка клика на параметр
            param.addEventListener('click', () => {
                // Находим инпут
                inputParams = dropdown.querySelector('.input-params');
                // Вносим значение в инпут
                inputParams.value = param.textContent;
                // Создаем и вызываем событие input
                let event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });
                inputParams.dispatchEvent(event);
            });
        });
    });

    document.addEventListener('click', function(event) {
        // Проверяем, был ли клик выполнен вне элементов dropdown
        if (!event.target.closest('.dropdown')) {
            dropdowns.forEach(function(element) {
                element.classList.remove('active');
            });
        }
    });
}