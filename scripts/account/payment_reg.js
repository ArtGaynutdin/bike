const payment_forms = document.querySelectorAll('.payment_form');

payment_forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
        // Отменяем стандартное действие отправки формы
        event.preventDefault();
    
        // Создаем объект FormData для сбора данных из формы
        const formData = new FormData(form);
    
        // Отправляем данные формы на сервер при помощи fetch
        fetch('/payment-reg', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Возвращаем ответ сервера
            return response.text();
        })
        .then(data => {
            // Обрабатываем ответ сервера
            console.log('Response from server:', data);
            // Здесь можно добавить дополнительные действия, если нужно
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});