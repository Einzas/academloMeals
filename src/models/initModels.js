const User = require('./user.model');
const Review = require('./review.model');
const Restaurant = require('./restaurant.model');
const Meal = require('./meal.model');
const Order = require('./order.model');

const initModels = () => {
  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User, { foreignKey: 'userId' });

  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  Meal.hasOne(Order, { foreignKey: 'mealId' });
  Order.belongsTo(Meal, { foreignKey: 'mealId' });
};

module.exports = initModels;
