import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
import QuillEditor from './QuillEditor';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

const QuillAdd = ({ placeholder }) => {
    const [body, setBody] = useState("");
    const [error, setError] = useState([]);

    const onEditorChange = value => {
        setBody(value);
        console.log(value);
    };

    const handleSubmit = e => {
        e.preventDefault();


        setBody("");
    };

    const handleCancel = e => {
        e.preventDefault();
        e.stopPropagation();

    };

    return (
        <div className="quill-add">
            <QuillEditor
                placeholder={placeholder}
                onEditorChange={onEditorChange}
            />

            <form onSubmit={handleSubmit}>
                <div className="form-actions flex-row">
                    <button className="button button-submit">Submit</button>
                    <button
                        className="button button-cancel"
                        onClick={handleCancel}
                    >Cancel</button>
                </div>
            </form>
        </div>
    )
};

export default QuillAdd;
