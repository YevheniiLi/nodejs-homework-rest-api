const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { validation } = require("../../middlewares/validation");
const authenticate = require("../../middlewares/authenticate");
const { registerSchema, loginSchema, updateSubscriptionSchema } = require("../../models/users");

router.post("/signup", validation(registerSchema), asyncWrapper(authController.signup));
router.post("/login", validation(loginSchema), asyncWrapper(authController.login));
router.get("/logout", authenticate, asyncWrapper(authController.logout));
router.get("/current", authenticate, asyncWrapper(authController.getCurrent));
router.patch("/users", authenticate, validation(updateSubscriptionSchema), asyncWrapper(authController.updateSubscription));

module.exports = router;