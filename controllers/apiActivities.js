import { Activity } from '../models/activity.js'
import { Profile } from '../models/profile.js'


function createComment(req, res){
  console.log(req.params, 'params')
  Activity.findById(req.params.activityId)
  .then(activity => {
    console.log('activity', activity)
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
  Activity.findOne({key: req.params.key})
  .then(activity => {
    // const data = activity[0]
    res.json(activity)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export {
  createComment,
  findCommentsByKey
}