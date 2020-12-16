export interface IUser {
  title: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  role: number;
  mobile?: string;
  city?: string;
  token?: string;
  _id?: string;
  active?: boolean;
  profils?: IUserProfile[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserProfile {
  _id?: string;
  candidat?: string;
  entreprise?: string;
  label?: string;
  createdAt?: string;
  updatedAt?: string;
}
