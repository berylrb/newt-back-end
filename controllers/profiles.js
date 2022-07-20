import { Profile } from '../models/profile.js'
import { Activity } from '../models/activity.js'
import { v2 as cloudinary } from 'cloudinary'


// --- show community page ---
function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}


// --- show profile page --- 
function show(req, res) {
  Profile.findById(req.params.id)
  .populate('activities')
  .then(profile => {
    res.json(profile)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)
  })
}

// --- create userActivity on profile ---
function create(req, res){
  req.body.owner = req.user.profile
  Profile.findById(req.params.id)
  .populate('activities')
  .then(profile => {
    profile.userActivity.push(req.body)
    profile.save()
    .then(() =>{
      res.json(profile)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

// --- add api activities to profile ---
async function add(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    const activity = await Activity.create(req.body)
    profile.activities.push(activity)
    await profile.save()
    res.json(activity)
  } catch(err) {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  }
}

// --- delete userActivity from profile ---
function deleteOne(req, res) {
  console.log('back end delete')
	Profile.findById(req.user.profile)
  .populate('activities')
		.then(profile => {
		profile.userActivity.remove({ _id: req.params.userActivityId })
		profile.save()
			.then(profile => {
				res.json(profile)
			})
		})
		.catch(err => {
      console.log(err)
      res.status(500).json({err: err.errmsg})
    })
	}

  // -- update userActivity from profile ---
  function update(req, res) {
    console.log('req bodyyy', req.body)
    Profile.findById(req.user.profile)
      .then(profile => {
      const userActivity = profile.userActivity.id(req.params.userActivityId)
      console.log('user activity for hunter', userActivity)
      userActivity.activity = req.body.activity
      userActivity.type = req.body.type
      userActivity.price = req.body.price
      userActivity.participants = req.body.participants
      profile.save()
        .then(profile => {
          res.json(profile)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({err: err.errmsg})
      })
    }



    // -- update api activitiy to include company schema --
    // function updateWantCompany(req, res) {
    //   console.log('req body check', req.body)
    //   Profile.findById(req.user.profile)
    //     .then(profile => {
    //       const wantCompany = profile.wantCompany.id(req.params.wantCompanyId)
    //       console.log('want Company check', wantComapny)
    //       wantCompany.openToCompany = req.body.openToCompany
    //       profile.save() 
    //         .then(profile => {
    //         res.json(profile)
    //       })
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       res.status(500).json({err: err.errmsg})
    //     })
    // }



// --- add photo on sign up ---
function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${profile.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export { 
  index,
  create,
  addPhoto,
  show,
  deleteOne as delete,
  add,
  update,
  // updateWantCompany
}

