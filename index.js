
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const LoadDb = require('./src/helpers/loadDb')

// Syncing all the models at once.
conn.sync({ force: true })
  .then(async () => {
    server.listen(PORT, () => {
      LoadDb();
      console.log(`Listening at port ${PORT}`);
    })
  })
  .catch((err) => {
    console.log(err.message);
    console.log(`No se ha podido conectar a la BBDD`);
  });