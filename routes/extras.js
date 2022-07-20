import { Router } from "express";
import * as extrasCtrl from '../controllers/extras.js'


const router = Router()

router.post('/', checkAuth, extrasCtrl.create)

export { router }