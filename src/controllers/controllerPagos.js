const Stripe = require("stripe");
const { CLAVE_PRIVADA } = process.env;
const stripe = new Stripe(CLAVE_PRIVADA);
const { Pedido } = require("../db");
const { NOMBRE_ECOMMERCE } = process.env;

async function pagosPost(req, res, next) {
  // Destructuramos los atributos que recibimos por body
  const { transaccionId, pedidoId } = req.body;

  // console.log(req.body)
  try {
    // Traemos el pedido para generar una descripción y obtener el precio de la transacción
    let pedido = await Pedido.findByPk(pedidoId);

    if (!pedido) return next({ status: 400, message: "El id del pedido no es válido" });
    // Si hay un id lo pasamos a json
    pedido = pedido.toJSON();

    // Generamos una descripción
    let description = `Deducción por compra id ${pedido.id} realizada en ${NOMBRE_ECOMMERCE}. Gracias por su compra`;

    // Creamos un nuevo pago
    const payment = await stripe.paymentIntents.create({
      amount: pedido.total * 100,
      currency: "USD",
      description,
      payment_method: transaccionId,
      confirm: true, //confirmamos el pago
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {

    console.log(error);
    return next({ status: 400, message: error.raw.message });
  }
};


module.exports = {
  pagosPost
}