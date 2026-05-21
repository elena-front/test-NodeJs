import UserService from "../service/User.service";
import formatResponse from "../utils/formatResponse";
import type { Request, Response } from "express";

// Найти пользователя по id
export async function getUserById(req: Request, res: Response) {
  const { user } = res.locals;
  const { id } = req.params;

  if (user.role !== "admin" && user.id !== Number(id)) {
    return res
      .status(403)
      .json(formatResponse(403, "Доступ запрещен", null, "Доступ запрещен"));
  }

  const myUser =
    user.id === Number(id) ? user : await UserService.getUserById(Number(id));
  if (!myUser) {
    return res
      .status(404)
      .json(
        formatResponse(
          404,
          "Пользователь не найден",
          null,
          "Пользователь не найден",
        ),
      );
  }

  return res.status(200).json(myUser);
}

// Получить список всех пользователей
export async function getAllUsers(req: Request, res: Response) {
  const { user } = res.locals;

  if (user.role !== "admin") {
    return res
      .status(403)
      .json(formatResponse(403, "Доступ запрещен", null, "Доступ запрещен"));
  }

  const users = await UserService.getAllUsers();
  return res.status(200).json(users);
}

// Блокировка пользователя
export async function blockUser(req: Request, res: Response) {
  const { user } = res.locals;
  const { id } = req.params;

  if (user.role !== "admin" && user.id !== Number(id)) {
    return res
      .status(403)
      .json(
        formatResponse(
          403,
          "Недопустимое действие",
          null,
          "Недопустимое действие",
        ),
      );
  }

  const userToBlock = await UserService.getUserById(Number(id));
  if (!userToBlock) {
    return res
      .status(404)
      .json(
        formatResponse(
          404,
          "Пользователь не найден",
          null,
          "Пользователь не найден",
        ),
      );
  }

  await UserService.blockUser(userToBlock);
  return res
    .status(200)
    .json(formatResponse(200, "Статус обновлен", null, "Статус обновлен"));
}
