import { Profile } from '../models/profile.js'

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

export { 
  index,
  show,
}
