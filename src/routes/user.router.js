import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const userRouter = Router();
userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/activate", userController.activate);
userRouter.patch("/forgot-password", userController.forgotPassword);
userRouter.patch("/reset-password", userController.resetPassword);
userRouter.patch(
    "/change-password",
    authMiddleware.authenticate,
    userController.changePassword
);
userRouter.get("/me", authMiddleware.authenticate, userController.getMe);

export { userRouter };
