export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

export interface Venue {
  title: string;
  description: string;
  capacity: string;
  userid: User | string;
  latitude: number;
  longitude: number;
}