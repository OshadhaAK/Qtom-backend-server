require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors());
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Connected to Database'))

app.use(express.json())

const productsAndServicesRouter = require('./routes/productsandservices.js')
app.use('/productsandservices', productsAndServicesRouter)

const industriesRouter = require('./routes/industries.js')
app.use('/industries', industriesRouter)

const galleryRouter = require('./routes/gallery.js')
app.use('/gallery', galleryRouter)

app.listen(3000, () => console.log('Server Started'))