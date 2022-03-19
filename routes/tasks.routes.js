const router = require("express").Router();
const TaskModel = require("../models/Task.model")

//* Aquí van todas nuestras rutas de tasks

//obtener todas las tareas por título
router.get("/", async (req, res, next) => {

    try{
        const response = await TaskModel.find().select("title")
        res.json(response)
    }catch(err) {
        next(err);
    }
})

//crear nueva tarea
router.post("/", async (req, res, next) => {
    console.log(req.body, "lalala")
    const { creator, date, description,  dueDate, assigned, taskType, teamwork, isUrgent, isDone, title } = req.body;

    try{
        const response = await TaskModel.create({creator, date, description,  dueDate, assigned, taskType, teamwork, isUrgent, isDone, title})
        res.json(response)
    }catch(err) {
        next(err)
    }
})

// ir a una task en concreto por el id
router.get("/:id", async (req, res, next) => {
    
    const { id } = req.params;

    try {
        const response = await TaskModel.findById(id);
        res.json(response)
    }catch(err) {
        next(err)
    }  
})

// ruta para modificar una task de la BD  
router.patch("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { creator, date, description,  dueDate, assigned, taskType, teamwork, isUrgent, isDone } = req.body;

    try{
        await TaskModel.findByIdAndUpdate(id, {creator, date, description,  dueDate, assigned, taskType, teamwork, isUrgent, isDone})
        res.json("elemento actualizado")
    }catch(err) {
        next(err)
    }

})

//ruta para eliminar una task de la BD
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;

    try{
        await TaskModel.findByIdAndDelete(id)
        res.json("tarea eliminada")
    }catch(err){
        next(err)
    }
})


module.exports = router;