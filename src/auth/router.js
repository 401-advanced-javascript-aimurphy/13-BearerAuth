'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const Role = require('./roles-model.js');



authRouter.post('/roles', (req, res, next) => {
  let role = new Role(req.body);
  role.save()
    .then( (role) => {
      res.send(role);
    }).catch(next);
});

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

authRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});


module.exports = authRouter;
