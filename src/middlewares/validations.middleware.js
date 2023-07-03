const { body, validationResult } = require('express-validator');

const validField = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Must be a valid email!'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters long!'),
  validField,
];

exports.UpdateUserValidation = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Must be a valid email!'),
  validField,
];

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('address').notEmpty().withMessage('Address is required!'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required!')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5!'),
  validField,
];

exports.updateRestaurantValidation = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('address').notEmpty().withMessage('Address is required!'),

  validField,
];

exports.createReviewValidation = [
  body('comment').notEmpty().withMessage('Comment is required!'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required!')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5!'),
  validField,
];

exports.updateReviewValidation = [
  body('comment').notEmpty().withMessage('Comment is required!'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required!')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5!'),
  validField,
];

exports.createMealValidation = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('price').notEmpty().withMessage('Price is required!'),
  validField,
];

exports.updateMealValidation = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('price').notEmpty().withMessage('Price is required!'),
  validField,
];

exports.createOrderValidation = [
  body('mealId').notEmpty().withMessage('MealId is required!'),
  body('quantity').notEmpty().withMessage('Quantity is required!'),
  validField,
];

exports.loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Must be a valid email!'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters long!'),
  validField,
];
