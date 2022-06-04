// import React, { useContext, useEffect, useState } from "react";
// // import "./editor.scss";

// import {
//   Button,
//   CircularProgress,
//   FormControl,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@material-ui/core";

// import SettingsIcon from "@material-ui/icons/Settings";
// import { fontSizes, langs, languageCode, themes } from "./constants";
// import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
// import EditorSetting from "./editorSetting";
// import CachedIcon from "@material-ui/icons/Cached";
// import { compileCode } from "../../../containers/content/dataManager";
// import SocketContext from "../../../Context/SocketContext";
// import { useHistory } from "react-router";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { capitalize } from "./utils/utils";

// export default function EditorHeader({
//   lang,
//   setLang,
//   theme,
//   fontSize,
//   setTheme,
//   setFullScreen,
//   fullScreen,
//   setFontSize,
//   code,
//   input,
//   setOutput,
//   allowFullScreen,
//   readOnlyMode,
//   setOpenConsole,
//   handleResetCode,
//   setIsOutput,
//   setEventType,
//   contestId,
//   batchId,
// }) {
//   const user = useSelector((state) => state.user);
//   const history = useHistory();
//   const handleLangChange = (e) => {
//     setLang(e.target.value);
//   };
//   const [loading, setLoading] = useState(false);
//   const socket = useContext(SocketContext);
//   const handleCompileCode = () => {
//     if (!user.email) {
//       history.push("/GettingStarted");
//       return;
//     }

//     if (code.trim().length == 0) {
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

//     setLoading(true);
//     const language_id = languageCode[lang];
//     compileCode({
//       language_id,
//       sourceCode: code,
//       input,
//       contestId,
//       batchId,
//     })
//       .then((data) => {
//         setEventType("run");
//         setOutput(data);
//       })
//       .then(() => setOpenConsole(true))
//       .catch(console.error);
//   };

//   useEffect(() => {}, [loading]);

//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   useEffect(() => {
//     if (contestId) {
//       socket.on("test-case-contest-compiled", (data) => {
//         setOutput(data);
//         setOpenConsole(true);
//         setIsOutput(true);
//         setLoading(false);
//       });
//       return;
//     }
//     socket.on("test-case-compiled", (data) => {
//       setOutput(data);
//       setOpenConsole(true);
//       setIsOutput(true);
//       setLoading(false);
//     });
//   }, []);
//   return (
//     <>
//       <div className="editor_header">
//         <FormControl>
//           <InputLabel shrink id="demo-simple-select-placeholder-label-label">
//             Languages
//           </InputLabel>
//           <Select
//             style={{ width: "150px", marginRight: "10px" }}
//             labelId="demo-simple-select-placeholder-label-label"
//             id="demo-simple-select-placeholder-label"
//             value={lang}
//             onChange={handleLangChange}
//             displayEmpty
//           >
//             {langs.map((lang, key) => {
//               return (
//                 <MenuItem value={lang} key={key}>
//                   {capitalize(lang === "c_cpp" ? "C++" : lang)}
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </FormControl>

//         <div className="header_buttons">
//           <Button onClick={() => handleClickOpen()}>
//             <SettingsIcon />
//           </Button>
//           <EditorSetting
//             open={open}
//             setOpen={setOpen}
//             theme={theme}
//             fontSize={fontSize}
//             setTheme={setTheme}
//             setFontSize={setFontSize}
//           ></EditorSetting>

//           {!readOnlyMode && (
//             <IconButton onClick={handleResetCode}>
//               <CachedIcon color="black" />
//             </IconButton>
//           )}

//           {allowFullScreen && (
//             <IconButton
//               onClick={() => {
//                 setFullScreen(!fullScreen);
//               }}
//             >
//               {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
//             </IconButton>
//           )}
//         </div>

//         {!readOnlyMode && (
//           <Button
//             style={{ height: "30px !important", padding: "5px 20px" }}
//             variant="contained"
//             color="primary"
//             disabled={loading}
//             onClick={handleCompileCode}
//           >
//             Run
//             {loading ? (
//               <CircularProgress
//                 style={{ width: 15, height: 15, position: "absolute" }}
//               />
//             ) : (
//               ""
//             )}
//           </Button>
//         )}
//       </div>
//     </>
//   );
// }
