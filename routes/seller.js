const express = require("express");
const router = express.Router();

// Import controllers
const sellerController = require("../controllers/seller");



// seller Routes
router.post("/addSeller", sellerController.create);
router.get("/getAllSeller", (sellerController.getAll));
router.get("/getSingleSeller/:id", (sellerController.getSingle));
router.put("/updateSeller/:id", sellerController.update);
router.delete("/deleteSeller/:id", sellerController.delete);



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