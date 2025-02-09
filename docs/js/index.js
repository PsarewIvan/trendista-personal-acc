class ItcAccordion {
    constructor(target, config) {
        this._el =
            typeof target === 'string'
                ? document.querySelector(target)
                : target;
        const defaultConfig = {
            alwaysOpen: true,
            duration: 350,
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener();
    }

    addEventListener() {
        this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.js-accordion-header');

            if (!elHeader) {
                return;
            }
            if (!this._config.alwaysOpen) {
                const elOpenItem = this._el.querySelector(
                    '.accordion__item_show'
                );
                if (elOpenItem) {
                    elOpenItem !== elHeader.parentElement
                        ? this.toggle(elOpenItem)
                        : null;
                }
            }
            this.toggle(elHeader.parentElement);
        });
    }

    show(el) {
        const elBody = el.querySelector('.accordion__body');
        if (
            elBody.classList.contains('collapsing') ||
            el.classList.contains('accordion__item_show')
        ) {
            return;
        }
        elBody.style['display'] = 'block';
        const height = elBody.offsetHeight;
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.add('collapsing');
        el.classList.add('accordion__item_slidedown');
        elBody.offsetHeight;
        elBody.style['height'] = `${height}px`;
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }

    hide(el) {
        const elBody = el.querySelector('.accordion__body');
        if (
            elBody.classList.contains('collapsing') ||
            !el.classList.contains('accordion__item_show')
        ) {
            return;
        }
        elBody.style['height'] = `${elBody.offsetHeight}px`;
        elBody.offsetHeight;
        elBody.style['display'] = 'block';
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.remove('collapse');
        el.classList.remove('accordion__item_show');
        elBody.classList.add('collapsing');
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }

    toggle(el) {
        el.classList.contains('accordion__item_show')
            ? this.hide(el)
            : this.show(el);
    }
}

(() => {
    const accordions = document.querySelectorAll('.js-accordion');

    accordions.forEach((accordion) => {
        new ItcAccordion(accordion, {
            alwaysOpen: true,
        });
    });
})();

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

(() => {
    const selectsWrapper = document.querySelectorAll(
        '.js-select-component-wrapper'
    );

    selectsWrapper.forEach((selectWrapper) => {
        const select = selectWrapper.querySelector('.js-select-component');
        const placeholder = select?.dataset.placeholder;
        const options = select?.querySelectorAll('option');
        const reset = selectWrapper?.querySelector('.js-select-reset');

        const dataOptions = Array.from(options).map((option) => ({
            text: option.innerHTML,
            value: option.value,
        }));

        const slimSelect = new SlimSelect({
            select,
            settings: {
                showSearch: false,
            },
            data: [
                ...(placeholder
                    ? [{ placeholder: true, text: placeholder }]
                    : []),
                ...dataOptions,
            ],
            events: {
                afterChange: (evt) => {
                    const value = evt?.[0]?.value;

                    if (value) {
                        reset?.classList.remove('hidden');
                    }
                },
            },
        });

        reset?.addEventListener('click', () => {
            if (slimSelect) {
                slimSelect.setSelected('', false);
                reset.classList.add('hidden');
            }
        });

        const selectDiv = selectWrapper.querySelector(
            `div[data-id="${slimSelect?.settings?.id}"]`
        );
        const arrow = selectWrapper.querySelector('.ss-arrow');

        select?.addEventListener('change', (event) => {
            if (dataOptions.some(({ value }) => value === event.target.value)) {
                selectDiv.classList.add('select-component_selected');
                // arrow?.classList.add('transparent');
            } else {
                selectDiv.classList.remove('select-component_selected');
                // arrow?.classList.remove('transparent');
            }
        });
    });
})();

(() => {
    const maxLength = 1500;
    const nodes = document.querySelectorAll('.js-text-area-node');

    nodes.forEach((node) => {
        const textarea = node.querySelector('.js-text-area');
        const counter = node.querySelector('.js-text-area-counter');

        textarea?.addEventListener('input', updateCharacterCount);

        updateCharacterCount();

        function updateCharacterCount() {
            if (textarea && counter) {
                const currentLength = textarea.value.length;
                counter.textContent = currentLength.toString();
            }
        }
    });
})();

(() => {
    const ACTIVE_CLASS = 'active';

    const nodes = document.querySelectorAll('.js-text-input-node');

    nodes.forEach((node) => {
        const input = node.querySelector('.js-text-input');
        const reset = node.querySelector('.js-text-input-reset');
        const alert = node.querySelector('.js-text-input-alert');

        if (input.value !== '') {
            reset?.classList.add(ACTIVE_CLASS);
        }

        input?.addEventListener('blur', (event) => {
            if (event.target.value === '') {
                alert?.classList.add(ACTIVE_CLASS);
            } else {
                alert?.classList.remove(ACTIVE_CLASS);
            }
        });

        input?.addEventListener('input', (event) => {
            if (event.target.value === '') {
                reset?.classList.remove(ACTIVE_CLASS);
            } else {
                reset?.classList.add(ACTIVE_CLASS);
                alert?.classList.remove(ACTIVE_CLASS);
            }
        });

        reset?.addEventListener('click', () => {
            if (input) {
                input.value = '';
                reset?.classList.remove(ACTIVE_CLASS);
            }
        });
    });
})();

//# sourceMappingURL=index.js.map
