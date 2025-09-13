
const passwordEl = document.getElementById('password'); // Campo donde se muestra la contraseña
const lengthEl = document.getElementById('length');     // Input para elegir la longitud
const upperEl = document.getElementById('uppercase');   // Checkbox de mayúsculas
const lowerEl = document.getElementById('lowercase');   // Checkbox de minúsculas
const numberEl = document.getElementById('numbers');    // Checkbox de números
const symbolEl = document.getElementById('symbols');    // Checkbox de símbolos
const generateBtn = document.getElementById('generate');// Botón para generar
const copyBtn = document.getElementById('copy');        // Botón para copiar

//Definición de caracteres
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";   
const lower = "abcdefghijklmnopqrstuvwxyz";    
const numbers = "0123456789";                 
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";     

// Generar contraseña
generateBtn.addEventListener('click', () => {
  let chars = ''; 

  //Opciones seleccionadas
  if (upperEl.checked) chars += upper;
  if (lowerEl.checked) chars += lower;
  if (numberEl.checked) chars += numbers;
  if (symbolEl.checked) chars += symbols;

  const length = parseInt(lengthEl.value); 

  // Mensaje si el usuario no selecciona ninguna opción
  if (chars === '') {
    alert('Debes seleccionar al menos una opción.');
    return; 
  }

  // Creación de la contraseña
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Se muestra la contraseña en el input
  passwordEl.value = password;
  
});

copyBtn.addEventListener('click', () => {
  
  if (passwordEl.value) {
    navigator.clipboard.writeText(passwordEl.value) 
      .then(() => {
            
            popup.classList.add("show");

            // Se oculta el pop-up después de 2 segundos
            setTimeout(() => {
                popup.classList.remove("show");
            }, 2000);
        })   // Mensaje de confirmación
        .catch(err => console.error("Error al copiar:", err));
  } else {
    alert('Por favor genera una contraseña para copiar');
  }
});
