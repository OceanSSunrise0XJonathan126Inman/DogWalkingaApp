const payNowBtn = document.getElementById('payNowBtn');
const paymentStatus = document.getElementById('paymentStatus');
const submitBtn = document.querySelector('#contactForm button[type="submit"]');

const paymentParams = new URLSearchParams(window.location.search);
let paymentComplete = sessionStorage.getItem('paymentComplete') === 'true';

if (paymentParams.get('payment') === 'success') {
  paymentComplete = true;
  sessionStorage.setItem('paymentComplete', 'true');
}

if (paymentParams.get('payment') === 'cancel') {
  paymentComplete = false;
  sessionStorage.removeItem('paymentComplete');
}

if (paymentStatus) {
  paymentStatus.textContent = paymentComplete
    ? 'Payment complete.'
    : 'Payment required before sending request.';
}

if (submitBtn) {
  submitBtn.disabled = !paymentComplete;
}

if (payNowBtn) {
  payNowBtn.addEventListener('click', async function () {
    if (paymentStatus) paymentStatus.textContent = 'Opening Stripe checkout...';

    const response = await fetch('https://white-rain-5e87.doeslovekittys.workers.dev/create-checkout-session', {
      method: 'POST'
    });

    const result = await response.json();

    if (!result.ok || !result.url) {
      if (paymentStatus) paymentStatus.textContent = 'Stripe checkout failed.';
      return;
    }

    window.location.href = result.url;
  });
}
const contactForm = document.getElementById('contactForm');
const formLoadedAt = Date.now();
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!paymentComplete) {
  alert('Please complete payment first.');
  return;
}
    const name = contactForm.querySelector('[name="name"]')?.value.trim() || '';
    const email = contactForm.querySelector('[name="reply"]')?.value.trim() || '';
    const phone = contactForm.querySelector('[name="phone"]')?.value.trim() || '';
    const website = contactForm.querySelector('[name="website"]')?.value.trim() || '';
    const details = contactForm.querySelector('[name="notes"]')?.value.trim() || '';
    const turnstileToken = contactForm.querySelector('[name="cf-turnstile-response"]')?.value || '';
    const area = contactForm.querySelector('[name="area"]')?.value || '';
const pref = contactForm.querySelector('[name="pref"]')?.value || '';
const breed = contactForm.querySelector('[name="breed"]')?.value || '';
const service = contactForm.querySelector('[name="service"]')?.value || '';
const temperament = contactForm.querySelector('[name="temperament"]')?.value || '';
const reactive = contactForm.querySelector('[name="reactive"]')?.value || '';
const multidog = contactForm.querySelector('[name="multidog"]')?.value || '';
const numDogs = contactForm.querySelector('[name="numDogs"]')?.value || '';
if (website) {
  alert('Blocked.');
  return;
}
    
       const response = await fetch('https://white-rain-5e87.doeslovekittys.workers.dev/', {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startedAt: formLoadedAt,
        turnstileToken,
        website,
        name,
        reply: email,
        phone,
        area,
        pref,
        breed,
        service,
        temperament,
        reactive,
        multidog,
        numDogs,
        details
      })
    });

    const result = await response.json()
  });
}