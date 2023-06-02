import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import {marked} from 'marked';
import {mangle} from 'marked-mangle';
import "./MarkdownRenderer.css"

marked.use(mangle());
marked.setOptions({headerIds: false});

const MarkdownRenderer = ({ markdown }) => {
  const sanitizedHTML = DOMPurify.sanitize(marked.parse(markdown));
  return (
    <div className="markdown-renderer">
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    </div>
  );
};

MarkdownRenderer.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default MarkdownRenderer;