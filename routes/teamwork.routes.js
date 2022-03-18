const router = require("express").Router();
const TeamWorkModel = require("../models/Teamwork.model")
const User = require("../models/User.model")

//* Aquí van todas nuestras rutas de teamwork

//obtener todos los teamwork creados por el usuario 
router.get("/", async (req, res, next) =>{
    try{
        const response = await TeamWorkModel.find().select("name")
        res.json(response)
    }catch(err){
        next(err);
    }
})

//crear un nuevo teamwork
router.post("/", async (req, res, next) =>{
    const { name,  creator, members } = req.body;

    try{
        const response = await TeamWorkModel.create({ name,  creator, members })
        res.json(response)
    }catch(err){
        next(err);
    }
})

// ver un teamwork específico
router.get("/:id", async (req, res, next) =>{
    const {id} = req.params

    try{
        const response = await TeamWorkModel.findById(id);
        res.json(response)
    }catch(err) {
        next(err)
    }
})

//ruta para eliminar un teamwork de la BD
router.delete("/:id", async (req, res, next) =>{
    const {id} = req.params

    try{
        await TeamWorkModel.findByIdAndDelete(id);
        res.json("elemento eliminado")
    }catch(err) {
        next(err)
    }
})

//ruta para modificar elementos del teamwork en la BD
router.patch("/:id", async (req, res, next) =>{
    const { name,  creator, members } = req.body;
    const {id} = req.params

    try{
        await TeamWorkModel.findByIdAndUpdate(id,{name,  creator, members})
        res.json("elemento actualizado")
    }catch(err) {
        next(err)
    }
})

//eliminar un MIEMBRO DEL TEAMWORK 
router.patch("/:id/remove/:userid", async (req, res, next) =>{
    const { members } = req.body;
    const {id} = req.params
    //el id del member ya viene dado en el body???
    try{
        //?? método correcto
        await TeamWorkModel.findByIdAndDelete(id,{members})
        res.json("miembro eliminado", members)
    }catch(err) {
        next(err)
    }
})

//abandonar el equipo como miembro
router.patch("/:id/quit", async (req, res, next) =>{
    const {id} = req.params
    const { members } = req.body;
    //conseguir el id del usuario del fontend //??payload
    //comparar el id del usuario con el el Type.Object.Id del modelo 
    await TeamWorkModel.findByIdAndDelete(id, )
    res.json(team)
    
})  

module.exports = router;