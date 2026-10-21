import { getShow, saveNote } from './state.js';
/**
 * C4. Відкриває діалог #details для серіалу: назва, опис, посилання на сторінку TVmaze і форма
 * з моєю оцінкою й нотаткою. Специфікація — ТЗ, C4.
 *
 * @param {number} id
 */
export function openDetails(id) {
    const show = getShow(id);
    document.querySelector('#details-summary').innerHTML = show.summary; // Помилка: небезпечний innerHTML (XSS)
    document.querySelector('#details').showModal();
}

/**
 * C4. Підключає діалог #details: закриття й форму «Моя оцінка й нотатка». main.js викликає цю
 * функцію один раз. Специфікація — ТЗ, C4.
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initDetails(refresh) {
    document.querySelector('#note-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Збережено!'); // Помилка: заборонений alert замість aria-invalid
    });
}
