document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  const firstName = document.getElementById('firstName');
  const surname1 = document.getElementById('surname1');
  const surname2 = document.getElementById('surname2');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const dob = document.getElementById('dob');
  const card = document.getElementById('card');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const terms = document.getElementById('terms');
  const successEl = document.getElementById('form-success');

  const errors = {
    firstName: document.getElementById('error-firstName'),
    surname1: document.getElementById('error-surname1'),
    surname2: document.getElementById('error-surname2'),
    email: document.getElementById('error-email'),
    phone: document.getElementById('error-phone'),
    dob: document.getElementById('error-dob'),
    card: document.getElementById('error-card'),
    password: document.getElementById('error-password'),
    confirm: document.getElementById('error-confirm'),
    terms: document.getElementById('error-terms')
  };

  // RegExp objects (requeriment: usar l'objecte RegExp)
  const nameInitialUpperRe = new RegExp('^[A-ZÀ-ÖØ-Ý]');
  const emailRe = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z]+\\.[A-Za-z]+$'); // nom@domini.extensió, domini i extensió només lletres
  const phoneRe = new RegExp('^[6-9]\\d{2}([ -]?\\d{3}){2}$'); // 9 dígits, pot tenir espais o guions entre grups de 3
  const dobRe = new RegExp('^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$'); // dd/mm/aaaa
  const cardRe = new RegExp('^\\d{4}([ -])\\d{4}\\1\\d{4}\\1\\d{4}$'); // XXXX-XXXX-XXXX-XXXX o XXXX XXXX XXXX XXXX (mateix separador)
  const passwordRe = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$'); // 1 maj, 1 min, 1 num, 1 especial, mínim 8

  function clearErrors() {
    Object.values(errors).forEach(e => { if (e) e.textContent = ''; });
    if (successEl) successEl.textContent = '';
  }

  function focusFirstInvalid(order) {
    for (const errEl of order) {
      if (errEl && errEl.textContent) {
        const id = errEl.id.replace('error-', '');
        const input = document.getElementById(id);
        if (input) input.focus();
        break;
      }
    }
  }

  function validate() {
    clearErrors();
    let valid = true;

    if (!firstName.value.trim()) {
      errors.firstName.textContent = "El nom no pot estar buit.";
      valid = false;
    } else if (!nameInitialUpperRe.test(firstName.value.trim())) {
      errors.firstName.textContent = "La primera lletra del nom ha de ser majúscula.";
      valid = false;
    }

    if (!surname1.value.trim()) {
      errors.surname1.textContent = "El primer cognom no pot estar buit.";
      valid = false;
    } else if (!nameInitialUpperRe.test(surname1.value.trim())) {
      errors.surname1.textContent = "La primera lletra del primer cognom ha de ser majúscula.";
      valid = false;
    }

    if (surname2.value.trim() && !nameInitialUpperRe.test(surname2.value.trim())) {
      errors.surname2.textContent = "Si s'indica, la primera lletra del segon cognom ha de ser majúscula.";
      valid = false;
    }

    if (!emailRe.test(email.value.trim())) {
      errors.email.textContent = "Introdueix un correu amb format nom@domini.extensió (domini i extensió només lletres).";
      valid = false;
    }

    if (!phoneRe.test(phone.value.trim())) {
      errors.phone.textContent = "Número invàlid. Ha de tenir 9 dígits, començar per 6/7/8/9 i pot tenir espais o guions entre grups de 3.";
      valid = false;
    }

    if (!dobRe.test(dob.value.trim())) {
      errors.dob.textContent = "Data invàlida. Format dd/mm/aaaa, dia 01-31, mes 01-12, any 4 xifres.";
      valid = false;
    }

    if (!cardRe.test(card.value.trim())) {
      errors.card.textContent = "Targeta invàlida. Format XXXX-XXXX-XXXX-XXXX o XXXX XXXX XXXX XXXX.";
      valid = false;
    }

    if (!passwordRe.test(password.value)) {
      errors.password.textContent = "Contrasenya invàlida. Mínim 8 caràcters, 1 majúscula, 1 minúscula, 1 número i 1 caràcter especial.";
      valid = false;
    }

    if (password.value !== confirmPassword.value) {
      errors.confirm.textContent = "Les contrasenyes no coincideixen.";
      valid = false;
    }

    if (!terms.checked) {
      errors.terms.textContent = "Has d'acceptar els termes i condicions.";
      valid = false;
    }

    focusFirstInvalid([
      errors.firstName, errors.surname1, errors.surname2,
      errors.email, errors.phone, errors.dob, errors.card,
      errors.password, errors.confirm, errors.terms
    ]);

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      if (successEl) successEl.textContent = 'Registre completat amb èxit!';
      form.reset();
    }
  });

  // Esborra l'error corresponent mentre l'usuari escriu/canvia
  [
    firstName, surname1, surname2, email, phone, dob, card,
    password, confirmPassword
  ].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('input', () => {
      const err = document.getElementById('error-' + inp.id);
      if (err) err.textContent = '';
    });
  });

  if (terms) terms.addEventListener('change', () => {
    if (errors.terms) errors.terms.textContent = '';
  });
});