import React  from 'react';
import PropTypes from 'prop-types';
import './MarkdownInputBox.css';

const MarkdownInputBox = ({ value, onChange, handleUndo }) => {

  return (
    <div className="textarea-container">
      <textarea
        id="markdown-input-box"
        className="textarea"
        value={value}
        onChange={onChange}
        onKeyDown={handleUndo}
      />
    </div>
  );
};

MarkdownInputBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
};

export default MarkdownInputBox;
