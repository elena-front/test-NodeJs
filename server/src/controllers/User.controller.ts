import UserService from "../service/User.service";
import formatResponse from "../utils/formatResponse";
import type { Request, Response } from "express";

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await UserService.getUserById(
      Number(req.params.id),
      res.locals.user
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(403).json(
      formatResponse(
        403,
        "Доступ запрещен", 
        null,
        "Доступ запрещен", 
      )
    )
  }
}