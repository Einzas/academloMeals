const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const User = require('../models/user.model');

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
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

  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    restaurants,
  });
});

exports.findRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;
  const updatedRestaurant = await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    status: 'success',
    restaurant: updatedRestaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted successfully!',
  });
});
