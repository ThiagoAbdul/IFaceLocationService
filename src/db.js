const mongoose = require('mongoose');

async function setup(){
    await mongoose.connect(process.env.DB_URL);

}

const schema = new mongoose.Schema({}, { strict: false })

const UserLocation = new mongoose.model("UserLocation", schema)

module.exports = { setup, UserLocation }