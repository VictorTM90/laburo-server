const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/signup", async (req, res, next) => {
  const { email, name, password } = req.body;

  // requerir los campos
  if (!email || !password || !name) {
    res.status(400).json({ errorMessage: "Llenar todos los campos" });
    return;
  }

  try {
    //validadores de backend

    const response = await User.findOne({ email });

    if (response) {
      res.status(400).json({ errorMessage: "El usuario ya existe" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: hashedPassword });

    res.status(201).json();
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ errorMessage: "Llenar todos los campos" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email });
    // si el usario no existe le enviamos el error.
    if (!foundUser) {
      res.status(401).json({ errorMessage: "Usuario no registrado" });
      //cortar la ruta
      return;
    }

    // validación de contraseña

    // Comparamos contraseña del req body (la que escribe usuario) con la de la base de datos (recuperada del User.find())
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      res.status(401).json({ errorMessage: "Contraseña incorrecta." });
      return;
    }

    //!creacion del token y enviarlo al Frontend

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
    };

    // para crear el token, le pasamos el payload de arriba (lineas 70-74 del código)

    const authToken = jwt.sign(
      payload,
      // palabra secreta que esta en el archivo .env
      process.env.TOKEN_SECRET,

      // el algoritmo que nos da la documentación. Expires cuanto dura la validez del token.
      { algorithm: "HS256", expiresIn: "6h" }
    );

    //* SI TODO HA SALIDO BIEN, ENVIAMOS EL TOKEN AL FRONTEND PARA GUARDARLO EN EL LOCALSTORAGE.
    res.status(200).json({ authToken });
  } catch (err) {
    next(err);
  }

  //! ruta para verificar si tiene un token valido cuando vuelva a la página.

  router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json();
  });
});

module.exports = router;
