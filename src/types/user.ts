export interface IUser {
  avatar?: string;
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  readList?: IReadList[];
  wishlist?: IWishList[];
}

export interface IReadList {
  book: string;
  isFinished: boolean;
}
export interface IWishList {
  book: string;
}

export interface ISignupCredential {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
}

export interface ILoginCredential {
  email: string;
  password: string;
}
