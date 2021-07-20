import { Flight } from '../models/flight.js'

export{
    newFlight as new, 
    index, 
    create,
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
      res.redirect('/flights')
    }, {
        timestamps: true
    })
    console.log("flight", flight)
    // res.redirect("/flights")  
  }
  
