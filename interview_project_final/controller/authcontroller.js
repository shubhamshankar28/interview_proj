const user = require('../models/user.js');
const jwt = require('jsonwebtoken')
const time = 3*24*60*60;
const createtoken = (id) =>  {return jwt.sign({id} , 'secret-key',{expiresIn:time});}

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };
if(err.message==='incorrect password')
{errors.password=err.message;
return errors;}
if(err.message==='incorrect email')
{errors.email=err.message;
return errors;}

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}
module.exports.signup_get = (req , res)=> {res.render('authenticate/signup');}
module.exports.signup_post = async (req , res)=> {

  const {email,password} = req.body;
  try {
  const  x = await user.create(req.body);
  const token = createtoken(x._id);
  console.log(token);
  res.cookie('token',token,{maxAge:time*1000,httpOnly:true});
  res.json({user:x._id});
}
catch (err)
{const errors = handleErrors(err);
    res.status(400).json({ errors });
}

  }
module.exports.login_get = (req , res)=> {res.render('authenticate/login');}
module.exports.login_post = async (req , res)=> {
  const {email,password} = req.body;
  try
  {
    const us = await user.login(email,password);
    const token = createtoken(us._id);

    res.cookie('jwt',token,{maxAge:time*1000,httpOnly:true});
    res.status(201).json({user:us._id});

  }
  catch (err)
  {const errors = handleErrors(err);
  res.status(400).json({errors});
  }
  }
module.exports.logout_get = (req,res) => {
res.cookie('jwt','',{maxAge:1});
res.redirect('/');
}
