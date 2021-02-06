const mongoose= require('mongoose');
const topicSchema= new mongoose.Schema({name:{type:String}});
const topics = mongoose.model('Topics',topicSchema);
module.exports = topics;
