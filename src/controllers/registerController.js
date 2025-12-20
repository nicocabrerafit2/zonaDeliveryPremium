import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

// Página intermedia para elegir tipo
export const chooseType = (req, res) => {
  res.render('registroTipo', { title: 'Elegí tu tipo de usuario' });
};

// Formulario Negocio
export const registerNegocioForm = (req, res) => {
  res.render('registroNegocio', { title: 'Registro Negocio', error: null, formData: {} });
};

export const registerNegocio = async (req, res) => {
  try {
    const {
      email, password,
      nombreNegocio, apellidoNegocio, celularNegocio, dniNegocio,
      negocioNombre, negocioDireccion, negocioRubro
    } = req.body;

    if (!email || !password || !nombreNegocio || !apellidoNegocio || !celularNegocio || !dniNegocio || !negocioNombre || !negocioDireccion || !negocioRubro) {
      return res.render('registroNegocio', { title: 'Registro Negocio', error: 'Todos los campos son obligatorios', formData: req.body });
    }
    if (!req.files?.negocioLogo) {
      return res.render('registroNegocio', { title: 'Registro Negocio', error: 'El logo del negocio es obligatorio', formData: req.body });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      tipoUsuario: 'negocio',
      email,
      nombre: nombreNegocio,
      apellido: apellidoNegocio,
      celular: celularNegocio,
      dni: dniNegocio,
      negocioNombre,
      negocioDireccion,
      negocioRubro,
      negocioLogo: req.files.negocioLogo[0].path,
      password: hashedPassword
    });

    await newUser.save();
    res.send(`Negocio ${nombreNegocio} registrado con éxito`);
  } catch (error) {
    console.error('Error en registro negocio:', error);
    res.status(500).render('error', { title: 'Error', message: 'Ocurrió un problema al registrar negocio.', detail: error.message });
  }
};

// Formulario Delivery
export const registerDeliveryForm = (req, res) => {
  res.render('registroDelivery', { title: 'Registro Delivery', error: null, formData: {} });
};

export const registerDelivery = async (req, res) => {
  try {
    const {
      email, password,
      nombreDelivery, apellidoDelivery, celularDelivery, dniDelivery,
      vehiculoTipo, vehiculoPatente, vehiculoColor, vehiculoModelo
    } = req.body;

    if (!email || !password || !nombreDelivery || !apellidoDelivery || !celularDelivery || !dniDelivery) {
      return res.render('registroDelivery', { title: 'Registro Delivery', error: 'Todos los campos son obligatorios', formData: req.body });
    }
    if (!req.files?.seguro || !req.files?.permisoConducir) {
      return res.render('registroDelivery', { title: 'Registro Delivery', error: 'Seguro y permiso de conducir son obligatorios', formData: req.body });
    }

    const patenteRegex = /^[A-Z]{3}[0-9]{3}$/;
    if (vehiculoPatente && !patenteRegex.test(vehiculoPatente)) {
      return res.render('registroDelivery', { title: 'Registro Delivery', error: 'La patente debe tener formato ABC123', formData: req.body });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      tipoUsuario: 'delivery',
      email,
      nombre: nombreDelivery,
      apellido: apellidoDelivery,
      celular: celularDelivery,
      dni: dniDelivery,
      vehiculoTipo,
      vehiculoPatente,
      vehiculoColor,
      vehiculoModelo,
      seguro: req.files.seguro[0].path,
      permisoConducir: req.files.permisoConducir[0].path,
      password: hashedPassword
    });

    await newUser.save();
    res.send(`Delivery ${nombreDelivery} registrado con éxito`);
  } catch (error) {
  console.error('Error en registro delivery:', error);
  res.status(500).render('error', {
    title: 'Error',
    message: 'Ocurrió un problema al registrar delivery.',
 
  });
};console.error(  error.message || JSON.stringify(error));

};