const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydancingstudio',
});

app.use(express.json());
app.use(cors());

app.post('/api/register', (req, res) => {
  const formData = req.body;

  formData.birthdate = new Date(formData.birthdate);

  const sql = 'INSERT INTO register (phoneNumber, parentNames, username, password, cpassword, email, numberOfChildren) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [formData.phoneNumber, formData.parentNames, formData.username, formData.password, formData.cpassword, formData.email, formData.numberOfChildren];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving form data' });
    } else {
      const children = formData.children.map(child => {
        return [child.childName, child.birthdate, child.gender, child.courseType, formData.phoneNumber, child.childID];
      });

      if (children.length > 0) {
        const sql2 = 'INSERT INTO children (childName, birthdate, gender, courseType, phoneNumber, childID) VALUES ?';
        connection.query(sql2, [children], (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving children data' }); 
          } else {
            res.json({ message: 'Form data received and saved successfully!' }); 
          }
        });
      } else {
        res.json({ message: 'Form data received and saved successfully!' });
      }
    }
  });
});


app.post('/api/login', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;

  const sql = 'SELECT * FROM register WHERE phoneNumber = ? AND password = ?';
  const values = [phoneNumber, password];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    } else {
      if (result.length > 0) {
        res.json({ message: 'Login successful!' });
      } else {
        res.status(401).json({ message: 'Invalid phoneNumber or password' });
      }
    }
  });
});

app.get('/api/customers', (req, res) => {
  const query = `
    SELECT register.parentNames, register.username, register.password, register.email, register.numberOfChildren, children.birthdate, children.gender, 
    register.phoneNumber, children.childName, children.courseType, children.childID
    FROM register
    JOIN children ON register.phoneNumber = children.phoneNumber
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving customer data' });
    } else {
      res.json(results);
    }
  });
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});