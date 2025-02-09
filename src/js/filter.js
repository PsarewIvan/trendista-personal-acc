(() => {
    const filtersButton = document.querySelector('.js-filters-button');
    const filters = document.querySelector('.js-filters');

    toggleHiddenClass();

    window.addEventListener('resize', toggleHiddenClass);

    filtersButton?.addEventListener('click', () => {
        filters.classList.toggle('hidden');
    });

    function toggleHiddenClass() {
        if (!filters) return;

        if (window.innerWidth < 768) {
            filters.classList.add('hidden');
        } else {
            filters.classList.remove('hidden');
        }
    }
})();
