import React from 'react';
import QuillEditor from './QuillEditor';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

const QuillEdit = ({ placeholder, setBody }) => {
    const onEditorChange = value => {
        setBody(value);
        console.log(value);
    };

    return (
        <div className="quill-add">
            <QuillEditor
                placeholder={placeholder}
                onEditorChange={onEditorChange}
            />
        </div>
    )
};

export default QuillEdit;
