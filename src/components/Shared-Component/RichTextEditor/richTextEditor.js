
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './style.scss';

/* 
 * Use inline styling instead of react-quill classes for align
 */
const AlignStyle = Quill.import('attributors/style/align');
Quill.register(AlignStyle, true);

/* 
 * Fixes link input. 
 * If user didn't prefix the link with custom protocol, link wouldn't open in app.
 * We force prepend 'http:' if no protocol.
 */
const Link = Quill.import('formats/link');
const builtInFunc = Link.sanitize;
Link.sanitize = function customSanitizeLinkInput(linkValueInput) {
    let val = linkValueInput;

    // Do nothing, since this implies user's already using a custom protocol
    if (/^\w+:/.test(val));
    else if (!/^https?:/.test(val))
        val = "http://" + val;

    return builtInFunc.call(this, val); // retain the built-in logic
};

/* 
 * Quill/React-Quill only offers image uploads from local machine. This
 * lets user input image URL
 */
function imageHandler() {
  const range = this.quill.getSelection();
  const value = prompt('Insert image URL');
  if (value){
      this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }
}

export default class RichTextEditor extends Component {
  componentDidMount() {
    // We're changing hyperlink tooltip because default one is https://quilljs.com/
    const { hyperlinkTooltip } = this.props;

    const input = document.querySelector(
      "input[data-link]"
      );
      input.dataset.link = hyperlinkTooltip;
      input.placeholder = hyperlinkTooltip;
  }

  render() {
    const {
      value,
      onChange,
      className,
      ...otherProps
    } = this.props;

    console.log(this.props , "this.props" )
    const classes = classNames('rich-text-editor', className);

    return (
        <ReactQuill
          className={classes}
          theme="snow" 
          value={value} 
          modules={RichTextEditor.modules} 
          formats={RichTextEditor.formats}
          onChange={onChange} 
          {...otherProps}
        />
    );
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
RichTextEditor.modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ["bold", "italic", "underline", "strike", { color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { align: [] }
      ],
      ["link", "image"],
      ["clean"]
    ],
    handlers: {
      image: imageHandler
  },
},
  clipboard: {
    matchVisual: false,
  }
};

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
RichTextEditor.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
];

RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  hyperlinkTooltip: PropTypes.string,
};

