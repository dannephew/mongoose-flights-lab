import { Router } from 'express'
const router = Router()
import * as flightsCtrl from "../controllers/flights.js"

// const router=Router()
/* GET users listing. */

//return view to add a new flight
router.get("/new", flightsCtrl.new)

//go back to the list of flights
router.get('/', flightsCtrl.index)
                            //this will be red if not defined function in controllers

router.post("/", flightsCtrl.create)

router.get("/:id", flightsCtrl.show)

router.post("/:id/tickets", flightsCtrl.createTicket)
  //don't forget /:
    //otherwise, will get 404 error 

export {
  router
}
