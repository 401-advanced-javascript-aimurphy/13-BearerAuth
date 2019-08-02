# LAB - 13

## Bearer Authorization

### Author: Ai

### Links and Resources
* [submission PR](http://xyz.com)
* [travis](http://xyz.com)
* [back-end](http://xyz.com) heroku
* [front-end](http://xyz.com) (when applicable)

#### Documentation
* [api docs](http://xyz.com) (API servers)
* [jsdoc](http://xyz.com) (Server assignments)
* [styleguide](http://xyz.com) (React assignments)

### Modules
#### `modulename.js`
##### Exported Values and Methods

###### `foo(thing) -> string`
Usage Notes or examples

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

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
