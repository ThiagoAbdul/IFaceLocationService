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
        return location
    }
    catch(error){
        console.log(error)
        return null
    }

}

async function getLastLocation(userId){
    console.log(userId)
    const location = await UserLocation.find({ userId: 7 }).sort("-date").limit(1).exec()

    return location.shift()
}

async function getLastLocations(userId){
    console.log(userId)
    const location = await UserLocation.find({ userId: 7 }).sort("-date").limit(20).exec()
    return location
}

async function getLastLocationsByDate(userId,  date){
    console.log(userId)
    const location = await UserLocation.find({ userId: 7, date: date }).sort("-date").exec()
    return location
}

module.exports = {
    saveLocation, 
    getLastLocation,
    getLastLocations
}