// localStorage.setItem('type_of_price', 'По часам');
// localStorage.setItem('type_of_delivery', 'В пункт выдачи');

// localStorage.setItem('time_start', '04.04.2024 14:00');
// localStorage.setItem('time_end', '04.04.2024 15:00');

// localStorage.clear();

// Функция перевода часов в минуты
function timeToMinutes(datetime) {
    // Получаем значение времени
    let [date, time] = datetime.split(" ").map(String);
    // Получаем отдельно часы и минуты
    let [hours, minutes] = time.split(":").map(Number);
    // Считаем общее количество в минутах
    let timeInMinutes = hours * 60 + minutes;
    // Возвращаем
    return timeInMinutes;
}

// Функция для рассчета времени аренды
function timeDifference(startTime, endTime) {
    // Получаем разници между временами в минутах
    let differenceInMinutes = endTime - startTime;

    // Получаем часы и минуты отдельно
    let hours = Math.floor(differenceInMinutes / 60);
    let minutes = differenceInMinutes % 60;

    // Переводим значение часов в десятичный вид
    let timeFactor;
    switch(minutes) {
        case 0:
            timeFactor = hours;
            break;
        case 15:
            timeFactor = hours + 0.25;
            break;
        case 30:
            timeFactor = hours + 0.5;
            break;
        case 45:
            timeFactor = hours + 0.75;
            break;
    }
    // Возвращаем коэффициент времени
    return timeFactor;
}

const typeOfOrder = localStorage.getItem("type_of_price");
const typeOfDelivery = localStorage.getItem("type_of_delivery");
console.log(typeOfDelivery);
let time_start = localStorage.getItem("time_start");
time_start = timeToMinutes(time_start);
let time_end = localStorage.getItem("time_end");
time_end = timeToMinutes(time_end);
const timeFactor = timeDifference(time_start, time_end);
console.log(timeFactor);

const start_address_field = document.querySelector('.form-item.start-address');
const end_address_field = document.querySelector('.form-item.return-address');


