const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const agentSchema = mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
    auto: true
  },
  role:{
    type:String,
    required:true
  },
  agentId: {
    type: String,
    required: true,
    unique: true
  },
  doId: {
    type: String,
    required: true

  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  Maritial: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  DOB: {
    type: String,
    required: true
  },
  DOA: {
    type: String,

  },
  mobile: {
    type: Number,
    required: true,
    unique: true
  },
  whatsapp: {
    type: Number,
    required: true,

  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  postoffice:{
    type:String,

  },
  district:{
    type:String,

  },
  profilePic: {
    type: String,

  },
  category: {
    type: String,
    required: true,
    enum: ['BEGINNER', 'INTERMEDIATE', 'STAR']
  },
  // status: {
  //   type: String,
  //   required: true,
  //   enum: ['NEW', 'APPROVE', 'DENY']
  // },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

agentSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

agentSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

agentSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

agentSchema.statics.findByCredentials = async (email, password) => {
  const user = await Agent.findOne({ email })
  console.log(user);

  if (!user) {
      throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
      throw new Error('Unable to login')
  }

  return user
}
// Hash the plain text password before saving
agentSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
