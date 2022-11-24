const Seller = require('../models/seller');
const Product = require('../models/product');


exports.create = async (req, res) => {

    const newSeller = new Seller({
        ...req.body
    });
    let products = []
    for (index = 0; index < req.body.products.length; index++) {
        const query = { _id: req.body.products[index] };
        const product = await Product.findOne(query).exec();
        if (product) {
            products.push({
                product_id: product._id,
                product_name: product.title,
                price: product.price
            })
        }
    }
    newSeller["products"] = products
    await newSeller.save();
    return res.status(200).json({ success: true, data: newSeller });
};

exports.getAll = async (req, res) => {
    const sellersPromise = Seller.find()

    const countPromise = Seller.countDocuments();
    const [sellers, count] = await Promise.all([sellersPromise, countPromise]);
    return res.status(200).json({
        success: true,
        data: sellers,
        count,
    });
};

exports.getSingle = async (req, res) => {
    const query = { _id: req.params.id };
    const seller = await Seller.findOne(query).exec();
    if (!seller) {
        return res.status(400).json({
            success: false,
            errors: { message: 'seller not found' }
        });
    }
    return res.status(200).json({ success: true, data: seller });
};

exports.delete = async (req, res) => {
    const query = { _id: req.params.id };
    const deletedSeller = await Seller.findOneAndDelete(query);
    return res.status(200).json({ success: true });
};

exports.update = async (req, res) => {
   
    const body = req.body;
    const query = { _id: req.params.id };
    let products = []
    for (index = 0; index < body.products.length; index++) {
        const query = { _id: body.products[index] };
        const product = await Product.findOne(query).exec();
        if (product) {
            products.push({
                product_id: product._id,
                product_name: product.title,
                price: product.price
            })
        }
    }
    body["products"] = products
    const updatedSeller = await Seller.findOneAndUpdate(query, body, {
        new: true,
        runValidators: true
    });
    return res.status(200).json({ success: true, data: updatedSeller });
};

