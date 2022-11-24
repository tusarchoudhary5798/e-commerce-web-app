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

const SellerSchema = new Schema(
	{
		shop_name : String,
        owner_name: String,
        phone_number: String,
        products: [ProductsSchema],
        address: String,
        email: String,
        id_proof: String
	},
  	{ timestamps: true }
);

module.exports = mongoose.model('Seller', SellerSchema);