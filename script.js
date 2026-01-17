// Populate days (1–31)
const daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  daySelect.appendChild(option);
}

// Year Range (candidate must have age >= 10)
const yearSelect = document.getElementById("year");
const startYear = 2000;
const currentYear = new Date().getFullYear();
const validYear = currentYear - 10;

for (let y = startYear; y <= validYear; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  yearSelect.appendChild(option);
}

//Prevent from selecting past dates
const dateInput = document.getElementById('start-date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;


// Form Submission Functionality
const scriptUrl = 'https://script.google.com/macros/s/AKfycbwxglBDoyOD_CdcyykF0C2wxT1Q54b6AiPA5HdmEnxscPBlEyEOn20uf3KR1NkQvB7j/exec'
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect checkboxes manually as comma-separated
    const checkboxes = [...form.querySelectorAll('input[name="Days"]:checked')];
    const days = checkboxes.map(cb => cb.value).join(', '); // "mon,wed,fri"

    // Create FormData
    const formData = new FormData(form);
    formData.set('Days', days); // override Days field

    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        msg.style.display = 'block';
        msg.innerHTML = 'Form Submitted Successfully!';

        setTimeout(() => {
            msg.style.display = 'none';
            msg.innerHTML = '';
        }, 5000);

        form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
