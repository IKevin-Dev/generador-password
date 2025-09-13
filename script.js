// ====== 1. Capturamos los elementos de la página (DOM) ======
const passwordEl = document.getElementById('password'); // Campo donde se muestra la contraseña
const lengthEl = document.getElementById('length');     // Input para elegir la longitud
const upperEl = document.getElementById('uppercase');   // Checkbox de mayúsculas
const lowerEl = document.getElementById('lowercase');   // Checkbox de minúsculas
const numberEl = document.getElementById('numbers');    // Checkbox de números
const symbolEl = document.getElementById('symbols');    // Checkbox de símbolos
const generateBtn = document.getElementById('generate');// Botón para generar
const copyBtn = document.getElementById('copy');        // Botón para copiar

// ====== 2. Definimos los caracteres disponibles ======
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";    // Letras mayúsculas
const lower = "abcdefghijklmnopqrstuvwxyz";    // Letras minúsculas
const numbers = "0123456789";                  // Números
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";     // Símbolos

// ====== 3. Evento para generar la contraseña ======
generateBtn.addEventListener('click', () => {
  let chars = ''; // Aquí guardaremos todos los caracteres elegidos

  // Verificamos qué opciones marcó el usuario y las añadimos
  if (upperEl.checked) chars += upper;
  if (lowerEl.checked) chars += lower;
  if (numberEl.checked) chars += numbers;
  if (symbolEl.checked) chars += symbols;

  const length = parseInt(lengthEl.value); // Convertimos la longitud a número

  // Si el usuario no selecciona ningún tipo de carácter
  if (chars === '') {
    alert('Debes seleccionar al menos una opción.');
    return; // Salimos de la función
  }

  // Creamos la contraseña aleatoria
  let password = '';
  for (let i = 0; i < length; i++) {
    // Math.random() genera un número entre 0 y 1
    // chars.length es la cantidad de caracteres disponibles
    // charAt() obtiene el carácter en una posición aleatoria
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Mostramos la contraseña en el input
  passwordEl.value = password;
  
});

copyBtn.addEventListener('click', () => {
  // Solo copiamos si hay una contraseña generada
  if (passwordEl.value) {
    navigator.clipboard.writeText(passwordEl.value) // API moderna de copiar texto
      .then(() => {
            // Mostramos el pop-up
            popup.classList.add("show");

            // Lo ocultamos después de 2 segundos
            setTimeout(() => {
                popup.classList.remove("show");
            }, 2000);
        })   // Mensaje de confirmación
        .catch(err => console.error("Error al copiar:", err));
  } else {
    alert('Por favor genera una contraseña para copiar');
  }
});