switch(typeOfOrder) {
    case 'По часам':
        if (timeFactor < 2) {
            console.log('Меньше');
            switch (typeOfDelivery) {
                case 'В пункт выдачи':
                    // Создаем первый dropdown
                    let dropdown1 = document.createElement('div');
                    dropdown1.classList.add('dropdown');

                    // Создаем input для первого dropdown
                    let input1 = document.createElement('input');
                    input1.setAttribute('type', 'text');
                    input1.classList.add('reg-input', 'input-params');
                    input1.setAttribute('id', 'user-address');
                    input1.setAttribute('placeholder', 'Выберите пункт');
                    input1.setAttribute('readonly', '');

                    // Создаем ul для параметров первого dropdown
                    let ul1 = document.createElement('ul');
                    ul1.classList.add('option');

                    // Массив с параметрами для первого dropdown
                    let options1 = ['Ботанический сад', 'Монумент мужества',
                                    'Мустакиллик', 'ЦУМ', 'Дружба народов',
                                    'Парк Сергели', 'Парк Дустлик'];

                    // Создаем и добавляем li для каждого параметра первого dropdown
                    options1.forEach(function(option) {
                        let li = document.createElement('li');
                        li.classList.add('option__param');
                        li.textContent = option;
                        ul1.appendChild(li);
                    });

                    // Добавляем созданные элементы в первый dropdown
                    dropdown1.appendChild(input1);
                    dropdown1.appendChild(ul1);

                    // Добавляем первый dropdown в DOM
                    start_address_field.appendChild(dropdown1);
                    break;
                
                case 'По адресу':
                    // Создаем первый input для адреса
                    let addressStart = document.createElement('input');
                    addressStart.setAttribute('type', 'text');
                    addressStart.classList.add('reg-input');
                    addressStart.setAttribute('id', 'user-address');
                    addressStart.setAttribute('name', 'user-address');
                    addressStart.setAttribute('placeholder', 'Адрес *');
                    // Добавляем первый input для адреса в DOM
                    start_address_field.appendChild(addressStart);
                    break;
            }

            // Создаем второй dropdown (аналогично первому)
            let dropdown2 = document.createElement('div');
            dropdown2.classList.add('dropdown');

            let input2 = document.createElement('input');
            input2.setAttribute('type', 'text');
            input2.classList.add('reg-input', 'input-params');
            input2.setAttribute('id', 'user-return');
            input2.setAttribute('placeholder', 'Выберите пункт');
            input2.setAttribute('readonly', '');

            let ul2 = document.createElement('ul');
            ul2.classList.add('option');

            let options2 = ['Ботанический сад', 'Монумент мужества',
                            'Мустакиллик', 'ЦУМ', 'Дружба народов',
                            'Парк Сергели', 'Парк Дустлик'];

            options2.forEach(function(option) {
                let li = document.createElement('li');
                li.classList.add('option__param');
                li.textContent = option;
                ul2.appendChild(li);
            });

            dropdown2.appendChild(input2);
            dropdown2.appendChild(ul2);

            // Добавляем второй dropdown в DOM
            end_address_field.appendChild(dropdown2);
        } else {
            console.log('Больше');
            switch (typeOfDelivery) {
                case 'В пункт выдачи':
                    // Создаем первый dropdown
                    let dropdown1 = document.createElement('div');
                    dropdown1.classList.add('dropdown');

                    // Создаем input для первого dropdown
                    let input1 = document.createElement('input');
                    input1.setAttribute('type', 'text');
                    input1.classList.add('reg-input', 'input-params');
                    input1.setAttribute('id', 'user-address');
                    input1.setAttribute('placeholder', 'Выберите пункт');
                    input1.setAttribute('readonly', '');

                    // Создаем ul для параметров первого dropdown
                    let ul1 = document.createElement('ul');
                    ul1.classList.add('option');

                    // Массив с параметрами для первого dropdown
                    let options1 = ['Ботанический сад', 'Монумент мужества',
                                    'Мустакиллик', 'ЦУМ', 'Дружба народов',
                                    'Парк Сергели', 'Парк Дустлик'];

                    // Создаем и добавляем li для каждого параметра первого dropdown
                    options1.forEach(function(option) {
                        let li = document.createElement('li');
                        li.classList.add('option__param');
                        li.textContent = option;
                        ul1.appendChild(li);
                    });

                    // Добавляем созданные элементы в первый dropdown
                    dropdown1.appendChild(input1);
                    dropdown1.appendChild(ul1);

                    // Добавляем первый dropdown в DOM
                    start_address_field.appendChild(dropdown1);
                    break;
                
                case 'По адресу':
                    // Создаем первый input для адреса
                    let addressStart = document.createElement('input');
                    addressStart.setAttribute('type', 'text');
                    addressStart.classList.add('reg-input');
                    addressStart.setAttribute('id', 'user-address');
                    addressStart.setAttribute('name', 'user-address');
                    addressStart.setAttribute('placeholder', 'Адрес *');
                    // Добавляем первый input для адреса в DOM
                    start_address_field.appendChild(addressStart);
                    break;
            }

            // Создаем input для адреса
            let addressInput = document.createElement('input');
            addressInput.setAttribute('type', 'text');
            addressInput.classList.add('reg-input');
            addressInput.setAttribute('id', 'user-return');
            addressInput.setAttribute('name', 'user-return');
            addressInput.setAttribute('placeholder', 'Адрес *');
            // Добавляем input для адреса в DOM
            end_address_field.appendChild(addressInput);
        }
        break;

    case 'По дням':
        switch (typeOfDelivery) {
            case 'В пункт выдачи':
                // Создаем первый dropdown
                let dropdown1 = document.createElement('div');
                dropdown1.classList.add('dropdown');

                // Создаем input для первого dropdown
                let input1 = document.createElement('input');
                input1.setAttribute('type', 'text');
                input1.classList.add('reg-input', 'input-params');
                input1.setAttribute('id', 'user-address');
                input1.setAttribute('placeholder', 'Выберите пункт');
                input1.setAttribute('readonly', '');

                // Создаем ul для параметров первого dropdown
                let ul1 = document.createElement('ul');
                ul1.classList.add('option');

                // Массив с параметрами для первого dropdown
                let options1 = ['Ботанический сад', 'Монумент мужества',
                                'Мустакиллик', 'ЦУМ', 'Дружба народов',
                                'Парк Сергели', 'Парк Дустлик'];

                // Создаем и добавляем li для каждого параметра первого dropdown
                options1.forEach(function(option) {
                    let li = document.createElement('li');
                    li.classList.add('option__param');
                    li.textContent = option;
                    ul1.appendChild(li);
                });

                // Добавляем созданные элементы в первый dropdown
                dropdown1.appendChild(input1);
                dropdown1.appendChild(ul1);

                // Добавляем первый dropdown в DOM
                start_address_field.appendChild(dropdown1);
                break;
            
            case 'По адресу':
                // Создаем первый input для адреса
                let addressStart = document.createElement('input');
                addressStart.setAttribute('type', 'text');
                addressStart.classList.add('reg-input');
                addressStart.setAttribute('id', 'user-address');
                addressStart.setAttribute('name', 'user-address');
                addressStart.setAttribute('placeholder', 'Адрес *');
                // Добавляем первый input для адреса в DOM
                start_address_field.appendChild(addressStart);
                break;
        }

        // Создаем второй input для адреса
        let addressEnd = document.createElement('input');
        addressEnd.setAttribute('type', 'text');
        addressEnd.classList.add('reg-input');
        addressEnd.setAttribute('id', 'user-return');
        addressEnd.setAttribute('name', 'user-return');
        addressEnd.setAttribute('placeholder', 'Адрес *');
        // Добавляем второй input для адреса в DOM
        end_address_field.appendChild(addressEnd);

        break;
}