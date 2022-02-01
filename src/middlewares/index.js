module.exports = {
   errorHandler: require('./errorHandler'),
   error404: require('./error404'),
   getCountryAndActivityById: require('./getCountryAndActivityById'),
   getAllCountries: require('./getAllCountries'),
   getAllActivities: require('./getAllActivities'),
   getAllContinents: require('./getAllContinents'),
   getCountriesByContinent: require('./getCountriesByContinent'),
   getCountriesByActivity: require('./getCountriesByActivity'),
   validateActivity: require('./validateActivity'),
}