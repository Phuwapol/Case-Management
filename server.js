const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'case_reporting'
});

// Connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// PUT endpoint to update case status
app.put('/cases/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = 'UPDATE cases SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// GET endpoint to fetch all cases
app.get('/cases', (req, res) => {
  const query = 'SELECT * FROM cases';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// POST endpoint to create a new case
app.post('/cases', (req, res) => {
  const { name, status, item, details, email, phone, reportDate, image } = req.body;

  const query = 'INSERT INTO cases (name, status, item, details, email, phone, reportDate, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, status, item, details, email, phone, reportDate, image], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// Other endpoints can be added here...

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
