const mongoose =require('mongoose');
const cs = new mongoose.Schema({name:{type:String},link:{type:String}});
const company  = mongoose.model('Company' , cs );
module.exports = company;
