import { Router } from "express";
import { blockUser, getUserById } from "../controllers/User.controller";

export default Router().get("/:id", getUserById).post("/:id/block", blockUser);
