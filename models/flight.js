import mongoose from "mongoose"

export{
    Flight
}

//mongoose.Schema class
const Schema = mongoose.Schema

//A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc

const flightSchema = new Schema({
    airline: String,
    airport: String,
    flightNo: Number,
    departs: Date
})

//Compile schema into a model and export it
const Flight = mongoose.model("Flight", flightSchema)

