const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

router.post("/signup", userController.postSignUp);

router.post("/login", userController.postLogin);

router.get("/get-user-info", authMiddleware, userController.getUserData);

router.put("/edit-user-info", authMiddleware, userController.putEditUserInfo);

module.exports = router;
