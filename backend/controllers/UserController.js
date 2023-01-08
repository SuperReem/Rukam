const User = require('../UserModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')//??
const jwt = require('jsonwebtoken')
const _ = require("lodash")
// not used?
// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandboxa12f1d4a4b1744efa070140c0cb9580d.mailgun.org';
// const api_key= "a6702073f79d8b505c14c3d0585c5acd-cc9b2d04-e5cac54c" ;
// const mg = mailgun({apiKey: api_key, domain: DOMAIN});
/////
// var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/requireAuth");
const { TbBrandGmail } = require('react-icons/tb')

const keysecret = "process.env.SECRET"




const createToken = (_id) => {
    return jwt.sign({_id}, "process.env.SECRET", { expiresIn: '3d' })
  }



// email config
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:'deemmf0@gmail.com', //process.env.EMAIL,
      pass:'Dd123123@'//process.env.PASSWORD
  }
}) 



// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: 'البريد الإلكتروني، أو كلمة المرور خاطئة، يرجى المحاولة مجددا!'})
    }
  }

// signup a user
const signupUser = async (req, res) => {
  const {email, password, userType} = req.body

  try {
    const user = await User.signup(email, password, userType)
    // create a token
    const token = createToken(user._id)

    res.status(200).json({email,userType, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const forgotPassword = async(req,res)=>{
  console.log(req.body)

  const {email} = req.body;

  if(!email){
    console.log("not a user")

      res.status(401).json({status:401,message:"Enter Your Email"})
  }

  try {
      const userfind = await User.findOne({email:email});

      console.log('user founded')

      // token generate for reset password
      const token = jwt.sign({_id:userfind._id},keysecret,{
          expiresIn:"6m"
      });
      
      
      const setusertoken = await User.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


      if(setusertoken){
          const mailOptions = {
              from:'deemmf0@gmail.com',
              to:email,
              subject:"Sending Email For password Reset",
              text:`This Link Valid For 5 MINUTES http://localhost:3001/resetPassword/${userfind.id}/${setusertoken.verifytoken}`
          }

          transporter.sendMail(mailOptions,(error,info)=>{
              if(error){
                  console.log("error not send",error);
                  res.status(401).json({status:401,message:"email not send"})
              }else{
                  console.log("Email sent",info.response);
                  res.status(201).json({status:201,message:"Email sent Succsfully"})
              }
          })

      }

  } catch (error) {
      res.status(401).json({status:401,message:"invalid user"})
  }

}



const resetPassword = async(req,res)=>{
  const {id,token} = req.params;

  try {
      const validuser = await User.findOne({_id:id,verifytoken:token});
      
      const verifyToken = jwt.verify(token,keysecret);

      console.log(verifyToken)

      if(validuser && verifyToken._id){
          res.status(201).json({status:201,validuser})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

  } catch (error) {
      res.status(401).json({status:401,error})
  }
}


const changePassword = async(req,res)=>{
  const {id,token} = req.params;

  const {password} = req.body;

  try {
      const validuser = await User.findOne({_id:id,verifytoken:token});
      
      const verifyToken = jwt.verify(token,keysecret);

      if(validuser && verifyToken._id){
          const newpassword = await bcrypt.hash(password,12);

          const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
}





// const forgotPassword = async (req, res) => {
//   const {email} = req.body;
//   consol.log(req.body);

//   User.findOne({ email }, (err, user) => {
//     if(err || !user){
//       return res.status(400).json({error: error.message})

//     }
//     const token = createToken(user._id)
//     const data = {
//       from: 'Rukam@NoReplay.com',
//       to: email,
//       subject: 'Reset Password',
//       text: 'Testing some Mailgun awesomness!',
//       html: ' <h> please click to reset <h/> <p>http://localhost:3000/resetpassword/${token}<p/>',

//     };

//     return user.updateOne({resetLink: token}, function(err, success){
//       if(err || !user){
//         console.log("error sending email");
//         return res.status(400).json({error: error.message})
  
//       }else{
//         mg.messages().send(data, function (error, body) {
//           if(err ){
//             return res.json({error: error.message})
//           }
          
//           console.log(body);
//           return res.json({message: "Email has been sent"})
//         });


//       }

//     });

//   })



// }


// const resetPassword = async (req, res) => {
//   const {resetLink, newPass } = req.body;

//   if(resetLink){
//     jwt.verify(resetLink, "process.env.SECRET",function(error , decodedData) {
//       if(error ){
//         return res.json({error: error.message})
//       }
//       User.findOne({ resetLink }, async (err, success) =>{
//         if(err || !user){
//           return res.status(400).json({error: error.message})
    
//         }

//        const salt = await bcrypt.genSalt(10)
//        const hash = await bcrypt.hash(newPass, salt)
  
//         const obj ={
//           password: hash,
//           resetLink: ''
//         }

//         user = _.extend(user, obj);
//         user.save((error, result)=> {
//           if(err || !user){
//             return res.status(400).json({error: error.message})
      
//           }else{
//               console.log(body);
//               return res.status(200).json({message: "Email has been sent"})
//             }});
//        })

//       })

  
//   }else{
//       return res.status(401).json({error: error.message})
//   }
// }


module.exports = { signupUser, loginUser , forgotPassword, resetPassword, changePassword}