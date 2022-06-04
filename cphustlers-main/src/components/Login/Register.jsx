import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { useToasts } from "react-toast-notifications";
import { auth } from "../../firebase/firebase";
import axios from "axios";

let Signup = () => {
  let history = useNavigate();
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let { addToast } = useToasts();
  let user = useSelector((state) => state);

  let checkData = () => {
    let error = false;

    if (!password) {
      error = true;
      addToast("Please Enter Password", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1500,
      });
    }

    if (!confirmPassword) {
      error = true;
      addToast("Please Confirm Password", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1500,
      });
    }
    if (!name) {
      error = true;
      addToast("Name is required", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1500,
      });
    }

    if (!email) {
      error = true;
      addToast("Email is required", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 1500,
      });
    }

    return error;
  };
  return (
    <>
      {user ? <Navigate to="/" /> : ""}
      <div className="row">
        <div className="col-4 offset-4">
          <h1 style={{ color: "white" }} className="mt-4 mb-4">
            Sign Up
          </h1>
          <form className="mt-4">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                }}
                id="exampleInputPassword2"
              />
            </div>

            <button
              onClick={async (e) => {
                e.preventDefault();
                if (!checkData())
                  if (password === confirmPassword) {
                    try {
                      await axios.post("http://localhost:3001/user/create", {
                        email_id: email,
                        password: password,
                        name: name,
                      });
                      let { user } = await auth.createUserWithEmailAndPassword(
                        email,
                        password
                      );
                      console.log(user);
                      addToast("you have been successfully registered", {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 1500,
                      });
                    } catch (e) {
                      addToast(e.message, {
                        appearance: "error",
                        autoDismiss: true,
                        autoDismissTimeout: 1500,
                      });
                    }
                  } else {
                    addToast("both passwords should match", {
                      appearance: "error",
                      autoDismiss: true,
                      autoDismissTimeout: 1500,
                    });
                  }
              }}
              className="btn btn-primary"
            >
              Sign Up
            </button>
            <br />
            <br />
            <button
              onClick={() => history("/login")}
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
