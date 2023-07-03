const Review = require('../models/review.model');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const { rating, comment } = req.body;
  const { restaurant, sessionUser } = req;

  const review = await Review.create({
    rating,
    comment,
    restaurantId: restaurant.id,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'success',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { rating, comment } = req.body;
  const { review } = req;

  const updatedReview = await review.update({
    rating,
    comment,
  });

  res.status(200).json({
    status: 'success',
    review: updatedReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
    message: 'Review deleted successfully!',
  });
});
