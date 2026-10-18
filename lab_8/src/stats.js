/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 *
 * @param {import('./normalize.js').Show[]} shows
 * @returns {Record<string, import('./stats.js').GenreStats>}
 */
export function genreStats(shows) {
  const accum = {};

  for (const show of shows) {
    for (const genre of show.genres) {
      if (!Object.hasOwn(accum, genre)) {
        accum[genre] = { count: 0, ratedCount: 0, sum: 0 };
      }
      accum[genre].count += 1;
      if (show.rating !== null && show.rating !== undefined) {
        accum[genre].ratedCount += 1;
        accum[genre].sum += show.rating;
      }
    }
  }

  const result = {};
  for (const [genre, data] of Object.entries(accum)) {
    result[genre] = {
      count: data.count,
      averageRating:
        data.ratedCount > 0 ? Math.round((data.sum / data.ratedCount) * 10) / 10 : null,
    };
  }

  return result;
}
