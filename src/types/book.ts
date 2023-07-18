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
