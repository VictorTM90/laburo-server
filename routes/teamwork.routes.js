const router = require("express").Router();
const TeamWorkModel = require("../models/Teamwork.model");
const User = require("../models/User.model");

//* Aquí van todas nuestras rutas de teamwork

//obtener todos los teamwork creados por el usuario
router.get("/", async (req, res, next) => {
  try {
    const response = await TeamWorkModel.find().populate("members");
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
//para acceder a los miembros de los teamworks en los que el usuario es el creator.  
router.get("/creatorteams", async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const response = await TeamWorkModel.find({creator: _id}).populate("members")

    res.json(response);
  } catch (err) {
    next(err);
  }
});

// ver un teamwork específico
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

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
  
  const { id, userid } = req.params;
 
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
    await TeamWorkModel.findByIdAndUpdate(id, {
       $pull: {
         members: req.payload.id,
      },
     });
   res.json(team);
 });


module.exports = router;
