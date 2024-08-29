const paymentService = require("../services/payment.service");

const createPaymentLink = async (req, res) => {
    try {
        const createdPaymentLinkData = await paymentService.createPaymentLink(req.params.id);
        return res.status(200).json(createdPaymentLinkData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updatePaymentInformation = async (req, res) => {
    try {
        const updatePaymentInformationData = await paymentService.updatePaymentInformation(req.query);
        return res.status(200).json({
            message: "Payment information is updated",
            success: true,
            data: updatePaymentInformationData,  // Include data if the service returns it
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPaymentLink,
    updatePaymentInformation
};
