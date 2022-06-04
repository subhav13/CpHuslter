import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Register";
import Question from "./components/Questions/Question";
import { auth } from "./firebase/firebase";
import { userCreator } from "./Redux/userAction";
import moment from "moment";
import MyProfile from "./components/MyProfile/MyProfile";
let App = () => {
  let dispatch = useDispatch();
  let [title, setTitle] = useState("");
  let [points, setPoints] = useState(0);
  let [difficulty_level, setDiff] = useState("");
  let [description, setDesc] = useState("");
  let [sample_test_case_input, setSampleInput] = useState("");
  let [sample_test_case_output, setSampleOutput] = useState("");

  useEffect(() => {
    let unsub = auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        try {
          let data = await axios.get(
            `http://localhost:3001/user/get-user/${user.email}`
          );
          console.log(data);
          if (data && data.data && data.data.data) {
            dispatch(userCreator({ ...user, ...data.data.data }));
          } else {
            dispatch(userCreator({ ...user }));
          }
        } catch (e) {
          dispatch(userCreator({ ...user }));
        }
      } else {
        dispatch(userCreator(null));
      }
    });
    return () => {
      unsub();
    };
  }, []);

  async function postQuestion() {
    let data = await axios.post(
      "http://localhost:3001/question/create-question",
      {
        title: title,
        points: points,
        difficulty_level: difficulty_level,
        description: description,
        sample_test_case_input: sample_test_case_input,
        sample_test_case_output: sample_test_case_output,
      }
    );
    console.log(data);
  }
  return (
    <>
      {/* <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />
      <input
        type="text"
        value={difficulty_level}
        onChange={(e) => setDiff(e.target.value)}
      />
      <textarea
        type="text"
        value={description}
        onChange={(e) => setDesc(e.target.value)}
      />
      <textarea
        type="text"
        value={sample_test_case_input}
        onChange={(e) => setSampleInput(e.target.value)}
      />
      <textarea
        type="text"
        value={sample_test_case_output}
        onChange={(e) => setSampleOutput(e.target.value)}
      />
      <button onClick={() => postQuestion()}>Submit</button> */}
      <Router>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/question" element={<Question />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-profile" element={<MyProfile />} />
          </Routes>
        </ToastProvider>
      </Router>
    </>
  );
};

export default App;
