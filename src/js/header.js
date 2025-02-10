(() => {
    let lastScrollTop = 0;
    let isEnabled = window.innerWidth < 1200;
    const header = document.querySelector('.js-header');
    const scrollThreshold = 72;

    function handleScroll() {
        if (!isEnabled) return;

        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            header?.classList.add('header-hide');
        } else {
            header?.classList.remove('header-hide');
        }

        lastScrollTop = scrollTop;
    }

    function checkScreenSize() {
        isEnabled = window.innerWidth < 1200;
        if (!isEnabled) {
            header?.classList.remove('header-hide');
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScreenSize);
})();
