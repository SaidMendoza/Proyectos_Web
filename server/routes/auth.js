const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta protegida
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Ruta protegida accedida correctamente',
    user: req.user,
  });
});
const { body } = require('express-validator');
const validate = require('../middleware/validate'); // Si lo extraes como middleware aparte

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username es requerido'),
    body('password').isLength({ min: 6 }).withMessage('Contraseña mínimo 6 caracteres'),
  ],
  validate,
  registerUser
);

router.post(
  '/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty(),
  ],
  validate,
  loginUser
);


module.exports = router;
