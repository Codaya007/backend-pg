const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const Stripe = require("stripe");
const { CLAVE_PRIVADA } = process.env;
const stripe = new Stripe(CLAVE_PRIVADA);

async function pagosPost (req, res) {
    // you can get more data to find in a database, and so on
    const { id, amount } = req.body;
    console.log(req.body)
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Gaming Keyboard",
        payment_method: id,
        confirm: true, //confirm the payment at the same time
      });
  
      console.log(payment);
  
      return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.raw.message });
    }
  };


module.exports = {
    pagosPost
 }