'use strict';

const User = require('./users-model.js');

// this middle ware is now curried because we changed it to have the (capability) parameter

module.exports = (capability) => {
  return (req, res, next) => {

    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);

      console.log('authType', authType);//bearer or basic
      console.log('authString', authString);//token or string

      //this is the strategy pattern
      switch (authType.toLowerCase()) {
        case 'basic':
          return _authBasic(authString);
        case 'bearer':
          return _authBearer(authString);
        default:
          return _authError();
      }
    }
    catch (e) {
      next(e);
    }


    function _authBearer(authString) {
      console.log('do the bear auth with ', authString);
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(next);

    }

    function _authBasic(str) {
      // str: am9objpqb2hubnk=
      let base64Buffer = Buffer.from(str, 'base64'); // <Buffer 01 02 ...>
      let bufferString = base64Buffer.toString();    // john:mysecret
      let [username, password] = bufferString.split(':'); // john='john'; mysecret='mysecret']
      let auth = { username, password }; // { username:'john', password:'mysecret' }

      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(next);
    }
    // now our _auth(user) needs also to take in a capability 
    //(user && (!capability ||(user.can(capability))))
    // can also be nested: 
    // if(user){ 
    //   if(!capability ||(user.can(capability))) 
    // }
    function _authenticate(user) {
      if (user && (!capability || (user.can(capability)))) {
        req.user = user;
        console.log('👋authenitcate user', user);
        req.token = user.generateToken();
        console.log('💛', req.token.jti);
        next();
      }
      else {
        _authError();
      }
    }

    function _authError() {
      next('Invalid User ID/Password');
    }

  };

};