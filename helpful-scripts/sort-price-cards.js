function sortCardsByPrice() {
    // Получаем все видимые карточки
    let visibleCards = [];
    bycicles.forEach(function(card) {
        if (card.classList.contains("visible")) {
            visibleCards.push(card);
        }
    });
    // console.log(visibleCards.length);

    // Получаем цены из видимых карточек
    let prices = [];
        visibleCards.forEach(function(card) {
        price = Number(card.getAttribute("data-price"));
        prices.push(price);
    });

    // Функция для вставки отсортированных карточек
    function insertSortedCards(sortedCards) {
        bycicles.forEach(function(card) {
            card.remove();
        });
        sortedCards.forEach(function(card) {
            cardsWrapper.appendChild(card);
        });
    }

    // Сортируем цены во возрастанию и убыванию
    switch (inputPriceSort.value) {
    case "Все":
        insertSortedCards(visibleCards);
        break;
    case "Подешевле":
        prices.sort(function(a, b) {
        return a - b;
        });
        let sortedCardsCheap = prices.map(function(price) {
        return visibleCards.filter(function(card) {
            return Number(card.getAttribute("data-price")) === price;
        });
        }).flat();
        insertSortedCards(sortedCardsCheap);
        break;
    case "Подороже":
        prices.sort(function(a, b) {
        return b - a;
        });
        let sortedCardsExpensive = prices.map(function(price) {
        return visibleCards.filter(function(card) {
            return Number(card.getAttribute("data-price")) === price;
        });
        }).flat();
        insertSortedCards(sortedCardsExpensive);
        break;
    }
}