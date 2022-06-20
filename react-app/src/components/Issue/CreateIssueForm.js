import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { fetchTypes } from '../../store/type';
import { createIssue } from '../../store/issue';
import { CreateIssueProjectIdError } from '../errors/ProjectIdError';
import { CreateIssueTypeIdError } from '../errors/TypeIdError';
import { CreateIssueTitleError } from '../errors/TitleError';
import UserCard from '../UserCard';
import './IssueForm.css';
import { customTheme } from '../../utils/selectStyles';
import QuillAdd from '../Quill/QuillAdd';

const CreateIssueForm = ({ handleCloseModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const stateUsers = useSelector(state => state.users);
    const allUsers = useSelector(state => Object.values(state.users));
    const stateProjects = useSelector(state => state.projects);
    const allTypes = useSelector(state => Object.values(state.types));

    // slices of state for controlled inputs
    const [projectId, setProjectId] = useState(0);
    const [typeId, setTypeId] = useState(0);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [assigneeId, setAssigneeId] = useState(0);

    // slices of state for dropdowns
    const [showAssignees, setShowAssignees] = useState(false);
    const [assigneeSearchInput, setAssigneeSearchInput] = useState('');

    // slices of state for final validation when clicking submit button
    const [errors, setErrors] = useState([]);

    // onBlur error pre-validation
    const [projectIdInvalid, setProjectIdInvalid] = useState(false);
    const [typeIdInvalid, setTypeIdInvalid] = useState(false);
    const [titleTooShort, setTitleTooShort] = useState(false);

    // form flow control
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        dispatch(fetchTypes());
    }, [dispatch]);

    useEffect(() => {
        setSubmitDisabled(!(
            projectId &&
            typeId &&
            title.length));
    }, [projectId, typeId, title]);

    useEffect(() => {
        if (assigneeSearchInput.length) {
            setShowAssignees(true);
        } else {
            setShowAssignees(false);
        }
    }, [assigneeSearchInput]);

    useEffect(() => {
        if (!showAssignees) return;

        const closeAssignees = () => {
            setShowAssignees(false);
        }

        document.addEventListener('click', closeAssignees);

        return () => document.removeEventListener('click', closeAssignees);
    }, [showAssignees]);

    // Options for Select components
    let projectOptions = [];
    sessionUser?.projects?.forEach(id => {
        projectOptions.push({
            value: id,
            label: stateProjects[id]?.name,
        });
    });

    let typeOptions = [];
    allTypes?.forEach(type => {
        typeOptions.push({
            value: type.id,
            label: type.type,
        });
    });

    // Theme for Selects
    // const customTheme = (theme) => ({
    //     ...theme,
    //     colors: {
    //         ...theme.colors,
    //         primary: '#088796',     // for outline and bg of selected value
    //         primary25: 'rgba(9, 66, 30, 0.2)',    // for bg of unselected options on hover
    //         primary50: 'rgba(9, 66, 30, 0.3)',    // for selected value on click
    //     }
    // });

    // controlled input events
    const titleChange = e => {
        setErrors([]);
        setTitle(e.target.value);
    };

    const bodyChange = e => {
        setErrors([]);
        setBody(e.target.value);
    };

    const assigneeIdChange = e => {
        setErrors([]);
        setAssigneeId(e.target.value);
    };

    // basic pre-validation onBlur events
    const validateProjectId = e => {
        setProjectIdInvalid(!projectId);
    };

    const validateTypeId = e => {
        setTypeIdInvalid(!typeId);
    };

    const validateTitle = e => {
        setTitleTooShort(!title.length);
    };

    const addUserToAssignee = e => {
        const id = parseInt(e.currentTarget.id.split('search-results-li-')[1], 10);
        setAssigneeId(id);
        setAssigneeSearchInput('');
    };

    const handleCreateIssue = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newIssue = {
            project_id: projectId,
            type_id: typeId,
            title,
            body,
            submitter_id: sessionUser.id,
            assignee_id: assigneeId || 0,
        };

        const data = await dispatch(createIssue(newIssue));

        if (data && Array.isArray(data)) {
            setErrors(data);
        } else {
            handleCloseModal();
            history.push(`/issues/${data.id}`);
        }
    };

    return (
        <div
            id="create-issue-form"
            className="modal-container"
        >
            <form
                className="issue-form centered flex-column"
                onSubmit={handleCreateIssue}
            >
                <header className="form-header">
                    <h2 className="form-title">Create Issue</h2>
                </header>

                <div className="issue-form-body">

                    <div className="issue-form-selects flex-row">
                        <div className="issue-form-selects-left flex-column">
                            <label
                                htmlFor="project-id"
                                className="form-element"
                            >
                                <div className="form-field-label">
                                    Project <span className="required-field">*</span>
                                </div>

                                <Select
                                    theme={customTheme}
                                    options={projectOptions}
                                    name='project-id'
                                    id="project-id-input"
                                    onChange={(value) => setProjectId(value.value)}
                                    placeholder="Select a project"
                                    required
                                />
                                <CreateIssueProjectIdError
                                    projectIdInvalid={projectIdInvalid}
                                />
                            </label>

                            <label
                                htmlFor="type-id"
                                className="form-element"
                            >
                                <div className="form-field-label">
                                    Type <span className="required-field">*</span>
                                </div>

                                <Select
                                    theme={customTheme}
                                    options={typeOptions}
                                    name='type-id'
                                    id="type-id-input"
                                    onChange={(value) => setTypeId(value.value)}
                                    placeholder="Select a Type"
                                    required
                                />

                                <CreateIssueTypeIdError
                                    typeIdInvalid={typeIdInvalid}
                                />
                            </label>

                            <label className="form-element">
                                <div className="form-field-label">
                                    Select Assignee
                                </div>
                                <div className="assignee-row flex-row">
                                    <div className="assignee-search flex-column">
                                        <input
                                            type='text'
                                            className="search-box form-input"
                                            onChange={e => setAssigneeSearchInput(e.target.value)}
                                            value={assigneeSearchInput}
                                            placeholder="Search by name"
                                        />
                                        {showAssignees && (
                                            <div className="search-results flex-column">
                                                {allUsers
                                                    ?.filter(user => user
                                                        .display_name
                                                        .toLowerCase()
                                                        .includes(assigneeSearchInput.toLowerCase())
                                                    )
                                                    .map(user => (
                                                        <div
                                                            key={user.id}
                                                            id={`search-results-li-${user.id}`}
                                                            className="flex-row cursor-pointer search-results-row"
                                                            onClick={addUserToAssignee}
                                                        >
                                                            <UserCard user={user} isLink={false} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </label>

                        </div>

                        <div className="issue-form-selects-right flex-column">
                            <label className="form-element">
                                <div className="form-field-label">
                                    Reporter
                                </div>
                                <div className="form-input-provided">
                                    <UserCard user={sessionUser} />
                                </div>
                            </label>

                            <label className="form-element">
                                <div className="form-field-label">
                                    Assignee
                                </div>
                                <div className="selected-assignee">
                                    <UserCard user={stateUsers[assigneeId]} isLink={false} />
                                </div>
                            </label>


                        </div>
                    </div>

                    <label className="form-element">
                        <div className="form-field-label">
                            Summary <span className="required-field">*</span>
                        </div>
                        <input
                            type='text'
                            name='title'
                            className="form-input"
                            onChange={titleChange}
                            onBlur={validateTitle}
                            value={title}
                            required
                        />
                        <CreateIssueTitleError
                            titleTooShort={titleTooShort}
                        />
                    </label>

                    <div className="form-element">
                        <div className="form-field-label">
                            Description
                        </div>
                        <QuillAdd
                            placeholder={"Add a description for the issue..."}
                            setBody={setBody}
                            elementId={"new-issue-body-quill-toolbar"}
                        />
                    </div>

                    <input
                        type='number'
                        value={assigneeId}
                        hidden
                    />

                    <div className="errors">
                        {errors.map((error, ind) => (
                            <div key={ind} className="error-text">{error}</div>
                        ))}
                    </div>

                </div>

                <footer className="form-footer flex-row">
                    <button
                        type="submit"
                        className={`cursor-pointer button button-submit${submitDisabled ? ' disabled' : ''}`}
                        disabled={submitDisabled}
                    >
                        Create
                    </button>

                    <button
                        type="cancel"
                        className={`cursor-pointer button cancel`}
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>

                </footer>
            </form >
        </div >
    )
};

export default CreateIssueForm;
