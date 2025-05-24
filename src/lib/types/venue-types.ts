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

export interface VenueInfo {
  artist: string;
  price: number;
  date: Date;
  genre: string;
  _id?: string;
  venueid: Venue["_id"];
}

export interface Venue {
  title: string;
  description: string;
  capacity: string;
  userid: User | string;
  latitude: number;
  longitude: number;
  _id: string;
   imgId: string;
   img: string;
}

