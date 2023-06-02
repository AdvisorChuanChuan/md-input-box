import './App.css';
import React, { useState, useRef } from 'react';
import MarkdownButtons from './components/MarkdownButtons';
import MarkdownInputBox from './components/MarkdownInputBox';
import MarkdownRenderer from './components/MarkdownRenderer';

function App() {
  const [value, setValue] = useState("");
  const undoStackRef = useRef([]);
  const MAX_STACK_SIZE = 10;

  const handleChange = (event) => {
    if (undoStackRef.current.length >= MAX_STACK_SIZE) {
      undoStackRef.current.shift();
    }
    undoStackRef.current.push(value);
    setValue(event.target.value);
  };

  const handleCommandClick = (command) => {
    const inputBox = document.getElementById('markdown-input-box');
    const startPos = inputBox.selectionStart;
    const endPos = inputBox.selectionEnd;
    if (undoStackRef.current.length >= MAX_STACK_SIZE) {
      undoStackRef.current.shift();
    }
    undoStackRef.current.push(value);
    const lineEnd = value.indexOf('\n', startPos);
    const lineStart = value.lastIndexOf('\n', startPos - 1);
    const beforeStart = value.slice(0, startPos);
    const afterEnd = value.slice(endPos);
    const betweenStartEnd = value.slice(startPos, endPos);
    const beforeLineEnd = value.slice(0, lineEnd === -1 ? value.length : lineEnd);
    const afterLineEnd = value.slice(lineEnd === -1 ? value.length : lineEnd);
    let newValue = "";
    switch (command) {
      case 'title':
        if (value.length === 0 || (startPos === 0 && value.charAt(0) === '\n') ||
          (startPos === value.length && value.charAt(value.length - 1) === '\n') ||
          (value.charAt(startPos-1) === '\n' && value.charAt(startPos) === '\n')) {
          // An empty line
          newValue = beforeStart + "# New Section" + value.slice(startPos);
          setValue(newValue);
        } else {
          newValue = value.slice(0, lineStart + 1) +
            (value.charAt(lineStart+1) === '#' ? "#" : "# ") +
            value.slice(lineStart + 1);
          setValue(newValue);
        }
        break;
      case 'bold':
        newValue = beforeStart + "**" + betweenStartEnd + "**" + afterEnd;
        setValue(newValue);
        break;
      case 'italic':
        newValue = beforeStart + "*" + betweenStartEnd + "*" + afterEnd;
        setValue(newValue);
        break;
      case 'code':
        if (startPos !== endPos) {
          newValue = beforeStart + "`" + betweenStartEnd + "`" + afterEnd;
          setValue(newValue);
        } else {
          newValue = beforeLineEnd + "\n```\nCode Block\n```\n" + afterLineEnd;
          setValue(newValue);
        }
        break;
      case 'link':
        if (startPos !== endPos) {
          newValue = beforeStart + "[" + betweenStartEnd + "](https://)" + afterEnd;
          setValue(newValue);
        } else {
          newValue = beforeStart + "[Link Text](https://)" + afterEnd;
          setValue(newValue);
        }
        break;
      case 'indent':
        newValue = beforeLineEnd + "\n> Indented Block\n\n" + afterLineEnd;
        setValue(newValue);
        break;
      case 'bullet':
        newValue = beforeLineEnd + "\n* List Item\n* List Item\n\n" + afterLineEnd;
        setValue(newValue);
        break;
      case 'number':
        newValue = beforeLineEnd + "\n1. List Item\n2. List Item\n\n" + afterLineEnd;
        setValue(newValue);
        break;
      case 'separate':
        newValue = beforeLineEnd + "\n\n---\n\n" + afterLineEnd;
        setValue(newValue);
        break;
      default:
        console.error("Invalid command: ", command);
    }
    inputBox.focus();
  };

  const handleUndo = (event) => {
    if (event.metaKey && event.key === 'z') {
      event.preventDefault();
      if (undoStackRef.current.length > 0) {
        const prevValue = undoStackRef.current.pop();
        setValue(prevValue);
      }
    }
  };

  return (
    <div className="App">
      <MarkdownButtons handleCommandClick={handleCommandClick}/>
      <MarkdownInputBox value={value} onChange={handleChange} handleUndo={handleUndo}/>
      <MarkdownRenderer markdown={value}/>
    </div>
  );
}

export default App;
