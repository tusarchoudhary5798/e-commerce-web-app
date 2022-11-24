const express = require("express");
const router = express.Router();

// Import controllers
const authController = require("../controllers/auth");



// Auth Routes
router.post("/loginUser", authController.userLogin);
router.post("/registerUser", (authController.userRegister));

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