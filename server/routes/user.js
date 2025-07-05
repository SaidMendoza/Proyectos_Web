const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

// Todas las rutas protegidas
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');

// Middleware de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// Validaciones aplicadas a PUT y DELETE

router.put(
  '/:id',
  verifyToken,
  [
    param('id').isInt().withMessage('El ID debe ser un número'),
    body('username').notEmpty().withMessage('El username no puede estar vacío'),
  ],
  validate,
  updateUser
);

router.delete(
  '/:id',
  verifyToken,
  [param('id').isInt().withMessage('El ID debe ser un número')],
  validate,
  deleteUser
);


module.exports = router;
