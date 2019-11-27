const express = require('express')
const router = express.Router()
const Gallery = require('../models/gallery')

router.get('/', async (req, res) => {
    
    try{
        const gallery = await Gallery.find()
        res.send(gallery)
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getGallery, (req, res) => {
    
    res.json(res.gallery)
})

router.post('/', async (req, res) => {
    const gallery = new Gallery({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    })
    try{
        const newGallery = await gallery.save()
        res.status(201).json(newGallery)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id',getGallery, async (req, res) => {
    if(req.body.name != null) {
        res.gallery.name = req.body.name
    }
    if(req.body.description != null) {
        res.gallery.description = req.body.description
    }
    if(req.body.image != null) {
        res.gallery.image = req.body.image
    }
    try {
        const gallery = await res.gallery.save()
        res.json({ message: "Updated gallery" })
    }catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id',getGallery, async (req, res) => {
    try {
        await res.gallery.remove()
        res.json({ message: "Deleted gallery" })
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getGallery(req, res, next) {
    let gallery
    try {
        gallery = await Gallery.findById(req.params.id)
        if (gallery == null) {
            return res.status(404).json({ message: "Cannot find gallery" })
        }
    }catch (err) {
            return res.status(500).json({ message: err.message })
    }

    res.gallery = gallery
    next()
}
module.exports = router