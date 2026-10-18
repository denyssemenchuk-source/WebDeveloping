/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} FilterOptions
 * @property {string | null} [query] частина назви
 * @property {string | null} [genre] жанр
 * @property {number | null} [minRating] мінімальна оцінка
 */

/**
 * C2. Повертає серіали, які відповідають усім заданим фільтрам.
 *
 * @param {import('./normalize.js').Show[]} shows
 * @param {import('./filter.js').FilterOptions} [options]
 * @returns {import('./normalize.js').Show[]}
 */
export function filterShows(shows, options = {}) {
  const { query = null, genre = null, minRating = null } = options ?? {};

  const normalizedQuery = typeof query === 'string' ? query.trim().toLowerCase() : '';
  const hasQuery = normalizedQuery.length > 0;
  const hasGenre = typeof genre === 'string' && genre.length > 0;
  const hasMinRating = typeof minRating === 'number' && minRating > 0;

  return shows.filter((show) => {
    if (hasQuery && !show.name.toLowerCase().includes(normalizedQuery)) {
      return false;
    }
    if (hasGenre && !show.genres.includes(genre)) {
      return false;
    }
    if (hasMinRating && (show.rating === null || show.rating < minRating)) {
      return false;
    }
    return true;
  });
}
