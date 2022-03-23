const router = require("express").Router();
const TaskModel = require("../models/Task.model");

//* Aquí van todas nuestras rutas de tasks

//obtener tareas del teamwork
router.get("/teamwork/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await TaskModel.find({ teamwork: id });

    res.json(response);
  } catch (err) {
    next(err);
  }
});

//obtener todas las tareas
router.get("/", async (req, res, next) => {
  const { _id } = req.payload;

  try {
  
    const response = await TaskModel.find({
      $or: [{ creator: _id }, { assigned: _id }],
    }).populate(["assigned", "teamwork", "creator"]);
   
    const filteredTasks = response.filter(
      (task) => task.assigned?._id.toString() === _id
    );
    res.json(filteredTasks);
  } catch (err) {
    next(err);
  }
});


//crear nueva tarea
router.post("/", async (req, res, next) => {
  const {
    start,
    description,
    end,
    assigned,
    taskType,
    teamwork,
    isUrgent,
    isDone,
    title,
  } = req.body;

  const { _id } = req.payload;

  try {
    const response = await TaskModel.create({
      creator: _id,
      start,
      end,
      description,
      assigned,
      taskType,
      teamwork,
      isUrgent,
      isDone,
      title,
    });
    res.json(response);
  } catch (err) {
    next(err);
  }
});

// ir a una task en concreto por el id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await TaskModel.findById(id).populate([
      "assigned",
      "teamwork",
      "creator",
    ]);

    res.json(response);
  } catch (err) {
    next(err);
  }
});

// ruta para modificar una task de la BD
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    creator,
    start,
    description,
    end,
    assigned,
    taskType,
    teamwork,
    isUrgent,
    isDone,
    title,
  } = req.body;

  try {
    await TaskModel.findByIdAndUpdate(id, {
      creator,
      start,
      description,
      end,
      assigned,
      taskType,
      teamwork,
      isUrgent,
      isDone,
      title,
    });

    const response = await TaskModel.findById(id).populate([
      "assigned",
      "teamwork",
      "creator",
    ]);

    res.json(response);
  } catch (err) {
    next(err);
  }
});

//ruta para eliminar una task de la BD
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await TaskModel.findByIdAndDelete(id);
    res.json("tarea eliminada");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
