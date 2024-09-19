const input_name = document.getElementById("user_name");
const input_phone = document.getElementById("user_phone");
const input_password = document.getElementById("user_password");

const btn_name = document.getElementById("submit_name");
const btn_phone = document.getElementById("submit_phone");
const btn_password = document.getElementById("submit_password");

const warning_msg = document.getElementById("warning_msg");

function validate_form(input, button, count, msg) {
    input.addEventListener("input", function() {
        if (this.value.length >= count) {
            button.disabled = false;
            button.classList.remove("disabled");
            button.innerHTML = `<img src="images/icons/done_icon.svg" alt="edit">`;

            warning_msg.classList.add("none");
        } else {
            button.disabled = true;
            button.classList.add("disabled");
            button.innerHTML = `<img src="images/icons/done_icon_disabled.svg" alt="edit">`;

            warning_msg.classList.remove("none");
            warning_msg.textContent = msg;
        }
    });
}

validate_form(input_name, btn_name, 1, 'Заполните минимум 1 символ');
validate_form(input_phone, btn_phone, 12, 'Заполните в должном формате');
validate_form(input_password, btn_password, 6, 'Заполните минимум 6 символов');