import Editor from "../Editor/editor";
import {  Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Box, MenuItem, Select } from "@material-ui/core";
import { Navigate, useLocation } from "react-router";
import "../styles/Questions/Question.css";
import { langChangeCause, languages, themes } from "../Editor/constants";
import { useSelector } from "react-redux";
import QuestionModal from "./QuestionDialog";
import axios from "axios";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
let Question = () => {
  const [value, setValue] = useState(0);
  let locState = useLocation();
  const [langCode, setLangCode] = useState("java-2");
  let state = useSelector((state) => state);
  const [theme, setTheme] = useState("tomorrow_night");
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [submission, setSubmission] = useState([]);
  const [langchangecause, setLangChangeCause] = useState(
    langChangeCause.dropdown
  );

  const checkResultStatus = async (joodleRes, code) => {
    let status = "";
    if (
      joodleRes.trim().replace("\n", "") ===
      locState.state.sample_test_case_output.trim().replace("\n", "")
    ) {
      status = "success";
    } else {
      status = "failed";
    }
    setStatusCode(status);
    try {
      let postSubmission = await axios.post(
        "http://localhost:3001/submission/create-sub",
        {
          user_id: state._id,
          question_id: locState.state._id,
          submit_code: code,
          ex_status: status,
          points: locState.state.points,
          language_code: langCode,
        }
      );
      console.log(postSubmission.data);
    } catch (e) {
      console.log(e);
    }

    handleOpen();
  };
  const fetchSubmission = async () => {
    try {
      let fetchSubmissions = await axios.get(
        `http://localhost:3001/submission/get-sub-id/${locState.state._id}/${state._id}`
      );
      if (fetchSubmissions.data && fetchSubmissions.data.data) {
        setSubmission(fetchSubmissions.data.data);
      }
      console.log(fetchSubmissions.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event, newValue) => {
    console.log(event, newValue);
    if (newValue === 1) {
      fetchSubmission();
    }
    setValue(newValue);
  };

  const resetCodeVar = () => {
    setCode("");
  };

  let handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  console.log(locState);
  return locState.state ? (
    <>
      <QuestionModal open={open} status={statusCode} />
      <div className="solve-page">
        <div className="question-content">
          <div className="tab-container">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Question" />
              <Tab label="Submissions History" />
            </Tabs>
          </div>
          <TabPanel value={value} index={0}>
            <div className="question-panel">
              <h3>{locState.state.title}</h3>

              <p>{locState.state.description}</p>
              <h4>Sample Input</h4>
              <div className="input-container">
                <p>{locState.state.sample_test_case_input}</p>
              </div>
              <div className="output">
                <h4>Sample Output</h4>
                <div className="output-container">
                  <p>{locState.state.sample_test_case_output}</p>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Language</th>
                  <th scope="col">Status</th>
                  <th scope="col">Extract Code</th>
                </tr>
              </thead>
              <tbody>
                {submission.map((el, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope="row">{idx + 1}</th>
                      <th scope="row" style={{ textTransform: "capitalize" }}>
                        {/* {el.language_code} */}
                        {languages[el.language_code].language}
                      </th>
                      <td>{el.ex_status}</td>
                      <td>
                        <div
                          onClick={() => {
                            setCode(el.submit_code);
                            setLangChangeCause(langChangeCause.submission);
                            setLangCode(el.language_code);
                          }}
                          className="paste-code"
                        >
                          Extract
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TabPanel>
        </div>
        <div className="editor-container">
          <div className="select-lang">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={langCode}
              label="java-2"
              onChange={(e) => {
                setLangCode(e.target.value);
                setLangChangeCause(langChangeCause.dropdown);
              }}
            >
              <MenuItem value={"java-2"}>Java - 10.0.1</MenuItem>
              <MenuItem value={"c-3"}>C - GCC 8.1.0</MenuItem>
              <MenuItem value={"cpp-3"}>C++ - GCC 8.1.0</MenuItem>python3
              <MenuItem value={"python3-3"}>Python - 3.7.4</MenuItem>
            </Select>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theme}
              label="github"
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((e, idx) => {
                return <MenuItem value={e}>{e}</MenuItem>;
              })}
            </Select>
          </div>
          <Editor
            codevar={code}
            languagecode={langCode}
            themecode={theme}
            resetCodeVar={resetCodeVar}
            question={locState.state}
            languageChangeCause={langchangecause}
            checkResultStatus={checkResultStatus}
          />
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Question;
