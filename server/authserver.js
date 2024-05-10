const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
    user: 'postgres',
    password: 'postgresql',
    host: 'localhost', // or another host address if your database is not on your local machine
    port: 5432, // default port for PostgreSQL; change it if your database uses a different port
    database: 'postgres'
});

app.use(express.json()); // Middleware for JSON body parsing

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(400).send('User not found');
    }
    const validPassword = await bcrypt.compare(password, userResult.rows[0].password);
    if (!validPassword) {
      return res.status(401).send('Invalid credentials');
    }
    res.send('Login successful!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
