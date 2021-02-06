const mongoose = require('mongoose');
const company =  require('./company.js');
const ie = new mongoose.Schema({name:{type:String},role:{type:String},experience:{type:String} ,
company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'} ,
approved:{type:Boolean,default:false} ,
branch:{type:String,default:'CS'},year:{type:Number,default:1}});
const experience = mongoose.model('Interview' , ie);
module.exports = experience;
