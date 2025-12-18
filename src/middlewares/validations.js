import { body } from 'express-validator';

export const registerValidation = [
  body('email')
    .isEmail().withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe contener al menos una mayúscula')
    .matches(/[0-9]/).withMessage('Debe contener al menos un número'),
  body('dni')
    .optional()
    .isNumeric().withMessage('El DNI debe ser numérico')
    .isLength({ min: 7, max: 8 }).withMessage('El DNI debe tener 7 u 8 dígitos'),
  body('celular')
    .optional()
    .isMobilePhone('es-AR').withMessage('Debe ser un celular válido'),
];