const express = require("express");
const router = express.Router();

// Import controllers
const productController = require("../controllers/product");



// product Routes
router.post("/addProduct", productController.create);
router.get("/getAllProduct", (productController.getAll));
router.get("/getSingleProduct/:id", (productController.getSingle));
router.put("/updateProduct/:id", productController.update);
router.delete("/deleteProduct/:id", productController.delete);



exports.errorHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch((err) => {
		console.log(err);
		res.status(400).send({ 
			success: false, 
			errors: { message: err.message } 
		});
	});
};

// Export Router
module.exports = router;