import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userActivitySchema = new Schema({
  activity: String,
  type: String,
  price: String,
  participants: Number
}, {
  timestamps: true
})

const wantCompanySchema = new Schema({
  openToCompany: Boolean
})

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  userActivity: [userActivitySchema],
  wantCompany: [wantCompanySchema],
  photo: { type: String },
  // apiCollectedActivities: [{ type: Schema.Types.ObjectId, ref: "ApiCollectedActivities" }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
