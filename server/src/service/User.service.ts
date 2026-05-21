import { User } from "../db/models";
import type {
  SingUpData,
  SignInData,
  CreateUserDTO,
} from "../types/database.types";

export default class UserService {
  // Найти пользователя по email
  static async getUserByEmail(email: string) {
    return (await User.findOne({ where: { email } }))?.get();
  }

  // Создаём пользователя в БД
  static async createNewUser(userData: CreateUserDTO) {
    const [day, month, year] = userData.birthDate.split(".");

    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));

    return (await User.create({ ...userData, birthDate }))?.get();
  }

  static isValidBirthDateFormat(date: string): boolean {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;

    return regex.test(date);
  }

  static validateEmail(email: string) {
    const emailPattern = /^[A-z0-9!-_%.]+@[A-z0-9.-]+\.[A-z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePassword(password: string) {
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigits = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*(),.:"{}|<>]/;
    const isValidLength = password.length >= 8;

    if (
      !hasUppercase.test(password) ||
      !hasLowercase.test(password) ||
      !hasDigits.test(password) ||
      !hasSpecialCharacters.test(password) ||
      !isValidLength
    ) {
      return false;
    }
    return true;
  }

  static validateSignUpData(data: SingUpData) {
    const { name, surname, middlename, birthDate, email, password } = data;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return {
        isValid: false,
        error: "Имя пользователя не должно быть пустым",
      };
    }

    if (
      !surname ||
      typeof surname !== "string" ||
      surname.trim().length === 0
    ) {
      return {
        isValid: false,
        error: "Фамилия пользователя не должна быть пустой",
      };
    }

    if (
      !middlename ||
      typeof middlename !== "string" ||
      middlename.trim().length === 0
    ) {
      return {
        isValid: false,
        error: "Отчество пользователя не должно быть пустым",
      };
    }

    if (!UserService.isValidBirthDateFormat(birthDate)) {
      return {
        isValid: false,
        error: "Неверный формат даты рождения",
      };
    }

    if (
      !email ||
      typeof email !== "string" ||
      email.trim().length === 0 ||
      !UserService.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: "Ошибка валидации адреса электронной почты",
      };
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0 ||
      !UserService.validatePassword(password)
    ) {
      return {
        isValid: false,
        error: "Пароль не соответствует критериям валидации",
      };
    }

    return { isValid: true, error: null };
  }

  static validateSignInData(data: SignInData) {
    const { email, password } = data;

    if (
      !email ||
      typeof email !== "string" ||
      email.trim().length === 0 ||
      !UserService.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: "Ошибка валидации адреса электронной почты",
      };
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0
    ) {
      return {
        isValid: false,
        error: "Пароль не соответствует критериям валидации",
      };
    }

    return { isValid: true, error: null };
  }

  // Найти пользователя по id
  static async getUserById(id: number) {
    return await User.findByPk(id);
  }

  // Получить список всех пользователей
  static async getAllUsers() {
    const users = await User.findAll();
    return users.map((u) => u.get());
  }

  // Блокировка пользователя
  static async blockUser(user: User) {
    user.status = "inactive";
    await user.save();
  }
}
