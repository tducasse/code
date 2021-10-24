import { useCallback, useEffect, useState } from "react";
import Peer from "peerjs";
import Console from "./Console";
import Editor from "./Editor";

function App() {
  const [code, setCode] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState("");
  const [connection, setConnection] = useState(null);

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
    script.id = "script";
    script.src = scriptUrl;
    const iframeHead =
      window.frames.code.document.getElementsByTagName("head")[0];
    window.frames.code.document.getElementById("script").outerHTML = "";
    iframeHead.appendChild(script);
  };

  const joinSession = () => {
    if (!sessionId || !peerId) return;
    setConnection(peer.connect(sessionId));
  };

  const addConnectionListeners = useCallback(
    (conn, sendCode = false) => {
      conn.on("data", (data) => {
        setCode(data);
      });
      conn.on("open", () => {
        // eslint-disable-next-line no-console
        console.log(`connection established`);
        if (sendCode) {
          conn.send(code);
        }
      });
    },
    [code]
  );

  useEffect(() => {
    if (connection) {
      addConnectionListeners(connection);
    }
  }, [addConnectionListeners, connection]);

  useEffect(() => {
    if (peer) {
      peer.on("open", setPeerId);
      if (peerId) {
        peer.on("connection", (conn) => {
          setSessionId(conn.peer);
          setConnection(conn);
          addConnectionListeners(conn, true);
        });
      }
    }
  }, [addConnectionListeners, peer, peerId]);

  useEffect(() => {
    setPeer(new Peer());
  }, []);

  const updateCode = (newCode) => {
    setCode(newCode);
    if (connection) {
      connection.send(newCode);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={run} type="button">
          Run
        </button>
        {peerId ? <div>Your id is {peerId}</div> : <div>Loading...</div>}

        {peerId && (
          <>
            {connection ? (
              <div>Connected to {sessionId}</div>
            ) : (
              <>
                <input
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  placeholder="session id"
                />
                <button onClick={joinSession} type="button">
                  Join session
                </button>
              </>
            )}
          </>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, height: "90vh" }}>
          <Editor onChange={updateCode} value={code} />
        </div>
        <div style={{ flex: 1, height: "90vh", backgroundColor: "#353535" }}>
          <Console source={window.frames.code} />
        </div>
      </div>
    </div>
  );
}

export default App;
