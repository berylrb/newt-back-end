import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', profilesCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.delete('/userActivity/:userActivityId', checkAuth, profilesCtrl.delete)
router.get('/:id', checkAuth, profilesCtrl.show)
router.post('/:id/userActivities', checkAuth, profilesCtrl.create)
// router.get('/', checkAuth, profilesCtrl.index)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.post('/:id/activities', checkAuth, profilesCtrl.add)

export { router }