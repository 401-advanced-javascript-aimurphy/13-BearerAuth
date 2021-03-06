'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const roles = require('./roles-model.js');

const users = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
  jti:{type:String},
}, {toObject:{virtuals:true}, toJSON:{virtuals:true}});

// we are adding a new column that pulls in the entire role table ^up there is allowing it to happen, below is *how* it wil happen but it doesnt actually implement yet! we need to.. 
users.virtual('acl',{
  ref:'roles',
  localField:'role',
  foreignField:'role',
  justOne:true,
});
// tell mongo when we pull a record to do this work for us by using pre findone... but then we need to get it into mong. 

users.pre('findOne', function(){
  try{
    this.populate('acl');
  }
  catch(e){
    throw new Error(e.message);
  }
});
//now go to mw to authenticate

// const badlist = new mongoose.Schema({
//   jti:{type:String, required:true}
// })

// we had this but this isn't a good place for it.
// const capabilities ={
//   admin: ['create', 'read', 'update', 'delete'],
//   editor:['create', 'read', 'update'],
//   user: ['read']
// }



// new method called "can" capability @7:10pm
users.methods.can = function(capability){
  console.log('the capability user can is...',this.acl.capabilities);
  // return true;
  return this.acl.capabilities.includes(capability);
};

let blacklist = [];

users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(console.error);
});

// users.statics.createFromOauth = function(email) {

//   if(! email) { return Promise.reject('Validation Error'); }

//   return this.findOne( {email} )
//     .then(user => {
//       if( !user ) { throw new Error('User Not Found'); }
//       console.log('Welcome Back', user.username);
//       return user;
//     })
//     .catch( error => {
//       console.log('Creating new user');
//       let username = email;
//       let password = 'none';
//       return this.create({username, password, email});
//     });

// };

//statics methods are for higher order, they are class methods that run at module level, more like helper functions whereas methods methods can be acting upon invidivual instances, statics cannot
users.statics.authenticateToken = function(token){
  let parsedToken = jwt.verify(token, process.env.SECRET);
  console.log('PARSED TOKEN',parsedToken.jti);

  // console.log('🙅🏻‍♀️blakclist', blacklist);
  if (blacklist.includes(parsedToken.jti)){
    throw 'invalid token!!!';
  }
  blacklist.push(parsedToken.jti);
// mongo likes its queries to be inside of objects
  let query = {_id:parsedToken.id};
  // this this is the module, class.


  return this.findOne(query);
};

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

// // new method called "can" capability MOVED TO TOP
// users.methods.can = function(capability){
//   return true;
// };

users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

users.methods.generateToken = function() {
  console.log('🙅🏻‍♀️blakclist', blacklist);

  let token = {
    id: this._id,
    role: this.role,
    exp: Math.floor(Date.now() / 1000) + (60*15),
    // capabilities: this.acl.capabilities,
    jti: uuid()
  };
  
  console.log('signature 🐸',jwt.sign);

  users.jti = token.jti;
  console.log('👾',users.jti);
  // blacklist.push(token.jti);
  
  return jwt.sign(token, process.env.SECRET);
};

module.exports = mongoose.model('users', users);
