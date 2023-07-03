const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');
const User = require('../models/user.model');

exports.validOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });
  if (!order) {
    return next(new AppError('Order not found! 🧨', 404));
  }
  req.order = order;
  req.user = order.user;
  next();
});
