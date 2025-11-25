export interface User {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: string;
}

export type PublicUser = Omit<User, "passwordHash"> & { _id: string };
