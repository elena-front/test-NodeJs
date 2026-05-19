export type CreateUserDTO = {
  name: string;
  surname: string;
  middlename: string;
  birthDate: string;
  email: string;
  password: string;
  role: "admin" | "user";
  status: "active" | "inactive";
};

export type SingUpData = {
  name: string;
  surname: string;
  middlename: string;
  birthDate: string;
  email: string;
  password: string;
  role: "admin" | "user";
  status: "active" | "inactive";
};

export type SignInData = {
  email: string;
  password: string;
};
