const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
const { promisify } = require("util");
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { randomBytes } = require("crypto");
const APP_SECRET = "mySecret"

exports.userRegister = async (req, res) => {
   
   let errors = {}
   const user = await User.findOne({'email': req.body.email});
   if (user) {
       errors.message = 'Email already exists';
       return res.status(400).json({ success: false, errors });
   } else {
       const newUser = new User({
           email: req.body.email,
           password: req.body.password,
           full_name: req.body.full_name,
           role: req.body.role,
           otp: null,
           is_verified: false
       });
       newUser.password = await bcrypt.hash(newUser.password, 10);
       const emailVerificationToken = await createHash();
       newUser['email_verification_token'] = emailVerificationToken;
       await newUser.save();

       const token = jwt.sign({
           id: newUser._id,
           email: newUser.email,
           role: newUser.role,
           full_name: newUser.full_name,
       },
           APP_SECRET
       ); 
       return res.status(200).json({ success: true, token: `Bearer ${token}` });
   }
};

exports.userLogin = async (req, res) => {
	let errors = {};
	const { email, password } = req.body;
	// Check if user exists
	
	const user = await User.findOne({'email': {'$regex': `^${email}$`, $options:'i'}});
	if (!user) {
		errors.message = 'User not found';
		return res.status(400).json({ success: false, errors });
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		errors.message = 'Password incorrect';
		return res.status(400).json({ success: false, errors });
	}
	const token = jwt.sign({
		id: user.id,
		email: user.email,
		full_name: user.full_name,
		role: user.role
	},
		APP_SECRET,
		{ expiresIn: '7d' }
	);

	return res.status(200).json({ 
		success: true, 
		token: `Bearer ${token}` 
	});
};

async function createHash() {
	const randomBytesPromise = promisify(randomBytes);
	// 20 is the byte we want to hash, This can be any number
	const hash = (await randomBytesPromise(20)).toString("hex");
	return hash;
};

