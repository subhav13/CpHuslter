// import React, { useContext, useState, useEffect } from "react";
// // import "./footer.scss";

// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Button,
//   CircularProgress,
//   TextareaAutosize,
// } from "@material-ui/core";
// import {
//   ExpandMore,
//   History as HistoryIcon,
//   Memory as MemoryIcon,
//   CheckCircle as CheckCircleIcon,
//   CheckCircle,
//   Cancel,
// } from "@material-ui/icons";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import {
//   submitCode,
//   updateSubmission,
// } from "../../../containers/content/dataManager";
// import { languageCode } from "./constants";
// import SocketContext from "../../../Context/SocketContext";
// import { useHistory, useParams } from "react-router";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// export default function EditorFooter({
//   inputValue,
//   setInputValue,
//   output,
//   setOutput,
//   uuid,
//   lang,
//   source,
//   openConsole,
//   isOutput,
//   setIsOutput,
//   setOpenConsole,
//   eventType,
//   setEventType,
//   contestId,
// }) {
//   const history = useHistory();
//   const user = useSelector((state) => state.user);
//   const [testCases, setTestCases] = useState([]);
//   const [remainingTestCases, setRemainingTestCases] = useState(-1);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [maxPoints, setMaxPoints] = useState(0);
//   const [acceptedCount, setAcceptedCount] = useState(-1);
//   const { questionId: contentUuid, batchId: batchUuid } = useParams();
//   const socket = useContext(SocketContext);

//   const handleInputClick = () => {
//     setIsOutput(false);
//   };

//   const handleOutputClick = () => {
//     setIsOutput(true);
//   };

//   const handleOnSubmit = () => {
//     if (!user.email) {
//       history.push("/GettingStarted");
//       return;
//     }

//     if (source.trim().length == 0) {
//       toast.error("Empty Code Can't be Submitted", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: false,
//         progress: undefined,
//       });

//       return;
//     }

//     const language_id = languageCode[lang];

//     // setState as defaults
//     setAllStateAsDefault();

//     setAcceptedCount(0);
//     setIsOutput(true);
//     setIsSubmitted(true);
//     setRemainingTestCases(-1);
//     submitCode({
//       questionUuid: uuid,
//       language_id,
//       sourceCode: source,
//       batchUuid,
//       contentUuid,
//       contestId,
//     })
//       .then((data) => {
//         setTestCases([...data.tokens]);
//         return data;
//       })
//       .then((data) => {
//         setEventType("submitted");
//         setOpenConsole(true);
//         setMaxPoints(data?.points);
//         setRemainingTestCases(data?.tokens.length);
//       })
//       .catch((err) => {
//         console.error(err);
//       });

//     setOpenConsole(true);
//   };

//   useEffect(() => {
//     let count = 0;
//     if (contestId) {
//       socket.on("test-case-contest-submitted", (data) => {
//         console.log(++count);
//         setTestCases((prev) => {
//           return prev.map((prevData) => {
//             if (prevData.token == data.token) {
//               return {
//                 ...prevData,
//                 ...data,
//               };
//             } else {
//               return prevData;
//             }
//           });
//         });

//         if (data?.accepted) {
//           setAcceptedCount((prev) => prev + 1);
//         }
//         setRemainingTestCases((prev) => prev - 1);
//       });
//       return;
//     }

//     socket.on("test-case-submitted", (data) => {
//       setTestCases((prev) => {
//         return prev.map((prevData) => {
//           if (prevData.token == data.token) {
//             return {
//               ...prevData,
//               ...data,
//             };
//           } else {
//             return prevData;
//           }
//         });
//       });

//       if (data?.accepted) {
//         setAcceptedCount((prev) => prev + 1);
//       }
//       setRemainingTestCases((prev) => prev - 1);
//     });
//   }, []);

//   useEffect(() => {
//     if (remainingTestCases == 0) {
//       setIsSubmitted(false);

//       let updateTestCases = testCases.map((testCase) => {
//         return {
//           id: testCase.id,
//           time: testCase.time,
//           memory: testCase.memory,
//           message: testCase.message,
//           accepted: testCase.accepted,
//         };
//       });

//       updateSubmission({
//         testCases: updateTestCases,
//         codeLanguage: languageCode[lang],
//         submittedCode: source,
//         questionUuid: uuid,
//         batchUuid,
//         contentUuid,
//         contestId,
//       });
//     }
//   }, [remainingTestCases]);

//   const setAllStateAsDefault = () => {
//     setOutput({});
//     setTestCases([]);
//     setAcceptedCount(-1);
//     setRemainingTestCases(-1);
//     setIsSubmitted(false);
//     setEventType("");
//   };

