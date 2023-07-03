const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const User = require('../models/user.model');

exports.validRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findOne({
    where: {
      id: id,
      status: 'active',
    },
    include: [
      {
        model: Review,
        attributes: ['comment', 'rating'],
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
          },
        ],
      },
    ],
  });
  if (!restaurant) {
    return next(new AppError('Restaurant not found! 🧨', 404));
  }
  req.restaurant = restaurant;
  next();
});
