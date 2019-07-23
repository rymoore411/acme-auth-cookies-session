const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

module.exports = app;

app.use(session({
  secret: 'Soul Planet',
  resave: false,
  saveUninitialized: true
}))

const userTable = {
  username: 'moe',
  password: 'MOE!'
}

app.use((req, res, next)=>{
  if(!req.session.count){
    req.session.count = 0;
  }
  ++req.session.count;

  next();
})

app.post('/api/sessions', (req, res, next)=>{

  const {username, password} = req.body;

  if(username && password){
    if(userTable.username === username){
      if(userTable.password === password){
        req.session.user = username;
        res.status(200).send();
      }else{
        res.status(401).send('Wrong password');
      }
    }else{
      res.status(401).send('Unauthorized, create a user account');
    }
  }else{
    res.status(401).send('Unauthorized, try again');
  }
})
