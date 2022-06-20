import React from 'react';
import QuillEditor from './QuillEditor';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

const QuillEdit = ({ placeholder, setAttr, elementId, initialHtml }) => {
    const onEditorChange = value => {
        setAttr(value);
        console.log(value);
    };

    return (
        <div className="quill-edit">
            <QuillEditor
                placeholder={placeholder}
                onEditorChange={onEditorChange}
                elementId={elementId}
                initialHtml={initialHtml}
            />
        </div>
    )
};

export default QuillEdit;
