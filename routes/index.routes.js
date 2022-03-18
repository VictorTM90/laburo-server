const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const tasksRoutes = require("./tasks.routes");
router.use("/tasks",isAuthenticated, tasksRoutes);

const teamworkRoutes = require("./teamwork.routes");
router.use("/teamwork",isAuthenticated, teamworkRoutes);

module.exports = router;
