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
