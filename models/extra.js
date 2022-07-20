import mongoose from "mongoose";

const Schema = mongoose.Schema

const extraSchema = new Schema({
  isFree: {type: Boolean},
  materialsNeeded: {type: Boolean}
}, {
  timestamps: true
})

const Extra = mongoose.model('Extra', extraSchema)

export { Extra }