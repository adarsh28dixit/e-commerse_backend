import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            brand: {type: String},
            description: {type: String},
            qty: {type: Number},
            image: {type: String},
            new_price: {type: Number},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            }
        }
       

    ],
    shippingAddress: {
        fullName: {type: String},
        email: {type: String},
        phone: {type: String},
        address: {type: String},
        city: {type: String},
        postalcode: {type: String},
        country: {type: String},
    },
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String,
    },
    paymentMethod: {type: String},
    
    totalPrice: {type: Number},
    createdAt: {type: Date, default:Date.now()},
    updatedAt: {type: Date, default:Date.now()},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date},
});

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;