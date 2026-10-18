/** @typedef {import('./normalize.js').Show} Show */

/**
 * C3. Повертає новий масив серіалів, відсортований за полем `key`.
 *
 * @param {import('./normalize.js').Show[]} shows
 * @param {'name' | 'year' | 'rating'} key
 * @param {'asc' | 'desc'} [direction]
 * @returns {import('./normalize.js').Show[]}
 */
export function sortShows(shows, key, direction = 'asc') {
  const factor = direction === 'desc' ? -1 : 1;

  return [...shows].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA === null && valB === null) return 0;
    if (valA === null) return 1;
    if (valB === null) return -1;

    if (key === 'name') {
      return valA.localeCompare(valB) * factor;
    }

    return (valA - valB) * factor;
  });
}