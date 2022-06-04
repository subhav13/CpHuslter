import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { auth } from "../../firebase/firebase";
import Intro from "./Intro";
import Nav from "./Nav";

let Home = () => {
  let state = useSelector((state) => state);
  console.log(state);
  return state ? (
    <>
      <Nav />
      <Intro />
    </>
  ) : (
    <>
      <Navigate to={"/login"} />
    </>
  );
};

export default Home;
