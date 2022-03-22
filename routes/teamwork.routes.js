const router = require("express").Router();
const TeamWorkModel = require("../models/Teamwork.model");
const User = require("../models/User.model");

//* Aquí van todas nuestras rutas de teamwork

//obtener todos los teamwork creados por el usuario
router.get("/", async (req, res, next) => {
  try {
    const response = await TeamWorkModel.find().populate("members");
    // kata time! quitar los passwords de los miembros
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//crear un nuevo teamwork
router.post("/", async (req, res, next) => {
  const { name, members } = req.body;
  const { _id } = req.payload;
  try {
    const response = await TeamWorkModel.create({
      name,
      creator: _id,
      members,
    });
    res.json(response);
  } catch (err) {
    next(err);
  }
});

// ver un teamwork específico
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id, "BACKEND");

  try {
    const response = await TeamWorkModel.findById(id).populate("members")
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//ruta para eliminar un teamwork de la BD
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await TeamWorkModel.findByIdAndDelete(id);
    res.json("elemento eliminado");
  } catch (err) {
    next(err);
  }
});

//ruta para modificar elementos del teamwork en la BD
router.patch("/:id", async (req, res, next) => {
  const { name, members } = req.body;
  const { id } = req.params;

  try {
    await TeamWorkModel.findByIdAndUpdate(id, { name, members });
    res.json("elemento actualizado");
  } catch (err) {
    next(err);
  }
});

//eliminar un MIEMBRO DEL TEAMWORK
router.patch("/:id/remove/:userid", async (req, res, next) => {
  // const { member } = req.body;
  const { id, userid } = req.params;
  //el id del member ya viene dado en el body???
  try {
    await TeamWorkModel.findByIdAndUpdate(id, {
      $pull: {
        members: userid,
      },
    });
    res.json("miembro eliminado");
  } catch (err) {
    next(err);
  }
});

//abandonar el equipo como miembro
router.patch("/:id/quit", async (req, res, next) => {
  const { id } = req.params;
  const { members } = req.body;
  //conseguir el id del usuario del fontend via payload
  //comparar el id del usuario con el el Type.Object.Id del modelo
  await TeamWorkModel.findByIdAndUpdate(id, {
    $pull: {
      members: req.payload.id,
    },
  });
  res.json(team);
});

module.exports = router;
