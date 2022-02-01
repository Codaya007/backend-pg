
const server = require('./src/app.js');
const { PORT } = process.env;
const { conn } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: true })
  .then(async () => {

    try {
      // AÑADO LOS PAISES
      let response = await getAllCountriesAPI();

      if (response.error) {
        throw new Error(response.error);
      } else {
        let countriesMaped = response.countries.map((country) => {
          return {
            id: country.cca3.toUpperCase(),
            nombre: country.name.common,
            imagen_bandera: country.flags ? country.flags[1] : 'https://www.barcelonabeta.org/sites/default/files/2018-04/default-image_0.png',
            continente: country.continents ? country.continents[0] : "Desconocido",
            capital: country.capital ? country.capital.toString() : "Desconocida",
            subregion: country.subregion,
            area: country.area,
            poblacion: country.population
          };
        });

        // ya que tengo cada país con los datos que necesito, procedo a guardarlos en la DB
        await Country.bulkCreate(countriesMaped, { validate: true });
      }

      // AÑADO LAS ACTIVIDADES
      activities.map(activity => createActivity(activity));

    } catch (err) {
      console.log(err);
      console.log('No ha sido posible inicializar la BD')
    } finally {
      server.listen(PORT, () => {
        console.log(`Listening at port ${PORT}`); // eslint-disable-line no-console
      })
    }
  })
  .catch((err) => {
    console.log(err.message);
    console.log(`No se ha podido conectar a la BBDD`);
  });

// ID (Código de 3 letras) => cca3
// nombre       => name.common
// bandera img  => flags.png
// Continente   => continents
// Capital      => capital
// Subregión    => subregion
// Área         => area
// Población    => population