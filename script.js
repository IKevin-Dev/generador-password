const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('uppercase');
const lowerEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// Caracteres
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

// Evaluar fuerza
function evaluarSeguridad(pass) {
  let fuerza = 0;

  if (pass.length >= 8) fuerza++;
  if (/[A-Z]/.test(pass)) fuerza++;
  if (/[a-z]/.test(pass)) fuerza++;
  if (/\d/.test(pass)) fuerza++;
  if (/[^A-Za-z0-9]/.test(pass)) fuerza++;

  let ancho = (fuerza / 5) * 100;
  strengthBar.style.width = ancho + "%";

  if (fuerza <= 2) {
    strengthBar.style.background = "red";
    strengthText.textContent = "Contraseña débil 🔴";
  } else if (fuerza === 3) {
    strengthBar.style.background = "orange";
    strengthText.textContent = "Contraseña media 🟠";
  } else if (fuerza === 4) {
    strengthBar.style.background = "yellow";
    strengthText.textContent = "Contraseña buena 🟡";
  } else {
    strengthBar.style.background = "green";
    strengthText.textContent = "Contraseña muy segura 🟢";
  }

  if (pass.length === 0) {
    strengthBar.style.width = "0%";
    strengthText.textContent = "Escribe o genera una contraseña para evaluar su seguridad";
  }
}

// Generar contraseña aleatoria
generateBtn.addEventListener('click', () => {
  let chars = '';

  if (upperEl.checked) chars += upper;
  if (lowerEl.checked) chars += lower;
  if (numberEl.checked) chars += numbers;
  if (symbolEl.checked) chars += symbols;

  const length = parseInt(lengthEl.value);

  if (chars === '') {
    alert('Debes seleccionar al menos una opción.');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordEl.value = password;
  evaluarSeguridad(password); // Evalúa inmediatamente
});

// Evaluar seguridad mientras el usuario escribe su propia contraseña
passwordEl.addEventListener('input', () => {
  evaluarSeguridad(passwordEl.value);
});

// Copiar contraseña
copyBtn.addEventListener('click', () => {
  const popup = document.getElementById('popup');

  if (passwordEl.value) {
    navigator.clipboard.writeText(passwordEl.value)
      .then(() => {
        popup.classList.add("show");
        setTimeout(() => popup.classList.remove("show"), 2000);
      })
      .catch(err => console.error("Error al copiar:", err));
  } else {
    alert('Por favor ingresa o genera una contraseña para copiar');
  }
});
