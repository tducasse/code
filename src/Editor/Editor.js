import MonacoEditor from "@monaco-editor/react";
import PropTypes from "prop-types";

const Editor = ({ onChange }) => {
  return (
    <MonacoEditor
      defaultLanguage="javascript"
      theme="vs-dark"
      onChange={onChange}
    />
  );
};

Editor.propTypes = {
  onChange: PropTypes.func,
};
Editor.defaultProps = {
  onChange: () => {},
};

export default Editor;
