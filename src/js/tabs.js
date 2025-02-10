(() => {
    const tabs = document.querySelectorAll('.js-tabs');

    tabs.forEach((tabBlock) => {
        const buttons = tabBlock?.querySelectorAll('.js-tab-button');
        const prices = tabBlock?.querySelectorAll('.js-tab-price');

        buttons?.forEach((button) => {
            button.addEventListener('click', () => {
                resetButtons(buttons);
                button.classList.add('active');

                prices.forEach((price) => {
                    price.classList.add('hidden');

                    if (price.dataset.id === button.dataset.id) {
                        price.classList.remove('hidden');
                    }
                });
            });
        });
    });

    function resetButtons(elements) {
        elements.forEach((element) => {
            element.classList.remove('active');
        });
    }
})();
