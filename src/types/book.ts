export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationYear: string;
  price: string;
  isFeatured: boolean;
  _id: string;
  reviews: [IReview];
}
export interface IReview {
  rating: string;
  comment: string;
  reviewer: {
    name: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface IReviewInputs {
  rating: string;
  comment: string;
}

export interface IBookInputs {
  title: string;
  author: string;
  genre: string;
  price: string;
  publicationYear: string;
}
