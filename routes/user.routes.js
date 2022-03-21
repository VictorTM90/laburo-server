const router = require("express").Router();
const User = require("../models/User.model")



router.get("/", async (req, res, next) => {
    try{
        const response = await User.find() 
        res.json(response)
    }catch(err){
        next(err)
    }
})

//ir a un usuario en concreto por el id
router.get("/:id", async(req, res, next) => {
    const { id } = req.params;

    try{
        const response = await User.findById(id)
        res.json(response)
    }catch (err){
        next(err)
    }
})



module.exports = router;