import mongoose from "mongoose"

export{
    Flight
}

//mongoose.Schema class
const Schema = mongoose.Schema

//A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc


const ticketSchema = new Schema({
    seat: {
        type: String, 
        match: /[A-F][1-9]\d?/
    },
    price: {
        type: Number,
        min: 0
    }
  }, {
    timestamps: true
  })

const oneYear = 365 * 24 * 60 * 60 * 1000

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ["American", "Southwest", "United"],
    },
    airport: {
        type: String,
        enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
        default: "DEN"     
    },
    flightNo: {
        type: Number, 
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            return new Date(Date.now() + oneYear)
        }
    },
    tickets: [ticketSchema], 
    destination: [{
        type: Schema.Types.ObjectId,
        ref: "Destination"
        // ref: which model to reference
    }]
})

//Compile schema into a model and export it
const Flight = mongoose.model("Flight", flightSchema)

