/** @typedef {import('./state.js').Filters} Filters */

/**
 * C3. Повертає поточні значення форми фільтрів #filters.
 *
 * @returns {Filters}
 */
export function readFilters() {
  const form = /** @type {HTMLFormElement | null} */ (document.querySelector('#filters'));
  if (!form) return {};

  const queryInput = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('query'));
  const genreSelect = /** @type {HTMLSelectElement | null} */ (form.elements.namedItem('genre'));
  const mineCheckbox = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('mine'));

  return {
    query: queryInput?.value ?? '',
    genre: genreSelect?.value ?? '',
    mine: Boolean(mineCheckbox?.checked),
  };
}

/**
 * C3. Підключає форму фільтрів: після кожної зміни — refresh().
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initFilters(refresh) {
  const form = /** @type {HTMLFormElement | null} */ (document.querySelector('#filters'));
  if (!form) return;

  form.addEventListener('input', () => {
    refresh();
  });

  form.addEventListener('change', () => {
    refresh();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    refresh();
  });

  form.addEventListener('reset', () => {
    const queryInput = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('query'));
    const genreSelect = /** @type {HTMLSelectElement | null} */ (form.elements.namedItem('genre'));
    const mineCheckbox = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('mine'));

    if (queryInput) queryInput.value = '';
    if (genreSelect) genreSelect.value = '';
    if (mineCheckbox) mineCheckbox.checked = false;

    refresh();
  });
}