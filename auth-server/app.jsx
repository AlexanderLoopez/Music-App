import express from 'express'
import bcrypt from 'bcrypt'
var cors = require('cors')
const jwt = require("jsonwebtoken")
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("./database.json");
var db = low(adapter);

//Express app
const app = express()

//JWT secret key. Isolated by using env variables.
const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for the API
app.get('/', (_req, res) => {
    res.send("Auth API.\nPlease use POST /auth & POST /verify for authentication")
})

app.post('/auth', (req, res) => {
    
  const { email, password } = req.body;

  const user = db.get('users').value().filter(user => email === user.email)

  if (user.lenght === 1) {
    bcrypt.compare(password, user[0].password, function (_err, result){
      if (!result) {
        return res.status(401).json({ message: 'Invalid password' });
      } else {
        let loginData = {
          email,
          signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: 'success', token });
      }
    });

  } else if (user.lenght === 0){
    bcrypt.hash(password, 10, function (_err, hash) {
      console.log({ email, password: hash })
      db.get('users').push({ email, password: hash }).write()

      let loginData = {
        email, 
        signInTime: Date.now(),
      };

      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: 'succes', token });
    });

  }

})

//Verify enpoint
app.post('/verify', (req, res) => {
  const tokenHeaderKey = 'jwt-token';
  const authToken = req.headers[ttokenHeaderKey];
  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res
        .status(200)
        .json({ status: 'logged in', message: 'success' });
    } else {
      return res.status(401).json({ status: 'invalid auth', message: 'error' });
    } 
  } catch (error) {
    return res.status(401),json({ status: 'invalid auth', message: 'error' });
  }

})

//Endpoint for an existing account
app.post('/check-account', (req, res) => {
  const { email } = req.body

  console.log(req.body)

  const user = db.get('user').value().filter(user => email === user.email)

  console.log(user)

  res.status(200).json({
    status: user.length == 1 ? 'User exists' : 'User does not exist', userExists: user.lenght === 1

  })
})

app.listen(3080)