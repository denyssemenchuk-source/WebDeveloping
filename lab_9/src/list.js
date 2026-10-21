/**
 * C2. Підключає кнопки карток у списку #results: «До списку» додає серіал до мого списку або
 * прибирає з нього, «Детальніше» відкриває діалог (openDetails з details.js). main.js викликає
 * цю функцію один раз, після першого показу списку. Специфікація — ТЗ, C2.
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
import { toggle } from './state.js';
export function initList(refresh) {
    document.querySelector('#results').addEventListener('click', (e) => {
        if (e.target.dataset.action === 'toggle') { // Помилка: клік по іконцісейдсейд SVG не спрацює
            toggle(Number(e.target.closest('li').dataset.id));
            refresh(); // Помилка: список перемалювався, а фокус зник
        }
    });
}
