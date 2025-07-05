# Proyectos_Web
proyectos personales
# Autenticación con Node.js, Supabase y JWT

Este es un proyecto backend básico que implementa autenticación de usuarios usando **Node.js**, **Express**, **PostgreSQL (via Supabase)**, **bcrypt** para el cifrado de contraseñas y **JWT** para manejar sesiones seguras.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL (Supabase)
- bcrypt
- JSON Web Tokens (JWT)
- Thunder Client (para pruebas de API)

---

## 🚀 Instalación y ejecución

1. **Clona el repositorio:**

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo/server
Instala las dependencias:

bash
Copiar
Editar
npm install
Crea el archivo .env:

Agrega tus credenciales en un archivo .env en la raíz del proyecto:

env
Copiar
Editar
SUPABASE_URL=https://tu-url.supabase.co
SUPABASE_KEY=tu-clave-super-secreta
DB_HOST=db.xxxxxxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=nombre_base
JWT_SECRET=alguna_clave_segura
Ejecuta el servidor:

bash
Copiar
Editar
node index.js
📂 Estructura del proyecto
bash
Copiar
Editar
/server
├── controllers/
│   └── authController.js      # Lógica de registro y login
├── routes/
│   └── auth.js                # Endpoints API
├── middleware/
│   └── verifyToken.js         # Middleware para proteger rutas
├── db.js                      # Conexión a Supabase PostgreSQL
├── .env                       # Variables de entorno
├── index.js                   # Punto de entrada principal
├── package.json
🧪 Endpoints disponibles
📌 POST /api/register
Registra un nuevo usuario.

Body (JSON):

json
Copiar
Editar
{
  "username": "leonardo",
  "password": "123456"
}
📌 POST /api/login
Inicia sesión y devuelve un token JWT.

Body (JSON):

json
Copiar
Editar
{
  "username": "leonardo",
  "password": "123456"
}
📌 GET /api/profile
Ruta protegida. Requiere autenticación con JWT.

Header:

makefile
Copiar
Editar
Authorization: Bearer <TOKEN>
Respuesta esperada:

json
Copiar
Editar
{
  "message": "Ruta protegida accedida correctamente",
  "user": {
    "userId": 1,
    "username": "leonardo",
    "iat": 1710000000,
    "exp": 1710003600
  }
}
✅ Notas adicionales
Las contraseñas están cifradas con bcrypt antes de ser almacenadas.

Se usa Supabase como proveedor de base de datos PostgreSQL remota.

Las rutas protegidas validan el token con middleware personalizado.

🧠 Autor
Leonardo Mejia
Estudiante de Ingeniería en Computación
Desarrollador en formación apasionado por el web y los videojuegos 🎮💻

