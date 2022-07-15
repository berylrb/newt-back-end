import mongoose from 'mongoose'

const Schema = mongoose.Schema

const extraSchema = new Schema({
  isFree: Boolean,
  materialsNeeded: Boolean,
}, {
  timestamps: true
})

const activitySchema = new mongoose.Schema({
  activity: String,
  accessibility: Number,
  type: String,
  price: Number,
  participants: Number,
  key: number,
  extras: [extraSchema]
},{
  timestamps: true,
})

const Activity = mongoose.model('Activity', activitySchema)

export { Activity }