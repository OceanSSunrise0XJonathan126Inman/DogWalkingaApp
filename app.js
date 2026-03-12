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
        website,
        name,
        reply: email,
        phone,
        details
      })
    });

    const result = await response.json()
  });
}