const STORAGE_KEY = 'theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    const isDark = theme === 'dark';
    toggleButton.setAttribute('aria-pressed', String(isDark));
    toggleButton.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
  }
}

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function init() {
  applyTheme(getPreferredTheme());

  const toggleButton = document.getElementById('theme-toggle');
  toggleButton?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });
}

document.addEventListener('DOMContentLoaded', init);
