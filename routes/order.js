const express = require("express");
const router = express.Router();

// Import controllers
const orderController = require("../controllers/order");



// order Routes
router.post("/addOrder", orderController.create);
router.get("/getAllOrder", (orderController.getAll));
router.get("/getSingleOrder/:id", (orderController.getSingle));
router.put("/updateOrder/:id", orderController.update);
router.delete("/deleteOrder/:id", orderController.delete);



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