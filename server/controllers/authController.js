const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validar campos
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan campos' });
    }

    // Verificar si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado correctamente ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validar campos
    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan campos' });
    }

    // Verificar si el usuario existe
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const storedUser = user.rows[0];

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, storedUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { userId: storedUser.id, username: storedUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
module.exports = { registerUser, loginUser };
