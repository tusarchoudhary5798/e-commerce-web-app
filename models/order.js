const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    product_name: String,
    price: Number
})

const SellerSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seller'
    },
    shop_name: String,
    address: String

})

const OrderSchema = new Schema(
	{
		user_id : {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        seller: SellerSchema,
        order_status: {
            type: String,
            enum: ["delievered", "on the way", "order placed", "order cancelled"]
        },
        total_price: Number,
        delievery_date: Date,
        products: [ProductsSchema],
        payment_method: {
            type: String,
            enum: ["cash", "online_payment"]
        },
        payment_status: {
            type: String,
            enum : ["paid", "due", "refunded"]
        },
		total_price: Number
	},
  	{ timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);