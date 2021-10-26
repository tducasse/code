import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Console, Hook, Unhook } from "console-feed";
import PropTypes from "prop-types";

const ConsoleWrapper = ({ iframe, className }) => {
  const [logs, setLogs] = useState([]);
  const [updated, setUpdated] = useState(0);
  const containerRef = useRef();

  useLayoutEffect(() => {
    document
      .getElementById(iframe)
      .addEventListener("load", () => setUpdated(+new Date()), true);
  }, [iframe]);

  useEffect(() => {
    Hook(
      window.frames[iframe].console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, [iframe, updated]);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [logs.length]);

  return (
    <div
      style={{ backgroundColor: "#353535" }}
      className={`${className} overflow-auto h-full`}
      ref={containerRef}
    >
      <Console logs={logs} variant="dark" />
    </div>
  );
};

ConsoleWrapper.propTypes = {
  iframe: PropTypes.string,
  className: PropTypes.string,
};
ConsoleWrapper.defaultProps = {
  iframe: "",
  className: "",
};

export default ConsoleWrapper;
