const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const orderMiddleware = require('../middlewares/orders.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const orderController = require('../controllers/orders.controller');

const router = express.Router();
router.use(authMiddleware.protect);

router
  .route('/')
  .post(
    validationMiddleware.createOrderValidation,
    orderController.createOrder
  );

router.route('/me').get(orderController.findAllOrders);

router
  .route('/:id')

  .patch(
    orderMiddleware.validOrder,
    authMiddleware.protectAccountOwner,
    orderController.updateOrder
  )
  .delete(
    orderMiddleware.validOrder,
    authMiddleware.protectAccountOwner,
    orderController.deleteOrder
  );

module.exports = router;
