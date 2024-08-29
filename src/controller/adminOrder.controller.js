const orderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const placeOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.orderPlaced(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const confirmOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.orderConfirmed(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shippedOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.orderShipped(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliverOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.orderDelieverd(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.orderCancelled(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deletOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  placeOrder,
  shippedOrder,
  confirmOrder,
  deliverOrder,
  cancelOrder,
  deleteOrder,
};
