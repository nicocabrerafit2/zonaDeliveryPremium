import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  loginForm,
  login
} from '../controllers/loginController.js';
import {
  chooseType,
  registerNegocioForm,
  registerDeliveryForm,
  registerNegocio,
  registerDelivery
} from '../controllers/registerController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Página intermedia
router.get('/registro/tipo', chooseType);

// Negocio
router.get('/registro/negocio', registerNegocioForm);
router.post('/registro/negocio',
  upload.fields([{ name: 'negocioLogo', maxCount: 1 }]),
  registerNegocio
);

// Delivery
router.get('/registro/delivery', registerDeliveryForm);
router.post('/registro/delivery',
  upload.fields([
    { name: 'seguro', maxCount: 1 },
    { name: 'permisoConducir', maxCount: 1 }
  ]),
  registerDelivery
);

// Login
router.get('/login', loginForm);
router.post('/login', login);

export default router;