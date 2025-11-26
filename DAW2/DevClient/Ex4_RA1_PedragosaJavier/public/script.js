document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const terms = document.getElementById('terms');
  const successEl = document.getElementById('form-success');

  const errors = {
    username: document.getElementById('error-username'),
    email: document.getElementById('error-email'),
    password: document.getElementById('error-password'),
    confirm: document.getElementById('error-confirm'),
    terms: document.getElementById('error-terms')
  };

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearErrors() {
    Object.values(errors).forEach(e => e.textContent = '');
    successEl.textContent = '';
  }

  function validate() {
    clearErrors();
    let valid = true;

    if (username.value.trim() === '') {
      errors.username.textContent = 'El nom d\'usuari no pot estar buit.';
      if (valid) username.focus();
      valid = false;
    }

    if (!emailRe.test(email.value.trim())) {
      errors.email.textContent = 'Introdueix un correu electrònic vàlid.';
      if (valid) email.focus();
      valid = false;
    }

    if (password.value.length < 8) {
      errors.password.textContent = 'La contrasenya ha de tenir almenys 8 caràcters.';
      if (valid) password.focus();
      valid = false;
    }

    if (password.value !== confirmPassword.value) {
      errors.confirm.textContent = 'Les contrasenyes no coincideixen.';
      if (valid) confirmPassword.focus();
      valid = false;
    }

    if (!terms.checked) {
      errors.terms.textContent = 'Has d\'acceptar els termes i condicions.';
      if (valid) terms.focus();
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      successEl.textContent = 'Registre completat amb èxit!';
      form.reset();
    }
  });

  // Esborra l'error corresponent mentre l'usuari escriu/canvia
  username.addEventListener('input', () => errors.username.textContent = '');
  email.addEventListener('input', () => errors.email.textContent = '');
  password.addEventListener('input', () => errors.password.textContent = '');
  confirmPassword.addEventListener('input', () => errors.confirm.textContent = '');
  terms.addEventListener('change', () => errors.terms.textContent = '');
});