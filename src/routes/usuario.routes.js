require("dotenv").config();
const { Router, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //encriptar contraseña
const { JWT_SECRET } = process.env;
const gravatar = require("gravatar");

const userRouter = Router();

// requerimos el modelo de Usuario
const { Usuario } = require("../db");
// Requerimos el middleware de autenticación
const { authentication } = require("../middlewares");

// @route POST user/register
// @desc Registrar Usuarios
// @access Public
userRouter.post("/register", async (request, response, next) => {
  const {
    nombre,
    usuario,
    contrasena,
    email,
    pais,
    provincia,
    direccion,
    telefono,
  } = request.body;

  // Verifico si el body tiene la información requerida
  if (!nombre || !usuario || !contrasena) {
    next({ status: 401, message: "Campos faltantes" });
  }

  try {
    let user = await Usuario.findOne({ where: { email } });

    // Si el correo ya está registrado, devuelvo un error
    if (user) {
      return next({ status: 400, message: "Ya posee una cuenta registrada" });
    }

    // Si no, obtenemos la imágen de gravatar para su perfil
    const avatar = gravatar.url(email, {
      s: "200", //size
      r: "pg", //rate
      d: "mm",
    });

    // Creamos el usuario
    user = {
      nombre,
      usuario,
      contrasena,
      email,
      pais,
      provincia,
      direccion,
      telefono,
      avatar,
      rol: 1,
    };

    // Encriptamos la contraseña (complejidad 10)
    user.contrasena = await bcrypt.hash(contrasena, 10);

    // Creamos el nuevo usuario y lo guardamos en la DB
    try {
      user = await Usuario.create(user);
      // console.log(user.toJSON());
    } catch (error) {
      // no se ha podido crear el usuario
      console.log(error);
    }

    // generamos el payload/body para generar el token
    const payload = {
      usuario: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 360000, //for development
      },
      (err, token) => {
        if (err) throw err;
        response.status(201).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    next({});
  }
});

// @route POST user/login
// @desc Logear un usuario
// @access Public
userRouter.post("/login", async (request, response, next) => {
  const { email, contrasena } = request.body;

  if (!email || !contrasena) {
    return next({
      status: 400,
      message: "No se han proporcionado credenciales de acceso",
    });
  }

  try {
    let user = await Usuario.findOne({ where: { email } });

    // significa que el correo no es válido
    if (!user) return next({ status: 400, message: "Credenciales no validas" });

    // Teniedo el usuario, determinamos si la contraseña enviada es correcta
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    // si la contraseña es incorreta
    if (!isMatch)
      return next({ status: 400, message: "Credenciales no validas" });

    // si la contraseña y email son validos escribimos el payload/body
    const payload = {
      usuario: { id: user.id },
    };

    // GENERO UN TOKEN
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        return response.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    next({ status: 500 });
  }
});

// @route GET api/user
// @desc Información del usuario
// @access Private
userRouter.get("/", authentication, async (request, response, next) => {
  try {
    let user = await Usuario.findByPk(request.usuario.id);

    user && (user = user.toJSON());

    // le borramos la contraseña
    delete user.contrasena;

    response.json(user);
  } catch (err) {
    console.log(err);
    next({ status: 500 });
  }
});



// @route PUT user/update/
// @desc Actualizar los datos de un usuario
// @access Private
userRouter.put("/update", authentication, async (request, response, next) => {
  const {
    id,
    nombre,
    usuario,
    contrasena,
    email,
    pais,
    provincia,
    direccion,
    telefono,
  } = request.body;

  if (!id) return next({ status: 400, message: "El id es Requerido" });
  let avata = gravatar.url(email, {
    s: "200", //size
    r: "pg", //rate
    d: "mm",
  });
  try {
    let password = await bcrypt.hash(contrasena, 10);
    const UserUpdate = await Usuario.update(
      {
        nombre,
        avatar: avata,
        usuario,
        contrasena: password,
        email,
        pais,
        provincia,
        direccion,
        telefono,
      },
      {
        where: {
          id,
        },
      }
    );
    if (UserUpdate)
      return response
        .status(200)
        .json({ message: "Los Datos fueron Actualizados" });

    return response.status(203).json({ message: "Algo Sucedio" });
  } catch (error) {
    return next({});
  }
});

module.exports = userRouter;
