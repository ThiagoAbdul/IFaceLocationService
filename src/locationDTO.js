function locationDTO(entity){
    return {
        userId: entity.userId,
        houseNumber: entity.house_number,
        road: entity.road,
        suburb: entity.suburb,
        city: entity.city,
        municipality: entity.municipality,
        county: entity.county,
        state: entity.state,
        region: entity.region,
        postcode: entity.postcode,
        country: entity.country,
        date: entity.date,
    }
}

module.exports = locationDTO