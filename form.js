document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // hindrar att sidan laddas om

    // Visa “Skickar…” på knappen
    submitBtn.disabled = true;
    submitBtn.textContent = 'Skickar…';

    const formData = new FormData(form);

    fetch('https://formspree.io/f/meeggajj', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success || data.ok || data._token) {
        formMessage.innerHTML = '<span class="text-success">Tack! Ditt meddelande skickades.</span>';
        form.reset();
      } else {
        formMessage.innerHTML = '<span class="text-danger">Något gick fel, försök igen.</span>';
      }
    })
    .catch(error => {
      console.error(error);
      formMessage.innerHTML = '<span class="text-danger">Något gick fel, försök igen.</span>';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Skicka';
    });
  });
});