import {
  decrement,
  increment,
} from "../../../redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Home = () => {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <h2 className="text-cyan-500">Hello Binden (home)</h2>

      <div>
        <span>{count}</span>
        <div>
          <button
            className="p-2"
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <button
            className="p-2"
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
