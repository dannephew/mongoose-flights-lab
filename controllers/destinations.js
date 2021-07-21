import { Destination } from "../models/destination.js"

export {
    newDestination as new,
    create,
}

function newDestination(req, res) {
    Destination.find({}, function (err, destinations) {
        console.log("newDestination", destinations)
        res.render("destinations/new", {
            title: "Add Destination", 
            destinations: destinations,
        })
    })
}

function create(req, res) {
    console.log("CREATE FUNCTION CALLED")
    Destination.create(req.body, function(err, destination) {
        console.log("CREATE FUNCTION CALLED")
        console.log("create function", destination)
        res.redirect("/destinations/new")
    })
}