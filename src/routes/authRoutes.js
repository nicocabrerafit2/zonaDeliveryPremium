import { Router } from 'express';
import multer from 'multer';
import { registerForm, register,home,loginForm,login } from '../controllers/authController.js';

const router = Router();

// Configuración de Multer (subida de imágenes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Rutas
router.get('/', home);
router.get('/registro', registerForm);
router.post('/registro', upload.single('negocioLogo'), register);
router.get('/login', loginForm);
router.post('/login', login);

export default router;