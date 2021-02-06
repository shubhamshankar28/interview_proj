const topic = require("../models/topics.js");
const question = require("../models/questions.js");
const experience = require("../models/interview_exp.js");
const company = require("../models/company.js");
const admins = require("../admins.js");
const viewtopic = async (req,res) =>{
  const result = await topic.find();
  console.log(res.locals);
res.render('main/topic.ejs',{b:result});

}
const viewquestion = async (req,res) => {
const id= req.params.id;
l1 = await question.find({topic:id,approved:true});
res.render('main/question.ejs' , {list:l1});

}
const viewexperience = async(req,res) => {
  const list = await company.find();
  res.render('main/viewexp.ejs' , {list:list});
}
const viewspefexperience = async (req,res) => {
  const id = req.params.id;
  const list = await experience.find({company:id});
  res.render('main/viewspefexp.ejs' , {list:list});
}


const addexperience = async (req,res) => {
  const list = await company.find();
res.render('main/addexp.ejs',{list:list}); }
const postexperience = (req,res) =>
{ const c1  = req.body.company;
  company.find({name:c1}).then((result)=>{
    dict = {name:req.body.name,role:req.body.role,company:result[0]._id,experience:req.body.experience,branch:req.body.branch,year:req.body.year};
    const exp = new experience(dict);
  exp.save().then((result) => {res.redirect('/');}).catch((err)=>{console.log(err)});
}).catch((err) =>{  res.redirect('/');
  console.log(err);})


}
const addq = async (req,res) => {
  const topics = await topic.find() ;
  res.render('main/addq.ejs' , {topic:topics});
}
const addqpost =  (req,res) =>
{

  topic.find({name:req.body.topic}).then((result) =>
{const t1=result;
  const name= req.body.name;
  const desc3 = req.body.description;

  const link = req.body.link;

  const dict = {name:name,topic:t1[0]._id,description:desc3,link:link}

  const q1 = question(dict);

  q1.save().then((result) => {
    console.log(result);
    res.redirect('/topics')}).catch((err) => {console.log("the error is " , err);});
}).catch((err)=> {console.log(err);
  res.redirect('/')
});


}
const getadmin = (req,res) =>
{ if(res.locals.user!=null)
  { var flag=0;
      const s1=res.locals.user.email;
      for(var i=0; i<admins.list.length;++i)
      if(admins.list[i]==s1)
      flag=1;
      if(flag)
    res.render('main/getadmin.ejs');
    else
    res.render('main/error.ejs');
  }
else
res.redirect('/');}

module.exports = {viewtopic,viewquestion,viewexperience,addexperience,postexperience,addq,addqpost,viewspefexperience,getadmin};
