'use strict';

const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
  role:{type:String, required:true},
  capabilities:{type:Array, required: true}
});


//to make schema we need to do a virtual table and extra rules to let it do



module.exports = mongoose.model('roles',rolesSchema);