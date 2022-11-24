const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
	{
		title: String,
        quantity: String,
        description: Object,
        price: Number,
        images: [String],
	},
  	{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);