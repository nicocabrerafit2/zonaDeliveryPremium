import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  tipoUsuario: { type: String, enum: ['negocio', 'delivery'], required: true },

  // Campos comunes
  email: { type: String, required: true, unique: true },
  celular: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
  password: { type: String, required: true },

  // Campos negocio
  negocioNombre: { type: String },
  negocioLogo: { type: String }, // path del archivo
  negocioDireccion: { type: String },
  negocioRubro: { type: String },

  // Campos delivery
  vehiculoTipo: { type: String },
  vehiculoPatente: { type: String },
  vehiculoColor: { type: String },
  vehiculoModelo: { type: String },
  seguro: { type: String }, // path del archivo
  permisoConducir: { type: String }, // path del archivo
}, { timestamps: true });

export default mongoose.model('User', userSchema);