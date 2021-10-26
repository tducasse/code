import { useState, useEffect } from "react";
import Console from "./Console";
import Editor from "./Editor";
import usePeers from "./use-peers";
import run from "./code";
import Toast from "./Toast";

function App() {
  const [code, setCode] = useState("");
  const [tests, setTests] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [codeTab, setCodeTab] = useState("code");
  const [consoleTab, setConsoleTab] = useState("code");

  const { peerId, connect, broadcast } = usePeers({
    setCode,
    code,
    setTests,
    tests,
  });

  useEffect(() => {
    const sessionUrl = window.location.pathname.replace("/", "");
    if (sessionUrl) {
      connect(sessionUrl);
    }
  }, [connect]);

  const updateCode = (val) => {
    setCode(val);
    broadcast({ code: val });
  };

  const updateTests = (val) => {
    setTests(val);
    broadcast({ tests: val });
  };

  const copyLink = async () => {
    const link = `${window.location.origin}/${peerId}`;
    try {
      await navigator.clipboard.writeText(link);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 1500);
    } catch (e) {
      setErrorToast(true);
      setTimeout(() => setErrorToast(false), 1500);
    }
  };

  const switchTo = (tab) => () => setCodeTab(tab);
  const switchConsoleTo = (tab) => () => setConsoleTab(tab);

  const onClick = (type) => () => {
    switchConsoleTo(type)();
    switchTo(type)();
    run({ tests, code, iframe: type });
  };

  return (
    <>
      {errorToast && <Toast type="error" text="Could not copy your link" />}
      {successToast && (
        <Toast type="success" text="Successfully copied your link" />
      )}
      <div className="flex flex-col h-screen">
        <div className="flex flex-row items-center p-2">
          <div className="flex flex-1 flex-row gap-2 items-center">
            <button
              className="px-4 py-2 text-white font-bold bg-green-500 hover:bg-green-700 rounded"
              onClick={onClick("code")}
              type="button"
            >
              Run
            </button>
            <button
              className="px-4 py-2 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded"
              onClick={onClick("tests")}
              type="button"
            >
              Run tests
            </button>
          </div>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-blue-500 hover:text-white font-bold hover:bg-blue-500 border border-blue-500 hover:border-blue-500 rounded"
            onClick={copyLink}
            disabled={!peerId}
          >
            <span style={{ ...(!peerId && { visibility: "hidden" }) }}>
              Copy link
            </span>
            <span
              style={{ ...(peerId && { visibility: "hidden" }) }}
              className="absolute w-6 h-6 border border-b-2 border-t-2 border-solid border-blue-500 rounded-full animate-spin"
            />
          </button>
          <div />
        </div>
        <div className="flex flex-row justify-between">
          <ul className="list-reset flex">
            <li className="-mb-px mr-1">
              <button
                type="button"
                onClick={switchTo("code")}
                className={`px-4 py-2 ${
                  codeTab === "code"
                    ? "font-semibold text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Code
              </button>
            </li>
            <li className="mr-1">
              <button
                type="button"
                onClick={switchTo("tests")}
                className={`px-4 py-2 ${
                  codeTab === "tests"
                    ? "font-semibold text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Tests
              </button>
            </li>
          </ul>
          <ul className="list-reset flex">
            <li className="-mb-px mr-1">
              <button
                type="button"
                onClick={switchConsoleTo("code")}
                className={`px-4 py-2 ${
                  consoleTab === "code"
                    ? "font-semibold text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Code
              </button>
            </li>
            <li className="mr-1">
              <button
                type="button"
                onClick={switchConsoleTo("tests")}
                className={`px-4 py-2 ${
                  consoleTab === "tests"
                    ? "font-semibold text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Tests
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-row h-full overflow-hidden">
          <div className="flex-1">
            <Editor
              onChange={updateCode}
              value={code}
              className={codeTab === "code" ? "" : "hidden"}
            />
            <Editor
              onChange={updateTests}
              value={tests}
              className={codeTab === "tests" ? "" : "hidden"}
            />
          </div>
          <div className="flex-1 h-full bg-gray-700">
            <Console
              iframe="code"
              className={consoleTab === "code" ? "" : "hidden"}
            />
            <iframe
              name="tests"
              id="tests"
              title="Tests"
              src="tests.html"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              className={`h-full w-full ${
                consoleTab === "tests" ? "" : "hidden"
              }`}
              style={{ background: "#222" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
