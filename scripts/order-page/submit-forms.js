const registrationForm = document.getElementById("reg-form");
const detailForms = document.querySelectorAll(".table-item-form");

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(registrationForm);

    fetch('/order-reg', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Выводим ответ сервера в консоль
        // После успешной отправки формы reg-form отправляем каждую форму table-item-form
        detailForms.forEach(function(subform) {
            const formData = new FormData(subform);
            fetch('/order-detail', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                console.log(data); // Выводим ответ сервера в консоль
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        });

        window.location.href = "/complite-order";
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});