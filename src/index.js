require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send({ message: 'Welcome to the ecommerce API', status: true });
});

const authRouters = require('./routes/auth.route');
app.use("/auth", authRouters);

const userRouters = require('./routes/user.route');
app.use('/api/users', userRouters);

const productRouters = require("./routes/product.route");
app.use('/api/products',productRouters);

const adminProductRouters = require("./routes/adminProduct.route");
app.use('/api/admin/products',adminProductRouters);

const adminOrderRouters = require("./routes/adminOrder.route");
app.use('/api/admin/orders',adminOrderRouters);

const orderRouters = require("./routes/order.route");
app.use('/api/orders',orderRouters);

const cartRouters = require("./routes/cart.route");
app.use('/api/cart',cartRouters );

const cartItemRouters = require("./routes/cartItem.route");
app.use('/api/cart_items',cartItemRouters );

const ratingRouters = require("./routes/rating.route");
app.use('/api/ratings',ratingRouters);

const reviewRouters = require("./routes/review.route");
app.use('/api/reviews',reviewRouters);

const paymentRouters = require("./routes/payment.route");
app.use("/api/payments",paymentRouters)

module.exports = app;
