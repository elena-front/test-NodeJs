import { Router } from "express";
import {
  blockUser,
  getAllUsers,
  getUserById,
} from "../controllers/User.controller";

export default Router()
  .get("/:id", getUserById)
  .post("/:id/block", blockUser)
  .get("/", getAllUsers);
