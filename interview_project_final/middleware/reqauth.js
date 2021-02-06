const jwt = require('jsonwebtoken');
const User = require('../models/user.js')
const validator =(req,res,next) => {
const cook = req.cookies.jwt;
if(cook)
{
   jwt.verify(cook,'secret-key',(err,dec) => {
     if(err)
     {console.log(err);
     res.redirect('/login');}
    else
    {
    next();
    }


   });

}
else
{res.redirect('/login'); }
}
const checkuser =  (req,res,next) => {
const cook = req.cookies.jwt;
if(cook)
{
   jwt.verify(cook,'secret-key',async (err,dec) => {
     if(err)
     {console.log(err);
       res.locals.user=null;
     next();}
    else
    {const userid= await User.findById(dec.id)
      res.locals.user=userid;

    next();
    }


   });

}
else
{res.locals.user=null;
next(); }
}
module.exports = {validator,checkuser} ;
