const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;
  const meal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: 'success',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  const updatedMeal = await meal.update({
    name,
    price,
  });

  res.status(200).json({
    status: 'success',
    meal: updatedMeal,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'Meal deleted successfully!',
  });
});

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
        attributes: ['name', 'address'],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});

exports.findMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  res.status(200).json({
    status: 'success',
    meal,
  });
});
