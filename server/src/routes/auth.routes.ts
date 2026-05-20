import { Router } from "express";

import {
  signUp,
  signIn,
  refresh,
  signOut,
} from "../controllers/Auth.controller";
import { verifyRefreshToken } from "../middleware/verifyRefreshToken";

export default Router()
  .post("/signup", signUp)
  .post("/signin", signIn)
  .post("/refresh", verifyRefreshToken, refresh)
  .post("/signout", signOut);
