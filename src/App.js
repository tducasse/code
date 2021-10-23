import { useState } from "react";
import Console from "./Console";
import Editor from "./Editor";

function App() {
  const [code, setCode] = useState("");

  const run = () => {
    const scriptUrl = URL.createObjectURL(
      new Blob(
        [
          `
        try {
          ${code}
        } catch(e) {
          console.error(e.message)
        }
        `,
        ],
        {
          type: "text/javascript",
        }
      )
    );
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptUrl;
    const iframeHead =
      window.frames.code.document.getElementsByTagName("head")[0];
    iframeHead.textContent = "";
    iframeHead.appendChild(script);
  };

  return (
    <div>
      <button onClick={run} type="button">
        Run
      </button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, height: "90vh" }}>
          <Editor onChange={setCode} />
        </div>
        <div style={{ flex: 1, height: "90vh", backgroundColor: "#353535" }}>
          <Console source={window.frames.code} />
        </div>
      </div>
    </div>
  );
}

export default App;
