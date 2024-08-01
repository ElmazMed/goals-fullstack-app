import { useSelector, useDispatch } from "react-redux";
import { getGoals, deleteGoal, reset } from "../features/GoalSlice";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function Goals() {
  const dispatch = useDispatch();
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="goals">
      {goals.length > 0 ? (
        goals.map((g) => (
          <div key={g._id} className="goal">
            <h4>{g.text}</h4>
            <button
              onClick={() => dispatch(deleteGoal(g._id))}
              className="close"
            >
              X
            </button>
          </div>
        ))
      ) : (
        <div className="goals-msg">
          <h4>You don't have any goals yet</h4>
        </div>
      )}
    </div>
  );
}
