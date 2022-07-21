import { Router } from 'express'
import * as activitiesCtrl from '../controllers/apiActivities.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

router.use(decodeUserFromToken)
router.post('/:activityId/comments', checkAuth, activitiesCtrl.createComment)
router.get('/:key/comments', checkAuth, activitiesCtrl.findCommentsByKey)

export { router }