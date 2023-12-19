import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { postController } from "../controllers/post.controller.js";

const postRouter = new Router();

postRouter.post("/", authMiddleware.authenticate, postController.create);
export { postRouter };
