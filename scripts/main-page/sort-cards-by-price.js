// Получаем оболочку всех карточек
const cardsWrapper = document.querySelector(".cards");

function sortCardsByPrice(cards) {
    // Получаем все видимые карточки
    let visibleCards = [];
    cards.forEach(function(card) {
        if (card.classList.contains("visible")) {
            visibleCards.push(card);
        }
    });

    // Получаем цены из видимых карточек
    let prices = [];
    visibleCards.forEach(function(card) {
        let price = Number(card.getAttribute("data-price"));
        prices.push(price);
    });

    // Функция для вставки отсортированных карточек
    function insertSortedCards(sortedCards) {
        cards.forEach(function(card) {
            card.remove();
        });
        sortedCards.forEach(function(card) {
            cardsWrapper.appendChild(card);
        });
    }

    // Сортируем цены во возрастанию и убыванию
    switch (inputPriceSort.value) {
        // Выводим в стандартом порядке
        case "Все":
            insertSortedCards(visibleCards);
            break;
        // Выводим в порядке возрастания
        case "Подешевле":
            // Сортируем цены в порядке возрастания
            prices.sort(function(a, b) {
                return a - b;
            });
            // Сортируем карточки по ценам
            let sortedCardsCheap = prices.map(function(price) {
                return visibleCards.filter(function(card) {
                    return Number(card.getAttribute("data-price")) === price;
                });
            }).flat();
            // Вызываем функцию вставки отсортированных карточек
            insertSortedCards(sortedCardsCheap);
            break;
        // Выводим в порядке убывания
        case "Подороже":
            // Сортируем цены в порядке убывания
            prices.sort(function(a, b) {
                return b - a;
            });
            // Сортируем карточки по ценам
            let sortedCardsExpensive = prices.map(function(price) {
                return visibleCards.filter(function(card) {
                    return Number(card.getAttribute("data-price")) === price;
                });
            }).flat();
            // Вызываем функцию вставки отсортированных карточек
            insertSortedCards(sortedCardsExpensive);
            break;
    }
}