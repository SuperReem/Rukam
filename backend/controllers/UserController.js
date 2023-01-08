const User = require('../UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const _ = require("lodash")
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox5615c7d636d24f22983241fdb0c95ffe.mailgun.org';
const api_key= "d3518a8a2b0e8d2d0ba0ec2cf4323f62-cc9b2d04-bac13ae3" ;
const mg = mailgun({apiKey: api_key, domain: DOMAIN});
/////

const createToken = (_id) => {
    return jwt.sign({_id}, "process.env.SECRET", { expiresIn: '3d' })
  }


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


const forgotPassword = async (req, res) => {
  const {email} = req.body;
  console.log(req.body);


  
  User.findOne({ email }, (err, user) => {
    if(err || !user){
      return res.status(400).json({error: 'email dose not exist'})

    }
    const token = createToken(user._id)
    const data = {
      from: 'deemmf0@gmail.com',
      to: email,
      subject: 'Reset Password ',
      text: 'Testing some Mailgun awesomness! ',
      html: token// '<h> please click to reset <h/> <p>http://localhost:3000/resetpassword/${token}<p/>',

    };
    console.log("token")
    console.log(token)



    return user.updateOne({resetLink: token}, function(err, success){
      if(err || !user){
        console.log("error sending email");
        return res.status(400).json({error: 'reset password error '})
  
      }else{
        mg.messages().send(data, function (error, body) {
          console.log(body);
          if(err ){
            return res.json({error: error.message})
          }
          
          console.log(body);
          return res.json({message: "Email has been sent"})
        });
      }
    })
  })


}
const resetPassword = async (req, res) => {
  const {resetLink, newPass } = req.body; // confpassword
  console.log(req.body);

  if(resetLink){
    jwt.verify(resetLink, "process.env.SECRET",function(error , decodedData) {
      if(error ){
        console.log("error jwt");
        return res.json({error: error.message})
      }
      User.findOne({ resetLink }, async (err, user) =>{
        if(err || !user){
          console.log("errpr no user");
          return res.status(400).json({error: "error.message}"})
    
        }

       const salt = await bcrypt.genSalt(10)
       const hash = await bcrypt.hash(newPass, salt)
  
        const obj ={
          password: hash,
          resetLink: ''
        }

        user = _.extend(user, obj);
        user.save((error, result)=> {
          if(error || !user){
            console.log(body);
            return res.status(400).json({error: error.message})
      
          }else{
              console.log('changed ');
              return res.status(200).json({message: "changed has been changed"})
            }});
       })

      })
  }else{
      return res.status(401).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, forgotPassword, resetPassword}