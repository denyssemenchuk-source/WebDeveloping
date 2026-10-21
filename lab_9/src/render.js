/** @typedef {import('./state.js').Show} Show */
import { shows, watchlist, notes } from './state.js';
/**
 * C1. Показує серіали в списку #results — по картці з шаблону #show-card на кожен, у тому
 * самому порядку, — і оновлює рядок статусу #status. Специфікація — ТЗ, C1.
 *
 * @param {readonly Show[]} list серіали, які треба показати
 */
export function renderShows(list) {
    const resultsEl = document.querySelector('#results');
    const template = document.querySelector('#show-card');
    if (!resultsEl || !template) return;
    const cards = list.map((show) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('[data-field="name"]').textContent = show.name; // Заповнює лише першу назву!
        clone.querySelector('[data-field="rating"]').textContent = String(show.rating); // Дасть null для Utopia!
        return clone;
    });
    resultsEl.replaceChildren(...cards);
}