const searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", () => {
    const checkedCheckboxes = document.querySelectorAll(".type_checkbox:checked");

    const selectedTypes = Array.from(checkedCheckboxes).map(function(checkbox) {
        let bike_type = checkbox.closest(".bike_type");
        let bike_type_value = bike_type.getAttribute("data-type");
        return bike_type_value;
    });

    bycicles.forEach(function(card) {
        const bike_card_type = card.getAttribute("data-card-type");
        if (selectedTypes.includes(bike_card_type)) {
            card.classList.remove("none");
            card.classList.add("visible");
        } else {
            card.classList.remove("visible");
            card.classList.add("none");
        }
    });
    
    // checkedCheckboxes.forEach(function(checkbox) {
    //     let bike_type = checkbox.closest(".bike_type");
    //     let bike_type_value = bike_type.getAttribute("data-type");

    //     bycicles.forEach(function(card) {
    //         const bike_card_type = card.getAttribute("data-card-type");
    //         if (bike_type_value.includes(bike_card_type)) {
    //             card.classList.remove("none");
    //             card.classList.add("visible");
    //         } else {
    //             card.classList.remove("visible");
    //             card.classList.add("none");
    //         }
    //     });
    // });
});