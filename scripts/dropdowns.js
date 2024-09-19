// Собираем все dropdown'ы
const dropdowns = document.querySelectorAll('.dropdown');

// Пробегаемся по всем dropdown'ам
dropdowns.forEach(function(dropdown, drop_index, array) {
    // Слушаем клик на dropdown
    dropdown.addEventListener('click', function() {
        // Увсех элементов кроме текущего удаляем active
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
    let params = dropdown.querySelectorAll('.option__param');
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