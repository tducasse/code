import { useState, useEffect } from "react";
import Console from "./Console";
import Editor from "./Editor";
import usePeers from "./use-peers";
import run from "./code";
import Toast from "./Toast";

function App() {
  const [code, setCode] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const { peerId, connect, broadcast } = usePeers({
    setCode,
    code,
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
              onClick={() => run(code)}
              type="button"
            >
              Run
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
        <div className="flex flex-row h-full overflow-hidden">
          <div className="flex-1">
            <Editor onChange={updateCode} value={code} />
          </div>
          <div className="flex-1 bg-gray-700">
            <Console source={window.frames.code} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
