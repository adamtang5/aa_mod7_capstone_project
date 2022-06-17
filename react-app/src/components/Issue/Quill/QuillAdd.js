import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
import { QuillEditor } from './QuillEditor';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

const QuillAdd = ({ placeholder }) => {
    const [body, setBody] = useState("");
    const [error, setError] = useState([]);

    return (
        <div className="quill-add">
            {/* <EditorToolbar toolbarId={'t1'} />
            <ReactQuill
                theme="snow"
                value={body}
                onChange={value => setBody(value)}
                placeholder={placeholder}
                modules={modules('t1')}
                formats={formats}
            /> */}
            <QuillEditor />
        </div>
    )
};

export default QuillAdd;
