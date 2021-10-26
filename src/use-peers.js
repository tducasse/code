import Peer from "peerjs";
import { useCallback, useEffect, useState } from "react";

const usePeers = ({ setCode, code, setTests, tests }) => {
  const [peer, setPeer] = useState();
  const [peerId, setPeerId] = useState("");
  const [connections, setConnections] = useState([]);

  const broadcast = useCallback(
    (message) => {
      if (peerId) {
        connections.forEach((conn) => conn.send(message));
      }
    },
    [connections, peerId]
  );

  const connect = useCallback(
    (sessionId) => {
      if (peerId) {
        const conn = peer.connect(sessionId);
        conn.on("open", () => {
          conn.on("data", (data) => {
            if (data.peers) {
              data.peers.forEach((p) => {
                // eslint-disable-next-line no-underscore-dangle
                if (!peer._connections.has(p)) {
                  connect(p);
                }
              });
            } else if (data.code) {
              setCode(data.code);
            } else if (data.tests) {
              setTests(data.tests);
            }
          });
        });
        setConnections((c) => {
          if (c.findIndex((el) => el.peer === conn.peer) < 0) {
            return [...c, conn];
          }
          return c;
        });
      }
    },
    [peer, peerId, setCode, setTests]
  );

  const sendPeers = (conn, peers) => {
    conn.send({ peers: peers.filter((p) => p !== conn.peer) });
  };

  useEffect(() => {
    setPeer(new Peer());
  }, []);

  useEffect(() => {
    if (peer) {
      peer.on(
        "open",
        // eslint-disable-next-line no-console
        (id) => console.log(`Your peerId is ${id}`) || setPeerId(id)
      );
      peer.on("connection", (conn) => {
        if (peerId) {
          const peers = Array.from(
            new Set([peerId, ...connections.map((c) => c.peer)])
          );
          setConnections((c) => {
            if (c.findIndex((el) => el.peer === conn.peer) < 0) {
              return [...c, conn];
            }
            return c;
          });
          conn.on("data", (data) => {
            if (data.code) {
              setCode(data.code);
            } else if (data.tests) {
              setTests(data.tests);
            }
          });
          conn.on("open", () => {
            sendPeers(conn, peers);
            conn.send({ tests });
            conn.send({ code });
          });
        }
      });
    }
  }, [connections, peer, peerId, code, setCode, setTests, tests]);

  return {
    broadcast,
    peerId,
    connect,
  };
};

export default usePeers;
