const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');

exports.validMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      id: id,
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['name', 'address'],
      },
    ],
  });
  if (!meal) {
    return next(new AppError('Meal not found! 🧨', 404));
  }
  req.meal = meal;
  next();
});
