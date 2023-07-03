const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user.model');

const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    role: role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, status: 'active' } });

  if (!user) next(new AppError('User with that email not found!', 401));

  if (!(await bcrypt.compare(password, user.password)))
    next(new AppError('Invalid email or password', 401));

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(204).json({
    status: 'success',
    message: 'User deleted successfully!',
  });
});

exports.findAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [
      {
        model: User,
        attributes: ['name', 'email'],
      },
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['name', 'address', 'rating'],
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.findOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id },
    attributes: ['quantity', 'totalPrice', 'status'],
    include: [
      {
        model: User,
        attributes: ['name', 'email'],
      },
      {
        model: Meal,
        attributes: ['name', 'price'],
        include: [
          {
            model: Restaurant,
            attributes: ['name', 'address', 'rating'],
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    order,
  });
});
