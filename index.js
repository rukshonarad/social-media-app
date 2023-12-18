import express from "express";

import { userRouter } from "./src/routes/user.router.js";
import { postRouter } from "./src/routes/post.router.js";
import dotenv from "dotenv";
import { GlobalError } from "./src/middlewares/global-error.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3040;

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running", PORT);
});
