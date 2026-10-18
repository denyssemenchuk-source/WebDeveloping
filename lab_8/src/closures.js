/**
 * @typedef {object} Counter
 * @property {() => number} increment збільшує значення на 1 і повертає нове
 * @property {() => number} reset повертає значення до початкового і повертає його
 * @property {() => number} value поточне значення
 */

/**
 * C5.1. Створює лічильник.
 *
 * @param {number} [start]
 * @returns {import('./closures.js').Counter}
 */
export function createCounter(start = 0) {
  let current = start;
  return {
    increment: () => {
      current += 1;
      return current;
    },
    reset: () => {
      current = start;
      return current;
    },
    value: () => current,
  };
}

/**
 * C5.2. Обгортає `fn` так, що вона виконується щонайбільше один раз.
 *
 * @template {(...args: any[]) => any} F
 * @param {F} fn
 * @returns {F}
 */
export function once(fn) {
  let called = false;
  let result;
  return /** @type {F} */ (
    (...args) => {
      if (!called) {
        called = true;
        result = fn(...args);
      }
      return result;
    }
  );
}

/**
 * C5.3. Запам'ятовує результати `fn` для кожного значення її єдиного аргументу.
 *
 * @template T, R
 * @param {(arg: T) => R} fn
 * @returns {(arg: T) => R}
 */
export function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}
