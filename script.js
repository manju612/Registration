let count = 0;
const maxShares = 5;

const form = document.getElementById('registrationForm');
const shareBtn = document.getElementById('shareBtn');
const counterText = document.getElementById('clickCounter');
const finalMsg = document.getElementById('finalMsg');

const submitBtn = document.getElementById('submitBtn');

if (localStorage.getItem('submitted') === 'true') {
  form.style.display = 'none';
  finalMsg.classList.remove('hidden');
}

// WhatsApp Share Button
shareBtn.addEventListener('click', () => {
  if (count >= maxShares) return;

  const msg = "Hey Buddy, Join Tech For Girls Community!";
  const waLink = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waLink, "_blank");

  count++;
  counterText.textContent = `Click count: ${count}/5`;

  if (count >= maxShares) {
    counterText.textContent = "Sharing complete. Please continue.";
  }
});

// Form Submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (count < maxShares) {
    alert("Please complete sharing on WhatsApp (5 times) before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  // Upload file to Google Drive and get link
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('email', email);
  formData.append('college', college);
  formData.append('screenshot', file);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzq5rFZD1vwjTRNKAEldniiM-rEqTIInq3G9VY9AtM1xzXn8R5HAGC11XYHrY5homnz/exec', {
      method: 'POST',
      body: formData
    });

    const result = await response.text();
    console.log(result);

    localStorage.setItem('submitted', 'true');
    form.style.display = 'none';
    finalMsg.classList.remove('hidden');
  } catch (err) {
    alert("Something went wrong. Please try again.");
    console.error(err);
  }
});
