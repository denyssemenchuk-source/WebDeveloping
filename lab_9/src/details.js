import { getShow, notes, saveNote } from './state.js';

/** @type {number | null} */
let currentShowId = null;

/**
 * Повертає фокус на кнопку «Детальніше» картки з вказаним id.
 * @param {number | null} id
 */
function focusDetailsButton(id) {
    if (id === null) return;
    const btn = /** @type {HTMLElement | null} */ (
        document.querySelector(`#results li[data-id="${id}"] [data-action="details"]`)
    );
    btn?.focus();
}

/**
 * Очищує стан помилки на полі оцінки.
 * @param {HTMLInputElement | null} ratingInput
 * @param {HTMLElement | null} errorEl
 */
function clearRatingError(ratingInput, errorEl) {
    if (ratingInput) {
        ratingInput.removeAttribute('aria-invalid');
    }
    if (errorEl) {
        errorEl.textContent = '';
    }
}

/**
 * C4. Відкриває діалог #details для серіалу: назва, опис, посилання на сторінку TVmaze і форма
 * з моєю оцінкою й нотаткою. Специфікація — ТЗ, C4.
 *
 * @param {number} id
 */
export function openDetails(id) {
    const show = getShow(id);
    currentShowId = id;

    const dialog = /** @type {HTMLDialogElement | null} */ (document.querySelector('#details'));
    const titleEl = document.querySelector('#details-title');
    const summaryEl = document.querySelector('#details-summary');
    const linkEl = /** @type {HTMLAnchorElement | null} */ (document.querySelector('#details-link'));
    const form = /** @type {HTMLFormElement | null} */ (document.querySelector('#note-form'));
    const errorEl = /** @type {HTMLElement | null} */ (document.querySelector('#note-rating-error'));

    if (!dialog || !form) return;

    if (titleEl) {
        titleEl.textContent = show.name;
    }

    if (linkEl) {
        linkEl.href = show.url;
    }

    if (summaryEl) {
        const parsed = new DOMParser().parseFromString(show.summary ?? '', 'text/html');
        const paragraphs = [...parsed.body.children]
            .map((el) => el.textContent?.trim() ?? '')
            .filter(Boolean);

        if (paragraphs.length > 0) {
            summaryEl.replaceChildren(
                ...paragraphs.map((text) => {
                    const p = document.createElement('p');
                    p.textContent = text;
                    return p;
                }),
            );
        } else {
            summaryEl.textContent = parsed.body.textContent?.trim() ?? '';
        }
    }

    const ratingInput = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('rating'));
    const noteInput = /** @type {HTMLTextAreaElement | null} */ (form.elements.namedItem('note'));

    clearRatingError(ratingInput, errorEl);

    const saved = notes.get(id);
    if (ratingInput) {
        ratingInput.value = saved ? String(saved.rating) : '';
    }
    if (noteInput) {
        noteInput.value = saved ? saved.text : '';
    }

    if (!dialog.open) {
        dialog.showModal();
    }
}

/**
 * C4. Підключає діалог #details: закриття й форму «Моя оцінка й нотатка».
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initDetails(refresh) {
    const dialog = /** @type {HTMLDialogElement | null} */ (document.querySelector('#details'));
    const form = /** @type {HTMLFormElement | null} */ (document.querySelector('#note-form'));
    const errorEl = /** @type {HTMLElement | null} */ (document.querySelector('#note-rating-error'));

    if (!dialog || !form) return;

    form.noValidate = true;

    const ratingInput = /** @type {HTMLInputElement | null} */ (form.elements.namedItem('rating'));
    const noteInput = /** @type {HTMLTextAreaElement | null} */ (form.elements.namedItem('note'));

    if (ratingInput) {
        ratingInput.setAttribute('aria-describedby', 'note-rating-error');
        ratingInput.addEventListener('input', () => {
            clearRatingError(ratingInput, errorEl);
        });
    }

    const cancelBtn = [...form.querySelectorAll('button')].find(
        (btn) => btn.getAttribute('type') === 'button',
    );
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            dialog.close();
            focusDetailsButton(currentShowId);
        });
    }

    dialog.addEventListener('close', () => {
        focusDetailsButton(currentShowId);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (currentShowId === null || !ratingInput || !noteInput) return;

        const rawValue = ratingInput.value.trim();
        const ratingValue = ratingInput.valueAsNumber;
        const isValid =
            rawValue !== '' &&
            !Number.isNaN(ratingValue) &&
            Number.isInteger(ratingValue) &&
            ratingValue >= 1 &&
            ratingValue <= 10;

        if (!isValid) {
            ratingInput.setAttribute('aria-invalid', 'true');
            ratingInput.setAttribute('aria-describedby', 'note-rating-error');
            if (errorEl) {
                errorEl.textContent = 'Введіть ціле число від 1 до 10.';
            }
            ratingInput.focus();
            return;
        }

        clearRatingError(ratingInput, errorEl);
        const show = getShow(currentShowId);
        saveNote(currentShowId, {
            rating: ratingValue,
            text: noteInput.value,
        });

        refresh();
        dialog.close();

        const statusEl = document.querySelector('#status');
        if (statusEl) {
            statusEl.textContent = `Нотатку до ${show.name} збережено`;
        }

        focusDetailsButton(currentShowId);
    });
}