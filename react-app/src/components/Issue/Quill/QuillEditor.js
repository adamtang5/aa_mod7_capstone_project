import React from 'react';
import ReactQuill, { Quill } from 'react-quill';

const CustomUndo = () => {
    return (
        <svg viewBox="0 0 18 18">
            <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
            <path
                className="ql-stroke"
                d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
            />
        </svg>
    )
};

const CustomRedo = () => {
    return (
        <svg viewBox="0 0 18 18">
            <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
            <path
                className="ql-stroke"
                d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
            />
        </svg>
    )
};

// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo();
};

function redoChange() {
    this.quill.history.redo();
};

// Quill Toolbar component
const QuillToolbar = (props) => {
    return (
        <>
            {props.toolbarId !== undefined && (
                <div id={props.toolbarId}>
                    <span className="ql-formats">
                        <button className="ql-undo">
                            <CustomUndo />
                        </button>
                        <button className="ql-redo">
                            <CustomRedo />
                        </button>
                    </span>
                    <span className="ql-formats">
                        <select className="ql-header">
                            <option value="" selected>Normal text</option>
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                            <option value="4">Heading 4</option>
                            <option value="5">Heading 5</option>
                            <option value="6">Heading 6</option>
                        </select>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-bold" />
                        <button className="ql-italic" />
                        <button className="ql-underline" />
                        <button className="ql-strike" />
                        <button className="ql-script" value="super" />
                        <button className="ql-script" value="sub" />
                        <button className="ql-code-block" />
                        <button className="ql-link" />
                    </span>
                    <span className="ql-formats">
                        <button className="ql-list" value="ordered" />
                        <button className="ql-list" value="bullet" />
                        <button className="ql-indent" value="-1" />
                        <button className="ql-indent" value="+1" />
                    </span>
                    <span className="ql-formats">
                        <select className="ql-color" />
                    </span>
                    <span className="ql-formats">
                        <button className="ql-clean" />
                    </span>
                </div>
            )}
        </>
    )
};


export class QuillEditor extends React.Component {
    state = { editorHtml: "" };

    handleChange = html => {
        this.setState({ editorHtml: html });
    };

    // Modules object for setting up the Quill editor
    static modules = (props) => ({
        toolbar: {
            container: "#" + props,
            handlers: {
                undo: undoChange,
                redo: redoChange,
            },
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
    });

    // Formats objects for setting up the Quill editor
    static formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "script",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "color",
        "code-block"
    ];

    render() {
        return (
            <div className="text-editor">
                <QuillToolbar />
                <ReactQuill
                    value={this.state.editorHtml}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    modules={QuillEditor.modules}
                    formats={QuillEditor.formats}
                />
            </div>
        )
    }
};

// export default QuillEditor;
