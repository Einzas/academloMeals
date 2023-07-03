const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const mealMiddleware = require('../middlewares/meal.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const mealController = require('../controllers/meals.controller');

const router = express.Router();

router.route('/').get(mealController.findAllMeals);

router.route('/:id').get(mealMiddleware.validMeal, mealController.findMeal);

router
  .use(authMiddleware.protect, authMiddleware.restrictTo('admin'))

  .route('/:id')
  .post(validationMiddleware.createMealValidation, mealController.createMeal)
  .patch(
    mealMiddleware.validMeal,
    validationMiddleware.updateMealValidation,
    mealController.updateMeal
  )
  .delete(mealMiddleware.validMeal, mealController.deleteMeal);

module.exports = router;
