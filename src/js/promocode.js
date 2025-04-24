(function () {
    const promocodeBlocks = document.querySelectorAll('.js-promocode');

    promocodeBlocks.forEach((promo) => {
        const button = promo.querySelector('.js-promocode-link');
        const block = promo.querySelector('.js-promocode-block');
        const close = promo.querySelector('.js-promocode-close');
        const input = promo.querySelector('.js-promocode-input');

        console.log(input);

        button?.addEventListener('click', () => {
            button?.classList.add('hidden');
            block.classList.remove('hidden');
            input?.focus();
        });

        close?.addEventListener('click', () => {
            button?.classList.remove('hidden');
            block.classList.add('hidden');
        });
    });
})();
