const User = require('../UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const _ = require("lodash")

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rukamservice@gmail.com',
    pass: 'touqpppwtplohuum'
  }
});

const createToken = (_id) => {
    return jwt.sign({_id}, 'process.env.SECRET', { expiresIn: '3d' })
  }


// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body
 


    try {
      const user = await User.login(email, password)
      console.log("logged in ");
      const userType = user.userType
      console.log(userType);
      const fullName = user.fullName
      const region = user.region




  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email,userType, token, fullName , region})///
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
    const name = user.fullName
    const token = createToken(user._id)
    const link =  "http://localhost:3000/resetpassword/"+token
  
    var mailOptions = {
      from: 'rukamservice@gmail.com',
      to: email,
      subject: 'إعادة تعيين كلمة المرور',
      html: '<html dir="rtl" lang="ar"> <h1 dir="rtl">هل نسيت كلمة المرور؟</h1><p dir="rtl">  مرحبًا '+name+',</p> <p dir="rtl">لإعادة تعيين كلمة المرور لحسابك، يرجى الضغط على الرابط التالي: </p> <center><a className="text-decoration-none" href="'+link+'"> <mark>تغيير كلمة المرور </mark> </a></center> <br/> <br/><p dir="rtl">تجاهل هذه الرسالة إذا لم تطلب تغيير كلمة المرور. </p>  <br/>  <P>فريق ركام</P></html> '+token
    };
    console.log("token")
    console.log(token)



    return user.updateOne({resetLink: token}, function(err, success){
      if(err || !user){
        console.log("error sending email");
        return res.status(400).json({error: 'reset password error '})
  
      }else{

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

      }
    })
  })


}
const resetPassword = async (req, res) => {
  const {resetLink, newPass } = req.body; // confpassword
  console.log(req.body);

  if(resetLink){
    jwt.verify(resetLink, 'process.env.SECRET', function(error , decodedData) {
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
            console.log("body");
            console.log("body has not changed ");

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