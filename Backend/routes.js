const express = require('express');
const router = express.Router();
const db = require('./db');  // Asegúrate de que este archivo exista y esté configurado correctamente

let libros = [
  { id: 1, titulo: 'Libro 1', autor: 'Autor 1' },
  { id: 2, titulo: 'Libro 2', autor: 'Autor 2' }
];

// Obtener todos los libros
router.get('/libros', (req, res) => {
  db.query('SELECT * FROM libros', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Agregar un nuevo libro
router.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;
  db.query('INSERT INTO libros (titulo, autor) VALUES (?, ?)', [titulo, autor], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: results.insertId, titulo, autor });
    }
  });
});

// Actualizar un libro
router.put('/libros/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor } = req.body;
  db.query('UPDATE libros SET titulo = ?, autor = ? WHERE id = ?', [titulo, autor, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, titulo, autor });
    }
  });
});

// Eliminar un libro
router.delete('/libros/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM libros WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Libro eliminado' });
    }
  });
});

module.exports = router;
