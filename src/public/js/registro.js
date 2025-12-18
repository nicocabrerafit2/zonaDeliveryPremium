// Mostrar formulario según tipo de usuario
document.addEventListener('DOMContentLoaded', () => {
  console.log("registro.js cargado correctamente");
});
console.log("registro.js cargado correctamente");
function mostrarFormulario(tipo) {
  const formNegocio = document.getElementById('formNegocio');
  const formDelivery = document.getElementById('formDelivery');

  formNegocio.classList.add('hidden');
  formDelivery.classList.add('hidden');

  if (tipo === 'negocio') {
    formNegocio.classList.remove('hidden');
  } else if (tipo === 'delivery') {
    formDelivery.classList.remove('hidden');
  }
}

// Validación extra de contraseña en frontend
document.addEventListener('DOMContentLoaded', () => {
  const registroForm = document.getElementById('registroForm');

  if (registroForm) {
    registroForm.addEventListener('submit', function (e) {
      const password = e.target.password.value;

      // Reglas: mínimo 8 caracteres, al menos una mayúscula y un número
      const minLength = password.length >= 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);

      if (!minLength || !hasUppercase || !hasNumber) {
        e.preventDefault();
        alert("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
      }

      // Validación de patente si es delivery
      const tipoUsuario = e.target.tipoUsuario.value;
      if (tipoUsuario === 'delivery') {
        const patente = e.target.vehiculoPatente.value;
        const patenteRegex = /^[A-Z]{3}[0-9]{3}$/;

        if (patente && !patenteRegex.test(patente)) {
          e.preventDefault();
          alert("La patente debe tener el formato ABC123.");
        }
      }
    });
  }
});