const express = require('express');
//express app
const app = express();
const user = require('./models/user.js');
const topic = require('./models/topics.js');
const question =require('./models/questions.js');
const experience = require('./models/interview_exp.js');
const company  =  require('./models/company.js');
const mongoose = require('mongoose');
const router = require('./routes/authroutes.js');
const mainroutes = require('./routes/mainroutes.js');
const cookie = require('cookie-parser');
const valid = require('./middleware/reqauth.js');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
AdminBro.registerAdapter(AdminBroMongoose);


const dburl = 'mongodb+srv://shubham:test1234@nodejs.9deck.mongodb.net/node-auth?retryWrites=true&w=majority'

mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true}).then((result) => { //listen only when connection is established

 const adminBro = new AdminBro({
   databases: [],
   rootPath: '/admin',
     resources: [user,topic,question,experience,company],
 })
 const router1 = AdminBroExpress.buildRouter(adminBro);
 app.use(adminBro.options.rootPath, router1)
app.listen(3000);
 }).catch((err) =>{console.log(err);});






//set static files in public directory


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookie());

//setting the view engine

const morgan = require('morgan');
app.set('view engine' , 'ejs');
//listen for requests at port number 3000

//Middle ware usually refers to the code that runs on the server between a request and a response
app.use(express.urlencoded());
app.use(morgan('dev'));
app.get('*',valid.checkuser);
app.get('/',(req,res) =>
              {res.redirect('/topics');});
app.get('/purpose' ,valid.validator, (req,res) => {res.render('authenticate/purpose.ejs');});
app.use(router);
app.use(mainroutes);
/*
SETTING COOKIES
app.get('/set-cookie',(req,res) =>
                      {// Way -1
                        //res.setHeader('Set-Cookie','newuser=true');
                        //Way-2
                        res.cookie('newuser','false');
                        res.cookie('isemployee' , 'true',{maxAge:1000*60*60,httpOnly:true});
                    res.send("cookie set");});
GETTING COOKIES
app.get('/get-cookie',(req,res) => {
                                    const cookie = req.cookies;
                                  res.json(cookie);});
*/
