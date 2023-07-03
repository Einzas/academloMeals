require('dotenv').config();

const { db } = require('./database/config');

const app = require('./app');
const initModels = require('./models/initModels');

db.authenticate()
  .then(() => {
    console.log('Database connected 😀');
  })
  .catch((err) => {
    console.log('Error connecting to database 😞', err);
  });
initModels();
db.sync({
  force: false,
})
  .then(() => {
    console.log('Database synced 😁');
  })
  .catch((err) => {
    console.log('Error syncing database 😞', err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🚀`);
});
