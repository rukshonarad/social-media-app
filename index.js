import express from "express";

import { userRouter } from "./src/routes/user.router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3040;

app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log("Server is running", PORT);
});
