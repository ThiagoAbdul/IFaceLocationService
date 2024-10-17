require('dotenv').config()
const express = require('express');
const locationService = require("./locationService")

const app = express()
const port = 9000

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.send('Healthy')
})

app.get('/api/user/:id/last', async (req, res) => {
    const id = req.params.id
    try{
        const location = await locationService.getLastLocation(id)
        res.json(location)
    }
    catch{
        return res.status(500).send({message: "Unexpected Error"})
    }
})

app.get('/api/user/:id', async (req, res) => {
    const id = req.params.id
    try{
        const location = await locationService.getLastLocations(id)
        res.json(location)
    }
    catch{
        return res.status(500).send({message: "Unexpected Error"})
    }
})

app.post('/api', async (req, res) => {
    const { userId, lat, lon } = req.body
    if(!userId || !lat || !lon)
        res.status(400).json({ message: "Incorrect body" })
    try{
        const location = await locationService.saveLocation({ userId, lat, lon })
        res.status(201).json(location)
    }
    catch{
        return res.status(500).send({message: "Unexpected Error"})
    }
})
  

const db = require('./db')

db.setup()
    .then(() => {
        app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
        })
    })
    .catch(console.log)
