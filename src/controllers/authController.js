import User from '../models/userModel.js';

export const home = (req, res) => {
  res.render('index');
};

export const loginForm = (req, res) => {
  res.render('login');
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = User.findByEmail(email);
  if (user && user.password === password) {
    res.send(`Bienvenido ${user.usuario}`);
  } else {
    res.send('Credenciales inválidas');
  }
};

// Mostrar formulario de registro
export const registerForm = (req, res) => {
  res.render('registro');
};

// Procesar registro
export const register = async (req, res) => {
  try {
    const { 
      email, celular, nombre, apellido, dni, 
      negocioNombre, negocioDireccion, negocioRubro, 
      password 
    } = req.body;

    const negocioLogo = req.file ? req.file.filename : null;

    const newUser = new User({
      email, celular, nombre, apellido, dni,
      negocioNombre, negocioLogo, negocioDireccion, negocioRubro,
      password
    });

    await newUser.save();
    res.send(`Usuario ${nombre} ${apellido} registrado con éxito`);
  } catch (error) {
    res.status(500).send("Error al registrar usuario: " + error.message);
  }
};