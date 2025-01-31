const locationDTO = require("./locationDTO.js")

const UserLocation = require("./db").UserLocation

async function getAddress(latitude, longitude){
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    const res = await fetch(url)

    const json = await res.json()
    
    return json.address
}

async function saveLocation({ userId, lat, lon }){
    try{
        const address = await getAddress(lat, lon)
        const now = new Date()
        const location = new UserLocation({userId, ...address, date: now})
        await location.save()
        return locationDTO(location)
    }
    catch(error){
        console.log(error)
        return null
    }

}

async function getLastLocation(userId){
    const location = await UserLocation.findOne({ userId }).sort("-date").limit(1).exec()
    return locationDTO(location)
}

async function getLastLocations(userId){
    const locations = await UserLocation.find({ userId}).sort("-date").limit(20).exec()
    return locations.map(x => locationDTO(x)).filter(x => x)
}



module.exports = {
    saveLocation, 
    getLastLocation,
    getLastLocations
}