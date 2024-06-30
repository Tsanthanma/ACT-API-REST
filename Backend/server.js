const express = require('express');
const app = express();
const port = 3001;
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Configuración de CORS
app.use(cors());

// Configuración de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Usar las rutas definidas en routes.js
app.use('/api', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
