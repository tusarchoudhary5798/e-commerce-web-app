const Seller = require('../models/seller');
const Product = require('../models/product');
const Order = require('../models/order');


exports.create = async (req, res) => {
   
    const newOrder = new Order({
        ...req.body
    });
    let products = []
    let total_price = 0
    for (index = 0; index < req.body.products.length; index++) {
        const query = { _id: req.body.products[index] };
        const product = await Product.findOne(query).exec();
        if (product) {
            total_price += product.price
            products.push({
                product_id: product._id,
                product_name: product.title,
                price: product.price
            })
        }
    }
    newOrder["products"] = products
    newOrder["total_price"] = total_price
    let seller = {}
    let sellerQuery = { _id: req.body.seller }
    const sellerResult = await Seller.findOne(sellerQuery).exec();
    if (sellerResult) {
        seller = {
            seller_id: sellerResult._id,
            shop_name: sellerResult.shop_name,
            address: sellerResult.address
        }
    }
    newOrder['seller'] = seller
    await newOrder.save();
    return res.status(200).json({ success: true, data: newOrder });
    // }
};

exports.getAll = async (req, res) => {
    const ordersPromise = Order.find()

    const countPromise = Order.countDocuments();
    const [orders, count] = await Promise.all([ordersPromise, countPromise]);
    return res.status(200).json({
        success: true,
        data: orders,
        count,
    });
};

exports.getSingle = async (req, res) => {
    const query = { _id: req.params.id };
    const order = await Order.findOne(query).exec();
    if (!order) {
        return res.status(400).json({
            success: false,
            errors: { message: 'order not found' }
        });
    }
    return res.status(200).json({ success: true, data: order });
};

exports.delete = async (req, res) => {
    const query = { _id: req.params.id };
    const deletedOrder = await Order.findOneAndDelete(query);
    return res.status(200).json({ success: true });
};

exports.update = async (req, res) => {
    const body = req.body;
    const query = { _id: req.params.id };
    let products = []
    let total_price = 0
    for (index = 0; index < body.products.length; index++) {
        const query = { _id: body.products[index] };
        const product = await Product.findOne(query).exec();
        if (product) {
            total_price += product.price
            products.push({
                product_id: product._id,
                product_name: product.title,
                price: product.price
            })
        }
    }
    body["total_price"] = total_price
    body["products"] = products
    const updatedOrder = await Order.findOneAndUpdate(query, body, {
        new: true,
        runValidators: true
    });
    return res.status(200).json({ success: true, data: updatedOrder });
    
};

