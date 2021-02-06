const mongoose= require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const schema = new mongoose.Schema({email :{type:String,
                                          required:[true,'please enter an email'],
                                          unique:true,
                                          lowercase:true,
                                          validate:[ isEmail , 'please enter a valid email']} ,
                                  password :{type:String,
                                            required:[true,'please enter a password'],
                                          minlength:[6,'password should have more than 6 characters']}});
//Hash the password before storing
schema.pre('save' , async function (next)
{const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password,salt);
next();
})
/*
schema.post('save', (doc,next) => {
                                  console.log("user has been created ", doc);
                                next();});
*/
schema.statics.login = async function(email,password)
                                          {
                                            const user = await this.findOne({email:email});
                                            if(user)
                                            {const val = await bcrypt.compare(password,user.password);
                                            if(val)
                                            return user;
                                            throw Error('incorrect password');}
                                            throw Error('incorrect email');
                                          }
const user = mongoose.model('user' , schema);
module.exports = user;
