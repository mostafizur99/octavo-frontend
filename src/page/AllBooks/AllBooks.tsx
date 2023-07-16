import BookCard from "../../components/ui/cards/BookCard";
import BookData from "../../assets/data/books/allBooks.json";

const AllBooks = () => {
  return (
    <div className="container mx-auto py-14 px-5 md:px-0">
      <div className="text-center mb-14">
        <p className="text-themePrimary font-bold text-xs leading-none mb-1">
          All Books
        </p>
        <h2 className="text-xl font-bold text-black">Explore The Octova</h2>
      </div>

      <div className="grid gap-6 xl:gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {BookData.map((item, index) => (
          <div key={index}>
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
