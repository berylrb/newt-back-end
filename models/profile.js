import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userActivitySchema = new Schema({
  activity: String,
  type: String,
  price: Number,
  participants: Number
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  userActivity: [userActivitySchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