//   useEffect(() => {
//     setAllStateAsDefault();
//     setInputValue("");
//   }, [uuid]);
//   return (
//     <>
//       <Accordion className="editionfooter_container" expanded={openConsole}>
//         <div className="footer_container">
//           <div className="footerButton_container">
//             <AccordionSummary
//               className="accordionButton"
//               onClick={() => setOpenConsole((prev) => !prev)}
//               expandIcon={<ExpandLessIcon />}
//             ></AccordionSummary>
//             <button className="footer_btn">Console</button>
//           </div>
//           <div className="compileButton_container">
//             <Button
//               className="compile_btn"
//               variant="contained"
//               color="primary"
//               disabled={isSubmitted}
//               onClick={handleOnSubmit}
//             >
//               Submit
//             </Button>
//           </div>
//         </div>
//         <AccordionDetails className="accordingDetial_container">
//           <div className="footerInputOutput_menu">
//             <div>
//               <button
//                 onClick={() => handleOutputClick()}
//                 className={["footermenu_item", isOutput ? "isActive" : ""].join(
//                   " "
//                 )}
//               >
//                 <div className="outputStatus_container"></div>
//                 Output
//               </button>
//               <button
//                 onClick={handleInputClick}
//                 className={["footermenu_item", isOutput ? "" : "isActive"].join(
//                   " "
//                 )}
//               >
//                 Input
//               </button>
//             </div>
//             {remainingTestCases != -1 && eventType == "submitted" ? (
//               <>
//                 <div
//                   className={[
//                     "successStatus",
//                     remainingTestCases == 0
//                       ? acceptedCount == testCases.length
//                         ? "isCorrect"
//                         : "isWrong"
//                       : "",
//                   ].join(" ")}
//                 >
//                   {remainingTestCases == 0 ? (
//                     acceptedCount == testCases.length ? (
//                       <CheckCircle style={{ fontSize: "1.5rem" }} />
//                     ) : (
//                       <Cancel style={{ fontSize: "1.5rem" }} />
//                     )
//                   ) : (
//                     <CircularProgress
//                       style={{
//                         width: 15,
//                         height: 15,
//                         margin: "0 10px",
//                       }}
//                     />
//                   )}

//                   {remainingTestCases == 0
//                     ? acceptedCount == testCases.length
//                       ? "Correct Answer"
//                       : "Wrong Answer"
//                     : "Status"}
//                 </div>
//               </>
//             ) : (
//               <>
//                 {Object.keys(output).length > 1 && eventType == "run" ? (
//                   output.accepted ? (
//                     <>
//                       <div className="run_content">
//                         <div className="run_status">
//                           <HistoryIcon className="outputIcon" />
//                           {output?.time ? output.time + "s" : "Time Limit"}
//                         </div>
//                         <div className="run_status">
//                           <MemoryIcon className="outputIcon" />
//                           {output?.memory ? output.memory : "Memory"}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <></>
//                   )
//                 ) : (
//                   <></>
//                 )}
//               </>
//             )}
//           </div>

//           <div className="footercontent_container ">
//             {isOutput ? (
//               <div className="footerOutput_container custom_scrollBar">
//                 {testCases?.length && eventType == "submitted" ? (
//                   testCases?.map((testCase, index) => {
//                     return (
//                       <SingleTestCase
//                         key={testCase?.token}
//                         testCase={testCase}
//                         index={index}
//                       />
//                     );
//                   })
//                 ) : (
//                   <></>
//                 )}

//                 {Object.keys(output).length > 1 && eventType == "run" ? (
//                   output.accepted ? (
//                     <>
//                       <div className="output_content">
//                         <pre>{output?.stdout}</pre>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className={["runError", "isWrong"].join(" ")}>
//                         <Cancel className="wrongIcon" />
//                         {output.message}
//                       </div>
//                       <p className="output_error">{output.compile_output}</p>
//                     </>
//                   )
//                 ) : (
//                   <></>
//                 )}
//               </div>
//             ) : (
//               <div className="footerInput_container">
//                 <TextareaAutosize
//                   className="inputTextArea"
//                   minRows={4}
//                   maxRows={4}
//                   aria-label="maximum height"
//                   placeholder={
//                     "Add your own input here , else programe will run against default test case"
//                   }
//                   style={{ resize: "none" }}
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                 />
//               </div>
//             )}
//           </div>
//         </AccordionDetails>
//       </Accordion>
//     </>
//   );
// }

// const SingleTestCase = ({ testCase, index }) => {
//   return (
//     <div className="outputButtons">
//       <div className="footer_btn">
//         {testCase.accepted != null ? (
//           testCase.accepted ? (
//             <CheckCircle style={{ color: "green" }} className="outputIcon" />
//           ) : (
//             <Cancel style={{ color: "red" }} className="outputIcon" />
//           )
//         ) : (
//           <CircularProgress
//             style={{
//               width: 15,
//               height: 15,
//               margin: "0 10px",
//             }}
//           />
//         )}
//         {`Test Case ${index + 1}`}
//       </div>
//       <div className="footer_btn">
//         <HistoryIcon className="outputIcon" />
//         {testCase?.time ? testCase.time + "s" : "Time Limit"}
//       </div>
//       <div className="footer_btn">
//         <MemoryIcon className="outputIcon" />
//         {testCase?.memory ? testCase.memory + "Kb" : "Memory"}
//       </div>
//     </div>
//   );
// };
