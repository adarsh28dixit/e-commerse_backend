import express from 'express'
import Orders from '../models/orderModel.js'
import { isAuth } from '../utils.js';
import Razorpay from 'razorpay';

const orderRouter = express.Router();

orderRouter.get('/total-orders', async(req, res) => {
    Orders.find((err, data) => {
        if(err){
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

orderRouter.get('/get-razorpay-key', (req, res) => {
    res.send({
        key: "rzp_test_BogFWhNGiUT1zt"
    });
});



orderRouter.post('/create-order', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_BogFWhNGiUT1zt",
      key_secret: "pwOa88jwZBYqHhI3tsLc4dpc",
    });
    const options = {
      amount: req.body.amount,
      currency: 'INR',
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send('Some error occured');
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

orderRouter.post('/pay-order', async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Orders({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
orderRouter.get('/:id',  async(req, res) => {
    const order = await Orders.findById(req.params.id);
    if(order){
        res.send(order)
    } else {
        res.status(404).send({message: 'order not found'})
    }
});

export default orderRouter;