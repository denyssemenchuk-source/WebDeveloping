import { notes, shows, watchlist } from './state.js';

/** @typedef {import('./state.js').Show} Show */

/**
 * C1. Показує серіали в списку #results — по картці з шаблону #show-card на кожен, у тому
 * самому порядку, — і оновлює рядок статусу #status. Специфікація — ТЗ, C1.
 *
 * @param {readonly Show[]} list серіали, які треба показати
 */
export function renderShows(list) {
    const resultsEl = document.querySelector('#results');
    const statusEl = document.querySelector('#status');
    const countEl = document.querySelector('#watchlist-count');
    const template = /** @type {HTMLTemplateElement | null} */ (
        document.querySelector('#show-card')
    );

    if (countEl) {
        countEl.textContent = String(watchlist.size);
    }

    if (!resultsEl || !template) return;

    const cards = list.map((show) => {
        const fragment = /** @type {DocumentFragment} */ (template.content.cloneNode(true));
        const card = /** @type {HTMLElement} */ (fragment.firstElementChild);

        card.dataset.id = String(show.id);

        for (const nameEl of card.querySelectorAll('[data-field="name"]')) {
            nameEl.textContent = show.name;
        }

        const yearEl = card.querySelector('[data-field="year"]');
        if (yearEl) {
            yearEl.textContent = show.year !== null && show.year !== undefined ? String(show.year) : '—';
        }

        const genresEl = card.querySelector('[data-field="genres"]');
        if (genresEl) {
            genresEl.textContent =
                Array.isArray(show.genres) && show.genres.length > 0 ? show.genres.join(', ') : '—';
        }

        const ratingEl = card.querySelector('[data-field="rating"]');
        if (ratingEl) {
            ratingEl.textContent =
                show.rating !== null && show.rating !== undefined ? String(show.rating) : '—';
        }

        const toggleBtn = card.querySelector('[data-action="toggle"]');
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-pressed', String(watchlist.has(show.id)));
        }

        const userNote = notes.get(show.id);
        const mineBlock = /** @type {HTMLElement | null} */ (card.querySelector('.card__mine'));
        const myRatingEl = card.querySelector('[data-field="my-rating"]');
        const noteEl = /** @type {HTMLElement | null} */ (card.querySelector('[data-field="note"]'));

        if (userNote && mineBlock && myRatingEl && noteEl) {
            myRatingEl.textContent = String(userNote.rating);
            mineBlock.hidden = false;
            if (userNote.text) {
                noteEl.textContent = userNote.text;
                noteEl.hidden = false;
            } else {
                noteEl.textContent = '';
                noteEl.hidden = true;
            }
        } else {
            if (mineBlock) mineBlock.hidden = true;
            if (noteEl) {
                noteEl.textContent = '';
                noteEl.hidden = true;
            }
        }

        return card;
    });

    resultsEl.replaceChildren(...cards);

    if (statusEl) {
        statusEl.textContent =
            list.length > 0 ? `Знайдено: ${list.length} з ${shows.length}` : 'Нічого не знайдено';
    }
}