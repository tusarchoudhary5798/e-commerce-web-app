const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		full_name : String,
        phone_number: String,
        otp: {
            type: Number,
            default: null
        },
        profile_photo: String,
        locations: Array,
        email: String,
        password: String,
        cart : Array,
        role: {
            type: String,
            enum : ["user", "admin", "super_admin"]
        },
		api_key: {
			type : String
		},
		
		activate_date: {
			type: Date,
		},
		activation_status: {
			type: Boolean,
			default: true
		},	
	},
  	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);