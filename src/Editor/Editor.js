import MonacoEditor from "@monaco-editor/react";
import PropTypes from "prop-types";

const Editor = ({ value, onChange, className }) => {
  return (
    <div className={`h-full ${className}`}>
      <MonacoEditor
        defaultLanguage="javascript"
        theme="vs-dark"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
};
Editor.defaultProps = {
  onChange: () => {},
  value: "",
  className: "",
};

export default Editor;
