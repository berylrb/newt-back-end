import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/:id/userActivities', checkAuth, profilesCtrl.create)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
