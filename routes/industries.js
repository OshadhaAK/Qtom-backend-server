const express = require('express')
const router = express.Router()
const Industry = require('../models/industry')

router.get('/', async (req, res) => {
    
    console.log("getall")
    try{
        const industry = await Industry.find()
        res.send(industry)
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getIndustry, (req, res) => {
    
    res.json(res.industry)
})

router.post('/', async (req, res) => {
    const industry = new Industry({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    })
    try{
        const newIndustry = await industry.save()
        res.status(201).json(newIndustry)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id',getIndustry, async (req, res) => {
    
    console.log("patch")
    if(req.body.name != null) {
        res.industry.name = req.body.name
    }
    if(req.body.description != null) {
        res.industry.description = req.body.description
    }
    if(req.body.image != null) {
        res.industry.image = req.body.image
    }
    try {
        const industry = await res.industry.save()
        res.json({ message: "Updated Industry" })
    }catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id',getIndustry, async (req, res) => {
    
    try {
        await res.industry.remove()
        res.json({ message: "Deleted Industry" })
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getIndustry(req, res, next) {
    let industry
    try {
        industry = await Industry.findById(req.params.id)
        if (industry == null) {
            return res.status(404).json({ message: "Cannot find Industry" })
        }
    }catch (err) {
            return res.status(500).json({ message: err.message })
    }

    res.industry = industry
    next()
}
module.exports = router