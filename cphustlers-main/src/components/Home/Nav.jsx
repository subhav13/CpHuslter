import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import "../styles/Home/Nav.css";
let Nav = () => {
  let state = useSelector((state) => state);
  let signoutHandler = async () => {
    await auth.signOut();
  };
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <p>
            <Link to={"/"}>{"</>"} Hustlers</Link>
          </p>
        </div>
        {!state || !state.multiFactor || !state.multiFactor.user
          ? ""
          : // (
            // //   <>
            // //     <div className="links">
            // //       <Link to="/stocks">Discover</Link>
            // //       <Link to={"/investment"}>Investments</Link>
            // //       {/* <a href="#">Orders</a> */}
            // //       <a href="#">Resources</a>
            // //     </div>
            // //   </>
            // )}
            ""}
        <div className="login">
          {/* {!state || !state.multiFactor || !state.multiFactor.user ? (
              ""
            ) : (
              <Link to="/" className="wallet">
                <div className="wallet-container">
                  <span className="material-symbols-outlined">wallet</span>
                </div>
              </Link>
            )} */}
          {!state || !state.multiFactor || !state.multiFactor.user ? (
            <Link className="login-link" to="/login">
              <div className="login-container">Login</div>
            </Link>
          ) : (
            <>
              <div className="logout-container" onClick={signoutHandler}>
                <span className="material-icons-outlined">logout</span>{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
