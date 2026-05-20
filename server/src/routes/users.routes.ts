import { Router } from "express";
import { getUserById } from "../controllers/User.controller";

export default Router()
.get('/:id', getUserById)
