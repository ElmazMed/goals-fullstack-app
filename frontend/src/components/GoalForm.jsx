import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/GoalSlice";
import Goals from "./Goals";

export default function GoalForm() {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setErrMsg("Please add a goal");
    } else {
      dispatch(createGoal({ text }));
      setText("");
    }
  };
  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <p style={{ color: "crimson", fontSize: "1rem" }}>{errMsg}</p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ marginBottom: "2rem" }}
          >
            Add goal
          </button>
        </form>
      </section>
      <section className="content">
        <Goals />
      </section>
    </>
  );
}
