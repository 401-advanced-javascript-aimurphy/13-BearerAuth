# LAB - 13

## Bearer Authorization

### Author: Ai

### Links and Resources
* [submission PR](https://github.com/401-advanced-javascript-aimurphy/13-BearerAuth/pull/6https://github.com/401-advanced-javascript-aimurphy/13-BearerAuth/pull/6)
* [[![Build Status](https://travis-ci.com/401-advanced-javascript-aimurphy/13-BearerAuth.svg?branch=master)](https://travis-ci.com/401-advanced-javascript-aimurphy/13-BearerAuth)
* [back-end]
* [front-end]

#### Documentation
* [api docs](http://xyz.com) (API servers)
* [jsdoc](http://xyz.com) (Server assignments)

### Modules
#### `users-model` `roles-model`
##### Exported Values and Methods

### Setup
#### `.env` requirements
* `PORT` - :3000
* `MONGODB_URI` - mongodb://localhost:27017/auth

#### Running the app
signing up users:
`echo '{"username":"<name>", "password":"<password>", "role":"editor"}'| http post :3000/signup`

basic sign-in:
`http post :3000/signin -a <name>:<password>`

authenticated sign-in:
`http post :3000/signin "authorization:bearer header.payload.signature"`

adding roles to db:
`echo '{"role":"<role title>", "capabilities":["<capability>","<capability>","<capability>"]}'| http post :3000/roles`

testing the general auth capability:
`http :3000/hidden-stuff "authorization:bearer header.payload.signature"`

testing the read capability:
`http :3000/some-thing-to-read "authorization:bearer header.payload.signature"`

testing the create capability:
`http post :3000/create-a-thing "authorization:bearer header.payload.signature"`

testing the update capability:
`http put :3000/update "authorization:bearer header.payload.signature"`

testing the patch capability:
`http patch :3000/jp "authorization:bearer header.payload.signature"`

testing the delete capability:
`http delete :3000/bye-bye "authorization:bearer header.payload.signature"`

testing the capability:
`http :3000/everything "authorization:bearer header.payload.signature"`
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events
