import { Router } from 'express'
const router = Router()
import * as flightsCtrl from "../controllers/flights.js"

/* GET users listing. */

router.get("/new", flightsCtrl.new)

router.get('/', flightsCtrl.index)
                            //this will be red if not defined function in controllers


export {
  router
}
