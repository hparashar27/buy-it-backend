const razorpay = require("../config/razorpayClient");
const orderService = require("./order.service");

const createPaymentLink = async (orderId) => {
    try {
        const order = await orderService.findOrderById(orderId);

        const paymentLinkRequest = {
            amount: order.discount * 100,
            currency: 'INR',
            customer: {
                name: order.user.firstName + " " + order.user.lastName,
                // contact: order.user.mobile,
                email: order.user.email,
            },
            notify: {
                email: true,
                sms: true,
            },
            reminder_enable: true,
            callback_url: `https://buy-it-tawny.vercel.app/payment/${orderId}`,
            callback_method: 'get'
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        };

        return resData;  // Make sure to return this data
    } catch (error) {
        throw new Error(`Failed to create payment link: ${error.message}`);
    }
};

const updatePaymentInformation = async (reqData) => {
    const orderId = reqData.order_id;
    const paymentId = reqData.payment_id;
    try {
        const order = await orderService.findOrderById(orderId);
        const payment = await razorpayInstance.payments.fetch(paymentId);

        if (payment.status === "captured") {
            order.paymentId = paymentId;
            order.paymentStatus = "COMPLETED";
            order.orderStatus = "PLACED";

            await order.save();
        }

        const resData = {
            message: "Your payment is completed and order is placed",
            success: true
        };

        return resData;  // Return the response data
    } catch (error) {
        throw new Error(`Failed to update payment information: ${error.message}`);
    }
};

module.exports = {
    createPaymentLink,
    updatePaymentInformation
};
