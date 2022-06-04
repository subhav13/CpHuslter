import ActivityCalendar from "react-activity-calendar";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import ReactTooltip from "react-tooltip";
import RadialSeparators from "./RadialSeperators";
import "../styles/MyProfile/MyProfile.css";
import { useEffect, useState } from "react";
import Nav from "../Home/Nav";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import QuestionHome from "../Home/question";
import { useToasts } from "react-toast-notifications";

let MyProfile = () => {
  const [profilePic, setProfilePic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );
  const [actData, setActData] = useState([]);
  //   const [profileDataUser, setProfileDataUser] = useState("");
  const user = useSelector((state) => state);
  const [accuracy, setAccuracy] = useState(0);
  const [totalSubmissions, setTotalSubmission] = useState(1);
  const [successfulSubmissions, setSuccessfulSubmissions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [fileId, setFileId] = useState("");
  const { addToast } = useToasts();

  async function uploadImage(url) {
    if (url) {
      console.log(fileId);
      let formData = new FormData();
      formData.append("file", url);
      formData.append("fileName", url.name);
      formData.append("folder", "/CpHustlers/");

      try {
        let data = await axios.post(
          "https://upload.imagekit.io/api/v1/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Headers": "*",
            },
            auth: {
              username: "private_NgINkm9EKeZD7b2jpPQKPdQHiQ8=",
              password: "",
            },
          }
        );
        console.log(data);
        await axios.post("http://localhost:3001/user/upload-profile-pic", {
          img_url: data.data.url,
          id: user._id,
          fileId: data.data.fileId,
        });
        addToast("successfully added images", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 1500,
        });
        return data.data.url;
      } catch (e) {
        console.log(e);
      }
    }
  }

  let getQuestions = (submissions) => {
    console.log(submissions);
    let ques = {};
    let question = [];
    for (let i = 0; i < submissions.length; i++) {
      if (!ques[submissions[i].question_id._id]) {
        question.push(submissions[i].question_id);
        ques[submissions[i].question_id._id] = {};
      }
    }
    setQuestions(question);
  };

  function daysInMonth(month) {
    var count = moment().month(month).daysInMonth();
    var days = [];
    for (var i = 1; i < count + 1; i++) {
      days.push(moment().month(month).date(i).format("YYYY-MM-DD"));
    }
    return days;
  }

  let fetchProfileDetails = async () => {
    try {
      let data = await axios.get(
        `http://localhost:3001/user/get-profile-details/${user._id}`
      );
      if (data.data && data.data.data) {
        console.log(data);
        let submission = data.data.data.submission;
        let accData = data.data.data.accuracy;
        let users = data.data.data.user;
        setProfilePic(users.upload_profile_pic);
        setFileId(users.fileId);
        let totalSubs = 0;
        for (let i = 0; i < accData.length; i++) {
          totalSubs += accData[i].total_submission_for_question;
        }
        setTotalSubmission(totalSubs);
        setSuccessfulSubmissions(accData.length);
        console.log(totalSubs);
        console.log(accData.length);
        setAccuracy(
          (
            (accData.length / (totalSubs === 0 ? 1 : totalSubs)) * 100 +
            ""
          ).split(".")[0]
        );
        let daysMap = {};
        var days = [];
        for (let i = 0; i < 12; i++) {
          let daysInMon = daysInMonth(i);
          days = days.concat(daysInMon);
        }
        for (let i = 0; i < submission.length; i++) {
          let date = new Date(submission[i].createdAt)
            .toISOString()
            .slice(0, 10);
          if (daysMap[date]) {
            daysMap[date].count = daysMap[date].count + 1;
            if (daysMap[date].count >= 4) {
              daysMap[date].level = 4;
            } else if (daysMap[date].count == 3) {
              daysMap[date].level = 3;
            } else if (daysMap[date].count == 2) {
              daysMap[date].level = 2;
            } else if (daysMap[date].count == 1) {
              daysMap[date].level = 1;
            }
            if (daysMap[date].submission)
              daysMap[date].submission.push(submission[i]);
          } else {
            daysMap[date] = {
              count: 1,
              date: date,
              level: 1,
              submission: [submission[i]],
            };
          }
        }
        let activityData = [];
        for (let i = 0; i < days.length; i++) {
          if (daysMap[days[i]]) {
            activityData.push(daysMap[days[i]]);
          } else {
            activityData.push({
              count: 0,
              date: days[i],
              level: 0,
              submission: [],
            });
          }
        }
        setActData(activityData);
      }
    } catch (e) {
      addToast("Error Occurred in Fetching Profile Details", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (user) fetchProfileDetails();
  }, [user]);
  return !user ? (
    <Navigate to={"/login"} />
  ) : (
    <>
      <Nav />
      <div className="my-profile">
        <div className="row profile-info">
          <div className="profile-pic-container col-6">
            <div className="profile-pic-cont">
              <div className="profile-pic">
                <img
                  src={
                    profilePic ??
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                  alt=""
                />
              </div>
              <input
                type="file"
                className="profile-pic-input"
                name="somename"
                accept="image/png, image/jpeg, image/jpg"
                onChange={async (e) => {
                  var tmppath = URL.createObjectURL(e.target.files[0]);
                  console.log(e.target.files[0]);
                  let url = await uploadImage(e.target.files[0]);
                  if (url) setProfilePic(url);

                  //   setCompleteProfilePercent(completeProfilePercent + 1);
                }}
                size="chars"
              />
            </div>
          </div>
          <div className="col-6 inputfield-container">
            <p>{user.name}</p>
            <p>{user.email_id}</p>
          </div>
        </div>
        <div className="complete-profile-container">
          <div className="profile-progress">
            <div style={{ width: "100%" }} className="row">
              <div className="col-6 acccontainer d-flex justify-content-center align-items-center">
                <div className="circular-progress-container">
                  <CircularProgressbarWithChildren
                    value={accuracy}
                    text={`${accuracy}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      pathColor: "var(--orange-font)",
                      strokeLinecap: "butt",
                    })}
                  >
                    <RadialSeparators
                      count={12}
                      style={{
                        background: "#fff",
                        width: "2px",
                        // This needs to be equal to props.strokeWidth
                        height: `${10}%`,
                      }}
                    />
                  </CircularProgressbarWithChildren>
                </div>
              </div>
              <div className="col-6 acccontainer">
                <h5
                  style={{
                    whiteSpace: "nowrap",
                    color: "var(--orange-font)",
                    fontWeight: "bolder",
                  }}
                >
                  Your Accuracy
                </h5>
                <div className="acctext">
                  <p>Total Submissions : {totalSubmissions}</p>
                  <p>Successful Submissions : {successfulSubmissions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="activity-calander">
          <ActivityCalendar
            blockMargin={4}
            color="green"
            data={actData}
            labels={{
              legend: {
                less: "Less",
                more: "More",
              },
              months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              totalCount: "{{count}} contributions in {{year}}",
              weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            }}
            eventHandlers={{
              onClick: (event) => (data) => {
                getQuestions(data.submission);
              },
              onMouseEnter: (event) => (data) => console.log("mouseEnter"),
            }}
            data-tip="tooltip"
          >
            <ReactTooltip
              textColor="black"
              backgroundColor="white"
              html={true}
            />
          </ActivityCalendar>
        </div>
        <div className="question-container">
          {questions.map((e, idx) => {
            return <QuestionHome key={idx} ques={e} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
