document.addEventListener('DOMContentLoaded', () => {
  console.log('registro.js cargado correctamente');

  const formNegocio = document.getElementById('formNegocio');
  const formDelivery = document.getElementById('formDelivery');
  const radios = document.querySelectorAll('input[name="tipoUsuario"]');
  const registroForm = document.getElementById('registroForm');

  // Estado inicial: ambos ocultos
  formNegocio.classList.add('hidden');
  formDelivery.classList.add('hidden');

  // Restaurar valores guardados en LocalStorage
  if (registroForm) {
    for (let el of registroForm.elements) {
      if (el.name && localStorage.getItem(el.name) !== null) {
        if (el.type !== 'file') el.value = localStorage.getItem(el.name);
        if (el.type === 'radio') el.checked = localStorage.getItem(el.name) === el.value;
      }
    }
  }

  // Reflejar tipo seleccionado
  const preselected = document.querySelector('input[name="tipoUsuario"]:checked');
  if (preselected) toggleForms(preselected.value);

  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      localStorage.setItem(e.target.name, e.target.value);
      toggleForms(e.target.value);
    });
  });

  function toggleForms(tipo) {
    formNegocio.classList.add('hidden');
    formDelivery.classList.add('hidden');
    if (tipo === 'negocio') formNegocio.classList.remove('hidden');
    if (tipo === 'delivery') formDelivery.classList.remove('hidden');
  }

  // Guardar cada input en LocalStorage
  if (registroForm) {
    registroForm.addEventListener('input', (e) => {
      const el = e.target;
      if (!el.name) return;
      if (el.type === 'file') return;
      if (el.type === 'radio') {
        if (el.checked) localStorage.setItem(el.name, el.value);
        return;
      }
      localStorage.setItem(el.name, el.value);
    });

    // Validaciones antes de enviar
    registroForm.addEventListener('submit', (e) => {
      const tipoUsuario = getValue(registroForm, 'tipoUsuario');
      const email = getValue(registroForm, 'email');
      const password = getValue(registroForm, 'password');

      if (!email) {
        e.preventDefault();
        alert('El email es obligatorio.');
        return;
      }

      const minLength = password.length >= 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      if (!minLength || !hasUppercase || !hasNumber) {
        e.preventDefault();
        alert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
        return;
      }

      if (tipoUsuario === 'negocio') {
        if (!registroForm.negocioLogo?.files?.length) {
          e.preventDefault();
          alert('El logo del negocio es obligatorio.');
          return;
        }
        const reqNegocio = [
          'nombreNegocio', 'apellidoNegocio', 'celularNegocio', 'dniNegocio',
          'negocioNombre', 'negocioDireccion', 'negocioRubro'
        ];
        const faltantes = reqNegocio.filter(n => !getValue(registroForm, n));
        if (faltantes.length) {
          e.preventDefault();
          alert('Completá todos los campos del negocio.');
          return;
        }
      } else if (tipoUsuario === 'delivery') {
        const seguroOk = registroForm.seguro?.files?.length;
        const permisoOk = registroForm.permisoConducir?.files?.length;
        if (!seguroOk || !permisoOk) {
          e.preventDefault();
          alert('Seguro y permiso de conducir son obligatorios.');
          return;
        }
        const reqDelivery = ['nombreDelivery', 'apellidoDelivery', 'celularDelivery', 'dniDelivery'];
        const faltantes = reqDelivery.filter(n => !getValue(registroForm, n));
        if (faltantes.length) {
          e.preventDefault();
          alert('Completá nombre, apellido, celular y DNI del delivery.');
          return;
        }
        const patente = getValue(registroForm, 'vehiculoPatente');
        const patenteRegex = /^[A-Z]{3}[0-9]{3}$/;
        if (patente && !patenteRegex.test(patente)) {
          e.preventDefault();
          alert('La patente debe tener el formato ABC123.');
          return;
        }
      } else {
        e.preventDefault();
        alert('Seleccioná el tipo de usuario.');
        return;
      }

      // Si todo está OK, limpiamos LocalStorage
      clearFormLocalStorage(registroForm);
    });
  }

  function getValue(form, name) {
    const el = form.elements[name];
    if (!el) return '';
    if (el instanceof RadioNodeList) return el.value || '';
    return el.value || '';
  }

  function clearFormLocalStorage(form) {
    for (let el of form.elements) {
      if (el.name) localStorage.removeItem(el.name);
    }
  }
});