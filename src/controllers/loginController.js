import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const loginForm = (req, res) => {
  res.render('login', { title: 'Login', error: null, formData: {} });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', {
        title: 'Login',
        error: 'Email y contraseña son obligatorios',
        formData: req.body
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', {
        title: 'Login',
        error: 'Usuario no encontrado',
        formData: req.body
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', {
        title: 'Login',
        error: 'Contraseña incorrecta',
        formData: req.body
      });
    }

    res.send(`Bienvenido ${user.nombre} ${user.apellido}`);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Ocurrió un problema al iniciar sesión.',
      detail: error.message
    });
  }
};