import { useNavigate } from "react-router";

let QuestionHome = ({ ques }) => {
  let navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate("/question", { state: ques });
        }}
        className="question"
      >
        <div className="title">
          <div className="head">{ques.title}</div>
          <div className="difficulty">{ques.difficulty_level}</div>
          <div className="points">Points : {ques.points}</div>
        </div>
        <div className="subtitle">{ques.description}</div>
      </div>
    </>
  );
};

export default QuestionHome;
