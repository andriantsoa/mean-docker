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
  profils?: any[];
}

export interface IUserProfile {
  _id?: string;
  profil?: string;
  candidat?: string;
}
