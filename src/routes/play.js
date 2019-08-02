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

// the auth(*in here is not mw, it acts like mw*)fn is actually returning middleware to us. 

router.get('/public-stuff', (req, res)=>{
  res.status(200).send('anybody');
});

router.get('/something-to-read', auth('read'), (req, res)=>{
  res.status(200).send('read capabiilty📚');
});

router.post('/create-a-thing', auth('create'), (req, res)=>{
  res.status(200).send('create capability✏️');
});

router.put('/update', auth('update'), (req, res)=>{
  res.status(200).send('you have the update capability📆');
});

router.patch('/jp', auth('update'), (req, res)=>{
  res.status(200).send('you have the update capability🤡');
});

router.delete('/bye-bye', auth('delete'), (req, res)=>{
  res.status(200).send('you have the delete capability🧻');
});

router.get('/everything', auth('superuser'), (req, res)=>{
  res.status(200).send('you have the superuser capability🦸‍♀️');
});

//now you can make new users adn test them out to see if they can do their capabilities for their role types


module.exports = router;