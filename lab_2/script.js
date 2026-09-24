/**
 * Lab 2: Interactive Demonstration Scripts
 * Handles theme switching, box-model live recalculation, and cascade testing.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle Management
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('webdev-theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('webdev-theme', nextTheme);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // 2. Interactive Box Model Controls
  const paddingSlider = document.getElementById('padding-slider');
  const paddingVal = document.getElementById('padding-val');
  const contentBox = document.getElementById('box-content-box');
  const borderBox = document.getElementById('box-border-box');
  const btnResetBoxModel = document.getElementById('btn-reset-boxmodel');

  if (paddingSlider && paddingVal && contentBox && borderBox) {
    paddingSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      paddingVal.textContent = `${val}px`;
      contentBox.style.padding = `${val}px`;
      borderBox.style.padding = `${val}px`;
    });

    if (btnResetBoxModel) {
      btnResetBoxModel.addEventListener('click', () => {
        paddingSlider.value = 24;
        paddingVal.textContent = '24px';
        contentBox.style.padding = '24px';
        borderBox.style.padding = '24px';
      });
    }
  }

  // 3. Cascade Class Order Switcher
  const btnToggleCascadeOrder = document.getElementById('btn-toggle-cascade-order');
  const cascadeTarget = document.getElementById('cascade-target-box');
  const btnApplyInline = document.getElementById('btn-apply-inline');

  if (btnToggleCascadeOrder && cascadeTarget) {
    let orderState = 0;
    btnToggleCascadeOrder.addEventListener('click', () => {
      if (orderState === 0) {
        cascadeTarget.className = 'cascade-target color-rule-b color-rule-a';
        btnToggleCascadeOrder.textContent = 'Class Order: .color-rule-b .color-rule-a';
        orderState = 1;
      } else {
        cascadeTarget.className = 'cascade-target color-rule-a color-rule-b';
        btnToggleCascadeOrder.textContent = 'Class Order: .color-rule-a .color-rule-b';
        orderState = 0;
      }
    });
  }

  if (btnApplyInline && cascadeTarget) {
    btnApplyInline.addEventListener('click', () => {
      if (cascadeTarget.style.color) {
        cascadeTarget.style.color = '';
        btnApplyInline.textContent = 'Додати Style Tag override';
      } else {
        cascadeTarget.style.color = '#8b5cf6';
        btnApplyInline.textContent = 'Скинути Inline Style';
      }
    });
  }
});
