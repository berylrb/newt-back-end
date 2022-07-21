import { Activity } from '../models/activity.js'
import { Profile } from '../models/profile.js'


function createComment(req, res){
  Activity.findById(req.params.id)
  .then(activity => {
    Profile.findById(req.user.profile)
    .then(profile => {
      req.body.author = profile.name
      activity.comments.push(req.body)
      activity.save()
      .then(updatedActivity => res.json(updatedActivity))
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}


function findCommentsByKey(req, res){
  Activity.find({key: req.params.key})
  .then(activity => res.json(activity))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export {
  createComment,
  findCommentsByKey
}