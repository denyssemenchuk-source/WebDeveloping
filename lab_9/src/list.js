import { openDetails } from './details.js';
import { toggle, watchlist } from './state.js';

/**
 * C2. Підключає кнопки карток у списку #results: «До списку» додає серіал до мого списку або
 * прибирає з нього, «Детальніше» відкриває діалог (openDetails з details.js). main.js викликає
 * цю функцію один раз, після першого показу списку. Специфікація — ТЗ, C2.
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initList(refresh) {
    const resultsEl = document.querySelector('#results');
    if (!resultsEl) return;

    resultsEl.addEventListener('click', (event) => {
        const target = /** @type {Element | null} */ (event.target);
        const button = target?.closest('button[data-action]');
        if (!button || !resultsEl.contains(button)) return;

        const card = button.closest('li[data-id]');
        if (!card) return;

        const id = Number(card.dataset.id);
        const action = button.getAttribute('data-action');

        if (action === 'toggle') {
            const oldCards = [...resultsEl.querySelectorAll('li[data-id]')];
            const removedIndex = oldCards.findIndex((li) => Number(li.dataset.id) === id);

            toggle(id);
            const countEl = document.querySelector('#watchlist-count');
            if (countEl) {
                countEl.textContent = String(watchlist.size);
            }

            refresh();

            const sameBtn = /** @type {HTMLElement | null} */ (
                resultsEl.querySelector(`li[data-id="${id}"] [data-action="toggle"]`)
            );
            if (sameBtn) {
                sameBtn.focus();
            } else {
                const remainingCards = [...resultsEl.querySelectorAll('li[data-id]')];
                if (remainingCards.length > 0) {
                    const nextCard =
                        remainingCards[removedIndex] ?? remainingCards[remainingCards.length - 1];
                    const nextBtn = /** @type {HTMLElement | null} */ (
                        nextCard.querySelector('[data-action="toggle"]')
                    );
                    nextBtn?.focus();
                } else {
                    const heading = /** @type {HTMLElement | null} */ (
                        document.querySelector('#results-heading')
                    );
                    if (heading) {
                        heading.tabIndex = -1;
                        heading.focus();
                    }
                }
            }
        } else if (action === 'details') {
            openDetails(id);
        }
    });
}