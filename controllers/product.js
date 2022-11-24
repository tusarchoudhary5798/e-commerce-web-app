const Product = require('../models/product');


exports.create = async (req, res) => {
        const newProduct = new Product({
            ...req.body
        });
        await newProduct.save();
        return res.status(200).json({ success: true, data: newProduct });
};

exports.getAll = async (req, res) => {
    const productsPromise = Product.find()

    const countPromise = Product.countDocuments();
    const [products, count] = await Promise.all([productsPromise, countPromise]);
    return res.status(200).json({
        success: true,
        data: products,
        count,
    });
};

exports.getSingle = async (req, res) => {
    const query = { _id: req.params.id };
    const product = await Product.findOne(query).exec();
    if (!product) {
        return res.status(400).json({
            success: false,
            errors: { message: 'product not found' }
        });
    }
    return res.status(200).json({ success: true, data: product });
};

exports.delete = async (req, res) => {
    const query = { _id: req.params.id };
    const deletedProduct = await Product.findOneAndDelete(query);
    return res.status(200).json({ success: true });
};

exports.update = async (req, res) => {
        const body = req.body;
        const query = { _id: req.params.id };
        const updatedProduct = await Product.findOneAndUpdate(query, body, {
            new: true,
            runValidators: true
        });
        return res.status(200).json({ success: true, data: updatedProduct });
    // }
};

