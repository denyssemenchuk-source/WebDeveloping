/* FlowTask — landing page behaviour */

document.addEventListener('DOMContentLoaded', function () {

  /* Sign-up smooth navigation */

  function startSignup(e) {
    if (e) e.preventDefault();
    var trial = document.getElementById('trial');
    if (trial) {
      trial.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'index.html#trial';
    }
  }

  var headerCta = document.getElementById('header-cta');
  if (headerCta) {
    headerCta.addEventListener('click', startSignup);
  }

  var heroCta = document.getElementById('hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', startSignup);
  }

  /* Trial form */

  var form = document.getElementById('trial-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[name="email"]');
      var emailError = document.getElementById('email-error');

      if (!email.value || !email.validity.valid) {
        email.setAttribute('aria-invalid', 'true');
        if (emailError) {
          emailError.textContent = 'Please enter a valid work email address.';
        }
        email.focus();
        return;
      }

      email.removeAttribute('aria-invalid');
      if (emailError) {
        emailError.textContent = '';
      }

      form.innerHTML = '<p class="trial__success" role="status">Thanks — check your inbox, your workspace is being created.</p>';
    });

    var emailInput = form.querySelector('input[name="email"]');
    if (emailInput) {
      emailInput.addEventListener('input', function () {
        if (emailInput.hasAttribute('aria-invalid')) {
          emailInput.removeAttribute('aria-invalid');
          var emailError = document.getElementById('email-error');
          if (emailError) emailError.textContent = '';
        }
      });
    }
  }

  /* FAQ accordion */

  document.querySelectorAll('.faq__q').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq__item');
      var isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      if (item) {
        item.classList.toggle('is-open', !isExpanded);
      }
    });
  });

});
