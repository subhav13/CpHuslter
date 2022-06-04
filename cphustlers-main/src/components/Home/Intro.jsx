import "../styles/Home/Intro.css";
import QuestionHome from "./question";
import "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
let Intro = () => {
  let [questions, setQuestion] = useState([]);
  let [user, setUser] = useState(null);
  let navigate = useNavigate();
  let fetchQuestions = async () => {
    let data = await axios.get(
      "http://localhost:3001/question/get-all-quesiton"
    );
    if (data.data && data.data.data) {
      setQuestion(data.data.data);
    }
  };
  let fetchUser = async () => {
    let data = await axios.get(
      `http://localhost:3001/user/get-user/${auth.currentUser.email}`
    );
    if (data.data && data.data.data) {
      setUser(data.data.data);
    }
    console.log(user);
  };

  useEffect(() => {
    fetchUser();
    fetchQuestions();
  }, []);
  return (
    <>
      <div className="user-home-details-con">
        <div style={{ background: "#006E7F" }} className="home-detail-con">
          <h3>Submitted Questions</h3>
          <p>{!user || user == null ? "0" : user.total_submissions}</p>
        </div>
        <div style={{ background: "#446A46" }} className="home-detail-con">
          <h3>Total Points</h3>
          <p>{!user || user == null ? "0" : user.total_points}</p>
        </div>
        <div style={{ background: "#4D4C7D" }} className="home-detail-con">
          <h3>Level</h3>
          <p>
            {!user || user == null
              ? "Not found"
              : user.total_points < 100
              ? "Beginner"
              : user.total_points < 200
              ? "Intermediate"
              : "Expert"}
          </p>
        </div>
      </div>
      <div className="questions-details">
        <div className="question-container">
          {questions.map((e, idx) => {
            return <QuestionHome key={idx} ques={e} />;
          })}
        </div>
          
        <div
          onClick={() => {
            navigate("/my-profile");
          }}
          className="user-profile"
        >
          <p>Signed In as : </p>
          <p>{auth.currentUser.email}</p>
        </div>
      </div>
    </>
  );
};

export default Intro;
