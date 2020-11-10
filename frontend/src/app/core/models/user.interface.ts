export interface User {
  _id?: string;
  title: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  city?: string;
  token?: string;
  email: string;
  role: number;
  mobile?: string;
}
