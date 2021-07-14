import { Flight } from '../models/flight.js'

export{
    newFlight as new, 
    index, 
    create,
}

function newFlight(req, res) {
    res.render("flights/new")
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render("flights/index", function(err, flights) {
            flights
        })
    })
}

 // Create a flight using mongoose
 function create(req, res) {
    // Fix nowShowing Boolean
    req.body.nowShowing = !!req.body.nowShowing
    // Fix incoming cast string => array
    if (req.body.cast) {
      // Remove whitespace next to commas
      req.body.cast = req.body.cast.replace(', ', ',')
      // Split the string into an array at the comma
      req.body.cast = req.body.cast.split(',')
    }
    // Create a flight using mongoose
    const flight = new Flight(req.body)
    flight.save(function(err) {
      if (err) return res.redirect('/flights/new')
      // Redirect back to flight create page (/flights/new)
      res.redirect('/flights')
    }, {
        timestamps: true
    })  
  }
  