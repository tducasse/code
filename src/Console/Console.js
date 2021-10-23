import { useState, useEffect } from "react";
import { Console, Hook, Unhook } from "console-feed";
import PropTypes from "prop-types";

const ConsoleWrapper = ({ source }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    Hook(
      source.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, [source]);

  return (
    <div style={{ backgroundColor: "#353535" }}>
      <Console logs={logs} variant="dark" />
    </div>
  );
};

ConsoleWrapper.propTypes = {
  source: PropTypes.shape({
    console: PropTypes.shape({
      log: PropTypes.func,
    }),
  }),
};
ConsoleWrapper.defaultProps = {
  source: {
    console: {
      log: () => {},
    },
  },
};

export default ConsoleWrapper;
