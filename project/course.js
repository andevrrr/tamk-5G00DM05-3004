const express = require('express');
const router = express.Router();
const db = require('./database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM courses', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const courseId = req.params.id;
  db.get('SELECT * FROM courses WHERE id = ?', [courseId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
    return;
  }

  db.run('INSERT INTO courses (title, description) VALUES (?, ?)', [title, description], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ message: 'Course created', courseId: this.lastID });
  });
});

router.patch('/:id', (req, res) => {
  const courseId = req.params.id;
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
    return;
  }

  db.run('UPDATE courses SET title = ?, description = ? WHERE id = ?', [title, description, courseId], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json({ message: 'Course updated' });
  });
});

router.delete('/:id', (req, res) => {
  const courseId = req.params.id;

  db.run('DELETE FROM courses WHERE id = ?', [courseId], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json({ message: 'Course deleted' });
  });
});

module.exports = router;
