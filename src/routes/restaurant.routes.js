const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const reviewMiddleware = require('../middlewares/review.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const restaurantController = require('../controllers/restaurants.controller');
const reviewController = require('../controllers/reviews.controller');

const router = express.Router();

router
  .route('/')
  .get(restaurantController.findAllRestaurants)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    validationMiddleware.createRestaurantValidation,
    restaurantController.createRestaurant
  );

router
  .route('/reviews/:id')
  .post(
    authMiddleware.protect,
    restaurantMiddleware.validRestaurant,
    validationMiddleware.createReviewValidation,
    reviewController.createReview
  );

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    authMiddleware.protect,
    reviewMiddleware.validReview,
    authMiddleware.protectAccountOwner,
    validationMiddleware.updateReviewValidation,
    reviewController.updateReview
  )
  .delete(
    authMiddleware.protect,
    reviewMiddleware.validReview,
    authMiddleware.protectAccountOwner,
    reviewController.deleteReview
  );

router
  .route('/:id')
  .get(
    restaurantMiddleware.validRestaurant,
    restaurantController.findRestaurant
  )
  .patch(
    authMiddleware.protect,
    restaurantMiddleware.validRestaurant,
    authMiddleware.restrictTo('admin'),
    validationMiddleware.updateRestaurantValidation,
    restaurantController.updateRestaurant
  )
  .delete(
    authMiddleware.protect,
    restaurantMiddleware.validRestaurant,
    authMiddleware.restrictTo('admin'),
    restaurantController.deleteRestaurant
  );

module.exports = router;
