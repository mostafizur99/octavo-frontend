/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from "react";
// import BookData from "../../../assets/data/books/allBooks.json";
import BookCard from "../../../components/ui/cards/BookCard";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchUserByToken } from "../../../redux/features/user/userSlice";
import { useGetBooksQuery } from "../../../redux/features/book/bookApi";
import BookCardLoader from "../../../components/ui/cards/BookCardLoader";
import { IBook } from "../../../types/book";

const Home = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(fetchUserByToken());
    }
  }, [dispatch, token]);

  //==============get recent 10 books data==============
  const { data, isLoading } = useGetBooksQuery("limit=10&sortOrder=desc");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const BookData: IBook[] = data?.data || [];

  return (
    <div className="container mx-auto pt-14 pb-20 px-5 md:px-0">
      <div className="text-center mb-14">
        <p className="text-themePrimary font-bold text-xs leading-none mb-1">
          Recent Books
        </p>
        <h2 className="text-xl font-bold text-black">Find Your Octova</h2>
      </div>

      {data && BookData?.length > 0 && (
        <div className="grid gap-6 xl:gap-8 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {BookData.map((item: IBook, index: number) => (
            <div key={index}>
              <BookCard data={item} />
            </div>
          ))}
        </div>
      )}
      {!data && isLoading && (
        <div className="grid gap-6 xl:gap-8 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <div key={index}>
              <BookCardLoader />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
