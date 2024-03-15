
export type NewsMassage = {
    id: string; // Will be created on the database
    date: string;
    title: string; // Stored in cents
    text: string;
  };

  export interface NewsMassageC {
    id: string; // Will be created on the database
    date: string;
    title: string; // Stored in cents
    text: string;
  }
  export interface INewsMassage {
    id: string; // Will be created on the database
    date: string;
    title: string; // Stored in cents
    text: string;
  }

  //For auth.ts
  export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };