const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const userController = require('../controllers/users.controller');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  userController.signup
);

router.post(
  '/login',
  validationMiddleware.loginValidation,
  userController.login
);
router.use(authMiddleware.protect);

router.route('/orders').get(userController.findAllOrders);
router.route('/orders/:id').get(userController.findOrder);

router
  .route('/:id')
  .patch(
    userMiddleware.validUser,
    validationMiddleware.UpdateUserValidation,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = router;
