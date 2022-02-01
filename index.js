
const server = require('./src/app.js');
const { PORT } = process.env;
const { conn } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: true })
  .then(async () => {

    server.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    })
  })
  .catch((err) => {
    console.log(err.message);
    console.log(`No se ha podido conectar a la BBDD`);
  });