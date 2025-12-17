import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  celular: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
  negocioNombre: { type: String, required: true },
  negocioLogo: { type: String }, // guardamos el path del archivo
  negocioDireccion: { type: String, required: true },
  negocioRubro: { type: String, required: true },
  password: { type: String, required: true }
});

export default mongoose.model('User', userSchema);