require('dotenv').config({ path: __dirname + '/.env' })
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 4000;

const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const sellerRoute = require('./routes/seller');

require('./db');

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
require('./utils/passport');

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/sellers', sellerRoute);
app.use('/api/v1/products', productRoute);


app.listen(port, () => {
	console.log('Server is up and running on port', port);
})