import { Flight } from '../models/flight.js'
import { Destination } from "../models/destination.js"

export{
    newFlight as new, 
    index, 
    create,
    show, 
    createTicket, 
    addToFlightDestinations, 
    deleteFlight as delete,
}

function newFlight(req, res) {
    res.render("flights/new", {
        title: "Add Flight"
    })
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render("flights/index", {
            err: err,
            flights: flights, 
            title: "All Flights"
        })
    })
}

 // Create a flight using mongoose
 function create(req, res) {
     console.log(req.body)
     //for defaults: 
     for (let key in req.body) {
        if (req.body[key] === '' || req.body[key] === null || req.body[key] === []) delete req.body[key]
      }
    // Create a flight using mongoose
    const flight = new Flight(req.body)
    flight.save(function(err) {
      if (err) return res.redirect('/flights')
      // Redirect back to flight create page (/flights/new)
      res.redirect(`/flights/${flight._id}`)
    }, {
        timestamps: true
    })
    console.log("flight", flight)
    // res.redirect("/flights")  
  }
  
  function show(req,res){
    Flight.findById(req.params.id).
    populate('destination').exec(function(err, flight){
        Destination.find({_id: {$nin: flight.destination}}, function(err, destinations){
            console.log("SHOW FUNCTION flight", flight.destination)
            res.render('flights/show', {
            title: 'Flight Detail',
            flight: flight,
            destinations: destinations
        })
        
        })
    })
}

function createTicket(req, res) {
    console.log("Creating ticket")
    Flight.findById(req.params.id, function(err, flight) {
        console.log("Tickets: ", flight.tickets)
        flight.tickets.push(req.body)
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

function addToFlightDestinations(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destination.push(req.body.destinationId)
        flight.save(function(err) {
          res.redirect(`/flights/${flight._id}`)
        })
      })
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, function(err, flight) {
        res.redirect("/flights")
    })
}