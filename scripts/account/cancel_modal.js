// Кнопки в заказах
const order_buttons = document.querySelectorAll('.order_button.to_cancel');
// Слушаем клик на кнопку в заказе
order_buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Получаем конкретную модалку
        let order_card = this.closest('.order');
        let modal_field = order_card.querySelector('.cancel_modal');
        // Показываем модалку
        modal_field.classList.remove('none');
    });
});

// Все кнопки закрытия модалок
const close_modal_buttons = document.querySelectorAll('.modal_btn.no');
// При нажатии на кнопку скрываем конкретную модалку
close_modal_buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        let modal_field = this.closest('.cancel_modal');
        modal_field.classList.add('none');
    });
});

// Все кнопки действия в модалках
const action_modal_buttons = document.querySelectorAll('.modal_btn.yes');
action_modal_buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Находим форму
        let order_card = this.closest('.order');
        let cancel_form = order_card.querySelector('.cancel_form');
        // Отправляем форму
        cancel_form.submit();
    });
});