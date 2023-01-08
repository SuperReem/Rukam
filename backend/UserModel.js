const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({ //add f name &l name
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  resetLink: {
    data: String,
    default: '',
  }
})




// static signup method
userSchema.statics.signup = async function(email, password, userType) {

    // validation
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }
  
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password: hash , userType})
  
    return user
  }

  
  
  userSchema.statics.login = async function(email, password) {
  
    if (!email || !password) {
      throw Error('يرجى تعبئة المطلوب!')
    }

  
    const user = await this.findOne({ email })
    const match = await bcrypt.compare(password, user.password)
   
    if (!match || !user ) {
        throw Error('البريد الإلكتروني، أو كلمة المرور خاطئة، يرجى المحاولة مجددا!')
    }
  
    return user
  }
  
  module.exports = mongoose.model('User', userSchema)