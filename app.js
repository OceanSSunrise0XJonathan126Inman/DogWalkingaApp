const contactForm = document.getElementById('contactForm');
const formLoadedAt = Date.now();
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
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