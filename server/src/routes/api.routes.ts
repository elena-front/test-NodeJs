import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./users.routes";
import { verifyAccessToken } from "../middleware/verifyAccessToken";

export default Router().use("/auth", authRouter)
.use("/users", verifyAccessToken, userRouter)