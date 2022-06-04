import React, { useState, useEffect, useRef } from "react";
import "./editor.scss";
import "axios";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import { langChangeCause, langs, languages, themes } from "./constants";
import axios from "axios";
// import EditorHeader from "./header";
// import { debounce, isJsonString } from "../../../Utils/utils";
// import EditorFooter from "./footer";
langs.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

const Editor = ({
  showHeader = true,
  data,
  uuid,
  showFooter = true,
  submittedCode,
  allowFullScreen = true,
  readOnlyMode = false,
  isNavBar,
  contestId,
  resetCodeVar,
  checkResultStatus,
  batchId,
  languagecode,
  themecode,
  languageChangeCause,
  codevar,
  question,
}) => {
  const [code, setCode] = useState(languages[languagecode].startupcode);

  console.log(code);
  const [lang, setLang] = useState(langs[0]);
  const [theme, setTheme] = useState(themecode);
  const [fontSize, setFontSize] = useState(16);
  const [fullScreen, setFullScreen] = useState(false);
  const contestEditorRef = useRef();
  const [inputExt, setInputExt] = useState("");
  const [compileInput, setComplieInput] = useState(
    question.sample_test_case_input
  );
  const [dataOut, setDataOut] = useState(null);
  const clickHandle = async () => {
    const ClientID = "3fb4c3c2b9e2c9aaed4b4cdf9041e75c";
    const ClientSecret =
      "7edf0dc08a1d0e85f73b87b4c01dc6445f3a9867d860e2425da34e271be1eab0";
    console.log(code.trim());
    let data = await axios.post("/execute", {
      script: code.trim(),
      language: languages[languagecode].language,
      versionIndex: languages[languagecode].versionIndex,
      // language: "csharp",
      // versionIndex: "4",
      stdin: compileInput,
      clientId: ClientID,
      clientSecret: ClientSecret,
    });
    setDataOut(data);
    checkResultStatus(data.data.output, code.trim());
  };

  const clickRunHandle = async () => {
    const ClientID = "3fb4c3c2b9e2c9aaed4b4cdf9041e75c";
    const ClientSecret =
      "7edf0dc08a1d0e85f73b87b4c01dc6445f3a9867d860e2425da34e271be1eab0";
    console.log(code.trim());
    let data = await axios.post("/execute", {
      script: code.trim(),
      language: languages[languagecode].language,
      versionIndex: languages[languagecode].versionIndex,
      // language: "csharp",
      // versionIndex: "4",
      stdin: inputExt,
      clientId: ClientID,
      clientSecret: ClientSecret,
    });
    console.log(data);
    setDataOut(data);
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setFullScreen(false);
    }
  };

  useEffect(() => {
    setCode(languages[languagecode].startupcode);
    setTheme(themecode);
    if (codevar && languageChangeCause === langChangeCause.submission) {
      setCode(codevar);
    }
  }, [languagecode, themecode, codevar, languageChangeCause]);
  return (
    <>
      <div
        // onContextMenu={contestId ? handleRightClick : undefined}
        // onContextMenu={handleRightClick}
        ref={contestEditorRef}
        className={["editor_container", fullScreen ? "editor_full" : ""].join(
          " "
        )}
        onKeyDown={handleEscape}
      >
        {/* {showHeader ? <EditorHeader {...editorHeaderProps} /> : null} */}
        <div className="editor_wrap">
          <AceEditor
            style={{
              width: "auto",
            }}
            editorProps={{ $blockScrolling: Infinity }}
            commands={
              contestId
                ? [
                    {
                      // commands is array of key bindings.
                      name: "pastline", //name for the key binding.
                      bindKey: {
                        win: "ctrl-c|ctrl-v|ctrl-x|ctrl-shift-v|shift-del|shift-f10",
                        mac: "Command-V|Command-C|Command-X",
                      }, //key combination used for the command.
                      exec: function (editor) {
                        const editorEvents = [
                          "dragenter",
                          "dragover",
                          "dragend",
                          "dragstart",
                          "dragleave",
                          "drop",
                        ];
                        for (const events of editorEvents) {
                          editor.container.addEventListener(
                            events,
                            function (e) {
                              e.stopPropagation();
                            },
                            true
                          );
                        }
                      },
                    },
                  ]
                : undefined
            }
            placeholder="Write your code here..."
            mode={lang}
            theme={theme}
            name="code-editor"
            // onChange={debounce(updateCode, 400)}
            onChange={(e) => {
              resetCodeVar();
              setCode(e);
            }}
            fontSize={fontSize}
            showPrintMargin={true}
            showGutter={true}
            readOnly={readOnlyMode}
            highlightActiveLine={true}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            value={code}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />
        </div>
        <div className="submit-btn-container">
          {" "}
          <div className="time-taken">
            {dataOut && dataOut.data ? (
              <span class="material-icons-outlined">timer</span>
            ) : (
              ""
            )}{" "}
            {dataOut && dataOut.data ? ` ${dataOut.data.cpuTime}` + " s" : ""}
          </div>
          <div className="space-taken">
            {dataOut && dataOut.data ? (
              <span class="material-icons-outlined">memory</span>
            ) : (
              ""
            )}{" "}
            {dataOut && dataOut.data ? ` ${dataOut.data.memory}` : ""}
          </div>
          <div>
            <button className="submit-code-btn" onClick={clickHandle}>
              Submit
            </button>
            <button className="run-code-btn" onClick={clickRunHandle}>
              Run
            </button>
          </div>
        </div>
        <div>
          <textarea
            rows="4"
            value={inputExt}
            placeholder={"enter custom input here..."}
            onChange={(e) => setInputExt(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            boxShadow: "inset 0px 2px 15px 0px #000",
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            overflow: "scroll",
          }}
        >
          <code>
            {/* <pre>{JSON.stringify(dataOut, null, 2)}</pre> */}
            <pre
              style={{
                margin: "5px",
              }}
            >
              {dataOut && dataOut.data ? dataOut.data.output : "No Output"}
            </pre>
          </code>
        </div>
      </div>
    </>
  );
};

export default Editor;
