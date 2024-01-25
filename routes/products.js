import express from "express"
import { getAllProducts, getProductById, deleteProductById, addProducts, updateProducts } from "../helper.js";
import { auth } from "../middleware/auth.js"

const router = express.Router()//express router


router.get('/', async (req, res) => {
    const { category, rating } = req.query
    console.log(req.query, category)
    if (req.query.rating) {
        req.query.rating = +req.query.rating
    }
    const product = await getAllProducts(req)
    res.send(product);
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.params, id)
        const product = await getProductById(id)
        console.log(product)
        product ? res.send(product) : res.status(404).send({ message: "No Product Found" })
        console.log("console log method")
        console.error("console error method")
        // var a = 10 / 0;
        // console.log(a)
    } catch (error) {
        console.log("Error", error)
        res.status(500).send({ message: "Internal Server Error" })
    }
})
//delete product

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    const product = await deleteProductById(id)
    console.log(product)
    res.send(product)
})

//add products => 11:15
router.post('/', async (req, res) => {
    //where do we pass data 
    const newProduct = req.body
    console.log(newProduct)
    const result = await addProducts(newProduct)
    res.send(result)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    //where do we pass data 
    const updatedProduct = req.body
    const result = await updateProducts(id, updatedProduct)
    res.send(result)
})


export const productsRoute = router