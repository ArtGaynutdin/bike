time_start = timeToMinutes(start_datetime);
time_end = timeToMinutes(end_datetime);
const time_factor = timeDifference(time_start, time_end, 2);

const start_address_field = document.querySelector('.form-item.start-address');
const end_address_field = document.querySelector('.form-item.return-address');

// console.log(orderType_Input.value);

switch(orderType_Input.value) {
    case 'По часам':
        if (time_factor < 2) {
            switch (type_of_delivery) {
                case 'В пункт выдачи':
                    // Создаем первый dropdown
                    let dropdown1 = document.createElement('div');
                    dropdown1.classList.add('dropdown');

                    // Создаем input для первого dropdown
                    let input1 = document.createElement('input');
                    input1.setAttribute('type', 'text');
                    input1.classList.add('reg-input', 'input-params');
                    input1.setAttribute('id', 'user-address');
                    input1.setAttribute('name', 'user-address');
                    input1.setAttribute('placeholder', 'Выберите пункт');
                    input1.setAttribute('readonly', '');

                    // Создаем ul для параметров первого dropdown
                    let ul1 = document.createElement('ul');
                    ul1.classList.add('option');

                    // Массив с параметрами для первого dropdown
                    let options1 = ['Ботанический сад', 'Монумент мужества',
                                    'Бродвей (Сквер)', 'ЦУМ (Аллея)', 'Дружба народов',
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
            input2.setAttribute('name', 'user-return');
            input2.setAttribute('placeholder', 'Выберите пункт');
            input2.setAttribute('readonly', '');

            let ul2 = document.createElement('ul');
            ul2.classList.add('option');

            let options2 = ['Ботанический сад', 'Монумент мужества',
                            'Бродвей (Сквер)', 'ЦУМ (Аллея)', 'Дружба народов',
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
            switch (type_of_delivery) {
                case 'В пункт выдачи':
                    // Создаем первый dropdown
                    let dropdown1 = document.createElement('div');
                    dropdown1.classList.add('dropdown');

                    // Создаем input для первого dropdown
                    let input1 = document.createElement('input');
                    input1.setAttribute('type', 'text');
                    input1.classList.add('reg-input', 'input-params');
                    input1.setAttribute('id', 'user-address');
                    input1.setAttribute('name', 'user-address');
                    input1.setAttribute('placeholder', 'Выберите пункт');
                    input1.setAttribute('readonly', '');

                    // Создаем ul для параметров первого dropdown
                    let ul1 = document.createElement('ul');
                    ul1.classList.add('option');

                    // Массив с параметрами для первого dropdown
                    let options1 = ['Ботанический сад', 'Монумент мужества',
                                    'Бродвей (Сквер)', 'ЦУМ (Аллея)', 'Дружба народов',
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
        switch (type_of_delivery) {
            case 'В пункт выдачи':
                // Создаем первый dropdown
                let dropdown1 = document.createElement('div');
                dropdown1.classList.add('dropdown');

                // Создаем input для первого dropdown
                let input1 = document.createElement('input');
                input1.setAttribute('type', 'text');
                input1.classList.add('reg-input', 'input-params');
                input1.setAttribute('id', 'user-address');
                input1.setAttribute('name', 'user-address');
                input1.setAttribute('placeholder', 'Выберите пункт');
                input1.setAttribute('readonly', '');

                // Создаем ul для параметров первого dropdown
                let ul1 = document.createElement('ul');
                ul1.classList.add('option');

                // Массив с параметрами для первого dropdown
                let options1 = ['Ботанический сад', 'Монумент мужества',
                                'Бродвей (Сквер)', 'ЦУМ (Аллея)', 'Дружба народов',
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