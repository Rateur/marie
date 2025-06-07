const form = document.getElementById('contact-form');
const message = document.getElementById('form-message');
const consent = document.getElementById('consent');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!consent.checked) {
    alert('Veuillez accepter la politique de confidentialit\xC3\xA9.');
    return;
  }
  message.classList.remove('hidden');
  form.reset();
});
