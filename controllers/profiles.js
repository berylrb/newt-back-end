import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function show(req,res){
  Profile.findById(req.body.user)
  .then(profile => res.json(profile._id))
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)
  })
}

function create(req, res){
  req.body.owner = req.user.profile
  createUserActivity.create(req.body)
  .then(userActivity => {
    userActivity.findById(userActivity._id)
    .populate('owner')
    .then(populatedUserActivity => {
      res.json(populatedUserActivity)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export { 
  index,
  show,
}
