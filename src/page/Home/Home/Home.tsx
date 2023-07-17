import { useEffect } from "react";
import BookData from "../../../assets/data/books/allBooks.json";
import BookCard from "../../../components/ui/cards/BookCard";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchUserByToken } from "../../../redux/features/user/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(fetchUserByToken());
    }
  }, [dispatch, token]);

  return (
    <div className="container mx-auto pt-14 pb-20 px-5 md:px-0">
      <div className="text-center mb-14">
        <p className="text-themePrimary font-bold text-xs leading-none mb-1">
          Recent Books
        </p>
        <h2 className="text-xl font-bold text-black">Find Your Octova</h2>
      </div>

      <div className="grid gap-6 xl:gap-8 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {BookData.map((item, index) => (
          <div key={index}>
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
