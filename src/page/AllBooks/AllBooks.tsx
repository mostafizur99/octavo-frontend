/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "../../components/ui/cards/BookCard";
import BookCardLoader from "../../components/ui/cards/BookCardLoader";
// import BookData from "../../assets/data/books/allBooks.json";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/book";

const AllBooks = () => {
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const BookData: IBook[] = data?.data || [];

  return (
    <div className="container mx-auto py-14 px-5 md:px-0">
      <div className="text-center mb-14">
        <p className="text-themePrimary font-bold text-xs leading-none mb-1">
          All Books
        </p>
        <h2 className="text-xl font-bold text-black">Explore The Octova</h2>
      </div>

      {data && BookData?.length > 0 && (
        <div className="grid gap-6 xl:gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {BookData.map((item: IBook, index: number) => (
            <div key={index}>
              <BookCard data={item} />
            </div>
          ))}
        </div>
      )}
      {!data && isLoading && (
        <div className="grid gap-6 xl:gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div key={index}>
              <BookCardLoader />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
