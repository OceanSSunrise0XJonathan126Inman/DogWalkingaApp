const payNowBtn = document.getElementById('payNowBtn');
const paymentStatus = document.getElementById('paymentStatus');
const submitBtn = document.querySelector('#contactForm button[type="submit"]');

const paymentParams = new URLSearchParams(window.location.search);
const returnedSessionId = paymentParams.get('session_id') || '';
let paymentSessionId = returnedSessionId || sessionStorage.getItem('paymentSessionId') || '';
let paymentComplete = !!paymentSessionId;
const FORM_STORAGE_KEY = 'dogWalkingFormDraft';

if (returnedSessionId) {
  sessionStorage.setItem('paymentSessionId', returnedSessionId);
}

function saveFormDraft(data) {
  sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
}

function loadFormDraft() {
  const raw = sessionStorage.getItem(FORM_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearFormDraft() {
  sessionStorage.removeItem(FORM_STORAGE_KEY);
}

if (paymentParams.get('payment') === 'cancel') {
  paymentComplete = false;
  paymentSessionId = '';
  sessionStorage.removeItem('paymentSessionId');
}

if (paymentStatus) {
  paymentStatus.textContent = paymentComplete
    ? 'Payment complete.'
    : 'Payment required before sending request.';
}

if (submitBtn) {
  submitBtn.disabled = !paymentComplete;
}
const contactForm = document.getElementById('contactForm');
const savedDraft = loadFormDraft();

if (contactForm && savedDraft) {
  contactForm.querySelector('[name="name"]').value = savedDraft.name || '';
  contactForm.querySelector('[name="reply"]').value = savedDraft.email || '';
  contactForm.querySelector('[name="area"]').value = savedDraft.area || '';
  contactForm.querySelector('[name="pref"]').value = savedDraft.pref || '';
  contactForm.querySelector('[name="breed"]').value = savedDraft.breed || '';
  contactForm.querySelector('[name="service"]').value = savedDraft.service || '';
  contactForm.querySelector('[name="temperament"]').value = savedDraft.temperament || '';
  contactForm.querySelector('[name="reactive"]').value = savedDraft.reactive || '';
  contactForm.querySelector('[name="multidog"]').value = savedDraft.multidog || '';
  contactForm.querySelector('[name="numDogs"]').value = savedDraft.numDogs || '';
  contactForm.querySelector('[name="notes"]').value = savedDraft.details || '';
}

if (payNowBtn) {
  payNowBtn.addEventListener('click', async function () {
    if (paymentStatus) paymentStatus.textContent = 'Opening Stripe checkout...';
    saveFormDraft({
      name: contactForm?.querySelector('[name="name"]')?.value.trim() || '',
      email: contactForm?.querySelector('[name="reply"]')?.value.trim() || '',
      phone: contactForm?.querySelector('[name="phone"]')?.value.trim() || '',
      area: contactForm?.querySelector('[name="area"]')?.value || '',
      pref: contactForm?.querySelector('[name="pref"]')?.value || '',
      breed: contactForm?.querySelector('[name="breed"]')?.value || '',
      service: contactForm?.querySelector('[name="service"]')?.value || '',
      temperament: contactForm?.querySelector('[name="temperament"]')?.value || '',
      reactive: contactForm?.querySelector('[name="reactive"]')?.value || '',
      multidog: contactForm?.querySelector('[name="multidog"]')?.value || '',
      numDogs: contactForm?.querySelector('[name="numDogs"]')?.value || '',
      details: contactForm?.querySelector('[name="notes"]')?.value.trim() || ''
    });
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
        paymentSessionId,
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
        if (!response.ok || !result.ok) {
      alert(result.error || 'Error sending request.');
      return;
    }

    clearFormDraft();
    contactForm.reset();
    sessionStorage.removeItem('paymentSessionId');
    paymentSessionId = '';
    paymentComplete = false;
    if (submitBtn) submitBtn.disabled = true;
    if (paymentStatus) paymentStatus.textContent = 'Payment required before sending request.';

    alert('Request sent successfully.');
  });
}