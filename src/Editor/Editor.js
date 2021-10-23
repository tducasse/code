import MonacoEditor from "@monaco-editor/react";
import PropTypes from "prop-types";

const Editor = ({ value, onChange }) => {
  return (
    <MonacoEditor
      defaultLanguage="javascript"
      theme="vs-dark"
      onChange={onChange}
      value={value}
    />
  );
};

Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
Editor.defaultProps = {
  onChange: () => {},
  value: "",
};

export default Editor;
