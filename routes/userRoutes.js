const express = require("express");
const { createUser, getUser, fetchUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

/*
USERS ROUTES
*/
router.post("/user", createUser);
router.get("/user", getUser);
router.get("/user/:id", fetchUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;