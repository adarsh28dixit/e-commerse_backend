import express from 'express';
import Products from '../models/productModel.js';

const productRouter = express.Router();

productRouter.post('/product', (req, res) => {
    const dbproduct = req.body;
    Products.create(dbproduct, (err, data) => {
        if(err){
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

productRouter.get('/product', (req, res) => {
    
    Products.find((err, data) => {
        if(err){
            res.send(err)
        } else {
            res.send(data)
        }
    })
})
productRouter.get('/product/:id', (req, res) => {
    const product_by_id = req.params.id;
    Products.findById(product_by_id, (err, data) => {
        if(err){
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

export default productRouter;