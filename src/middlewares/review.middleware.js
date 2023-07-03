const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review.model');
const User = require('../models/user.model');

exports.validReview = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;
  const review = await Review.findOne({
    where: {
      id: id,
      restaurantId: restaurantId,
      status: 'active',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });
  if (!review) {
    return next(new AppError('Review not found! 🧨', 404));
  }
  req.user = review.user;
  req.review = review;
  next();
});
