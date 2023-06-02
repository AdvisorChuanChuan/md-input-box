import React from 'react';
import "./MarkdownButtons.css"
import { Title, FormatBold, FormatItalic, Code, Link, FormatIndentIncrease, FormatListBulleted, FormatListNumbered, Remove } from '@material-ui/icons';

const MarkdownButtons = ({ handleCommandClick }) => {
  return (
    <div className="markdown-buttons">
      <button onClick={() => handleCommandClick('title')}>
        <Title /> Title
      </button>
      <button onClick={() => handleCommandClick('bold')}>
        <FormatBold /> Bold
      </button>
      <button onClick={() => handleCommandClick('italic')}>
        <FormatItalic /> Italic
      </button>
      <button onClick={() => handleCommandClick('code')}>
        <Code /> Code
      </button>
      <button onClick={() => handleCommandClick('link')}>
        <Link /> Link
      </button>
      <button onClick={() => handleCommandClick('indent')}>
        <FormatIndentIncrease /> Indent
      </button>
      <button onClick={() => handleCommandClick('bullet')}>
        <FormatListBulleted /> Bullet List
      </button>
      <button onClick={() => handleCommandClick('number')}>
        <FormatListNumbered /> Number List
      </button>
      <button onClick={() => handleCommandClick('separate')}>
        <Remove /> Horizontal Rule
      </button>
    </div>
  );
};

export default MarkdownButtons;