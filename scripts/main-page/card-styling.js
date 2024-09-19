/* ------------- Cheked у кнопок + daisbled у кнопки "Найти" ------------- */
const plusButtons = document.querySelectorAll(".plus");
const checkboxes = document.querySelectorAll(".type_checkbox");

// Кнопка "Найти"
const searchButtonStyle = document.getElementById("search-btn");

// Плавный скролл к результатам поиска
searchButtonStyle.addEventListener("click", () => {
    let main_container = document.getElementById("main");
    main_container.scrollIntoView({ behavior: "smooth" });
});

// Функция для проверки, отмечен ли хотя бы один чекбокс
function isAnyCheckboxChecked() {
    return Array.from(checkboxes).some(checkbox => checkbox.checked);
}
  
// Функция для обновления класса disabled у кнопки searchButton
function updateSearchButtonState() {
    if (isAnyCheckboxChecked()) {
        searchButtonStyle.disabled = false;
        searchButtonStyle.classList.remove("disabled");
    } else {
        searchButtonStyle.disabled = true;
        searchButtonStyle.classList.add("disabled");
    }
}

// Добавляем прослушку для чекбоксов
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", () => {
      updateSearchButtonState();
    });
});

plusButtons.forEach(function(button, index) {
    button.addEventListener("click", () => {
        // Стили
        button.classList.toggle("cheked");
        if (button.classList.contains("cheked")) {
            button.textContent = "✓";
        } else {
            button.textContent = "+";
        }
        // Логика
        switch(checkboxes[index].checked) {
            case false:
                checkboxes[index].checked = true;
                break;
            case true:
                checkboxes[index].checked = false;
                break;
        }
        updateSearchButtonState();
    });
});


/* -------------- Tooltip'ы - всплявашки для типов -------------- */
// Получаем все кнопки
const questionButtons = document.querySelectorAll(".question");
// Получаем все всплывашки
const tooltips = document.querySelectorAll(".tooltip");

// Обработка нажатия на кнопку
questionButtons.forEach(function(button, index) {
    button.addEventListener("click", () => {
        // Показываем соответствующую всплывашку
        tooltips[index].classList.toggle("none");
    });
});


/* -------------- Текст в Offer'ах о ширины экрана -------------- */
const offerTexts = document.querySelectorAll(".offer-text");

// Функция, которая будет вызываться при изменении размера экрана
function handleResize() {
    // Получаем новую ширину экрана
    const newScreenWidth = window.innerWidth;
    
    offerTexts.forEach(function(offer, index) {
        if (newScreenWidth < 576) {
            offer.innerHTML = "FREE";
        }
        else if (newScreenWidth < 768) {
            offer.innerHTML = "Бесплатно";
        }
        else {
            switch (index) {
                case 0:
                    offer.innerHTML = "Шлем<br><span>Бесплатно</span>";
                    break;
                case 1:
                    offer.innerHTML = "Фонарик<br><span>Бесплатно</span>";
                    break;
                case 2:
                    offer.innerHTML = "Замок<br><span>Бесплатно</span>";
                    break;
            }
        }
    });
}
handleResize();

// Добавляем обработчик события resize
window.addEventListener("resize", handleResize);