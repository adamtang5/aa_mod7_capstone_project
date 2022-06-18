import React from 'react';
import QuillEditor from './QuillEditor';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

const QuillEdit = ({ placeholder, setBody, elementId, value }) => {
    const onEditorChange = value => {
        setBody(value);
        console.log(value);
    };

    return (
        <div className="quill-edit">
            <QuillEditor
                placeholder={placeholder}
                onEditorChange={onEditorChange}
                elementId={elementId}
                value={value}
            />
        </div>
    )
};

export default QuillEdit;
