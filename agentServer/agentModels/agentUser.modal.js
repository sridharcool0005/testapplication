// const mongoose = require('mongoose')
// const validator = require('validator');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// // const Task = require('./task')

// const agentUserSchema = new mongoose.Schema({
//   agentId: {
//     type: String
//   },
//   doId: {
//     type: String,
//     required: true,
//     unique: true,

//   },
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     Maritial: {
//       type: String,
//       required: true
//     },
//     gender: {
//       type: String,
//       required: true
//     },

//     DOB: {
//       type: Date,
//       required: true
//     },
//     DOA: {
//       type: Date,
//       required: true
//     },
//     mobile: {
//       type: Number,
//       required: true,
//       unique: true
//     },
//     whatsapp: {
//       type: Number,
//       required: true,
//       unique: true
//     },
//     address1: {
//       type: String,
//       required: true
//     },
//     address2: {
//       type: String,
//       required: true
//     },
//     city: {
//       type: String,
//       required: true
//     },
//     state: {
//       type: String,
//       required: true
//     },
//     pincode: {
//       type: Number,
//       required: true
//     },
//     profilePic: {
//       type: String
//     },
//     status: {
//       type: String,
//       enum: ['NEW', 'APPROVE', 'DENY']
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password cannot contain "password"')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a postive number')
//             }
//         }
//     }
// },
// {
//   collection : 'agents'
// })

// // agentUserSchema.virtual('tasks', {
// //     ref: 'Task',
// //     localField: '_id',
// //     foreignField: 'owner'
// // })

// // agentUserSchema.methods.toJSON = function () {
// //     const user = this
// //     const userObject = user.toObject()

// //     delete userObject.password
// //     delete userObject.tokens

// //     return userObject
// // }

// // agentUserSchema.methods.generateAuthToken = async function () {
// //     const user = this
// //     const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

// //     user.tokens = user.tokens.concat({ token })
// //     await user.save()

// //     return token
// // }

// agentUserSchema.statics.findByCredentials = async (email, password) => {
//     const user = await Agentln.findOne({ email })
//     console.log(user);

//     if (!user) {
//         throw new Error('Unable to login')
//     }

//     const isMatch = await compare(password, user.password)

//     if (!isMatch) {
//         throw new Error('Unable to login')
//     }

//     return user
// }

// // Hash the plain text password before saving
// agentUserSchema.pre('save', async function (next) {
//     const user = this

//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }

//     next()
// })

// const Agentln = mongoose.model('Agentln', agentUserSchema)

// module.exports = Agentln
