const express = require('express')
const router = express.Router()
const ProductandService = require('../models/productandservice')

router.get('/', async (req, res) => {
    try{
        const productandservice = await ProductandService.find()
        res.send(productandservice)
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getProductAndService, (req, res) => {
    res.json(res.productandservice)
})

router.post('/', async (req, res) => {
    const productandservice = new ProductandService({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    })
    try{
        const newProductAndService = await productandservice.save()
        res.status(201).json(newProductAndService)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id',getProductAndService, async (req, res) => {
    if(req.body.name != null) {
        res.productandservice.name = req.body.name
    }
    if(req.body.description != null) {
        res.productandservice.description = req.body.description
    }
    if(req.body.image != null) {
        res.productandservice.image = req.body.image
    }
    try {
        const updatedProductAndService = await res.productandservice.save()
        res.json({ message: "Updated Product or Service" })
    }catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id',getProductAndService, async (req, res) => {
    try {
        await res.productandservice.remove()
        res.json({ message: "Deleted Product or Service" })
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getProductAndService(req, res, next) {
    let productandservice
    try {
        productandservice = await ProductandService.findById(req.params.id)
        if (productandservice == null) {
            return res.status(404).json({ message: "Cannot find Product or Service" })
        }
    }catch (err) {
            return res.status(500).json({ message: err.message })
    }

    res.productandservice = productandservice
    next()
}
module.exports = router