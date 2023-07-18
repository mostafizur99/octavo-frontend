/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useParams } from "react-router-dom";
import BookCardLoader from "../../components/ui/cards/BookCardLoader";
import { useSingleBookQuery } from "../../redux/features/book/bookApi";
import BookDetailsCard from "../../components/ui/cards/BookDetailsCard";
import { IBook } from "../../types/book";

const BookDetails = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = useSingleBookQuery(id ? `${id}` : "");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const singleBookData: IBook = data?.data;

  return (
    <div className="container mx-auto py-10 md:py-32 px-5 md:px-0">
      <div className="text-center mb-8">
        <p className="text-themePrimary font-bold text-xs leading-none mb-1">
          Book Details
        </p>
        <h2 className="text-xl font-bold text-black">
          {singleBookData?.title}
        </h2>
      </div>

      <div className=" max-w-lg mx-auto">
        {singleBookData && (
          <div>
            <BookDetailsCard data={singleBookData} />
          </div>
        )}
      </div>
      <div className=" max-w-lg mx-auto">
        {isLoading && (
          <div>
            <BookCardLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
