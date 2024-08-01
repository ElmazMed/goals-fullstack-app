import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <>
      {!user ? (
        <h3>Please login your account!</h3>
      ) : (
        <section className="heading">
          <h1>Hello {user && user.name}</h1>
          <p>Goals Dashboard</p>
          <GoalForm />
        </section>
      )}
    </>
  );
}

export default Dashboard;
