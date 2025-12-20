import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Rutas
import authRoutes from './routes/authRoutes.js';
import homeRoutes from './routes/homeRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde /public y /uploads
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a MongoDB
const MONGO_STRING = process.env.MONGO_STRING;
const DB_NAME = process.env.DB;
if (!MONGO_STRING || !DB_NAME) {
  console.error('❌ Faltan variables de entorno: MONGO_STRING y/o DB');
  process.exit(1);
}

mongoose.connect(MONGO_STRING, { dbName: DB_NAME })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
    process.exit(1);
  });

// Cerrar conexión limpia al terminar el proceso
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 Conexión a MongoDB cerrada');
  process.exit(0);
});

// Configuración de motor de vistas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/', homeRoutes);
app.use('/', authRoutes);

// Middleware de errores (cartel amigable en vez de romper la página)
app.use((err, req, res, next) => {
  console.error('❌ Error inesperado:', err.stack);
  res.status(500).render('error', {
    title: 'Error',
    message: 'Ocurrió un problema al procesar tu solicitud.',
    detail: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;