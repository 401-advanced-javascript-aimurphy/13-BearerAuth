'use strict';

const express = require('express');
const auth = require('../auth/middleware.js');

const router = express.Router();

// this is how we access control list!
router.get('/profile', auth(), (req, res)=>{
  res.status(200).send('your profile');
});

///get a token, send it via "authorization:bearer <token>"

//mw with a parameter: curry middleware is needed so our auth here can take a param.

// 

router.get('/openarea', (req, res)=>{
  res.status(200).send('welcome to danger');
});

router.get('/doc', auth('read'), (req, res)=>{
  res.status(200).send('read route');
});

router.get('/delete-docs', auth('delete'), (req, res)=>{
  res.status(200).send('delete');
});

router.get('/add', auth('create'), (req, res)=>{
  res.status(200).send('add things');
});

//now you can make new users adn test them out to see if they can do their capabilities for their role types


module.exports = router;