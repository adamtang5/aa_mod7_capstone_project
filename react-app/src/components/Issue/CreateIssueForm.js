import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchTypes } from '../../store/type';
import { createIssue } from '../../store/issue';
import { CreateIssueProjectIdError } from '../errors/ProjectIdError';
import { CreateIssueTypeIdError } from '../errors/TypeIdError';
import { CreateIssueTitleError } from '../errors/TitleError';
import UserCard from '../UserCard';
import './IssueForm.css';

const CreateIssueForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const stateUsers = useSelector(state => state.users);
    const allUsers = useSelector(state => Object.values(state.users));
    const stateProjects = useSelector(state => state.projects);
    const allTypes = useSelector(state => Object.values(state.types));

    // slices of state for controlled inputs
    const [projectId, setProjectId] = useState();
    const [typeId, setTypeId] = useState();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [assigneeId, setAssigneeId] = useState();

    // slices of state for dropdowns
    const [showProjects, setShowProjects] = useState(false);
    const [showTypes, setShowTypes] = useState(false);
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

    // controlled input events
    const projectIdChange = e => {
        setErrors([]);
        setProjectId(e.target.value);
    };

    const typeIdChange = e => {
        setErrors([]);
        setTypeId(e.target.value);
    };

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
        setAssigneeId(e.target.value);
    };

    const handleCreateIssue = async (e) => {
        e.preventDefault();
        setErrors([]);

        const data = await dispatch(createIssue({
            project_id: projectId,
            type_id: typeId,
            title,
            body,
            submitter_id: sessionUser.id,
            assignee_id: assigneeId,
        }));

        if (data && Array.isArray(data)) {
            setErrors(data);
        } else {
            history.push(`/issues/${data.id}`);
        }
    };

    return (
        <div
            id="create-issue-form"
            className="page-container"
        >
            <form
                className="issue-form centered"
                onSubmit={handleCreateIssue}
            >
                <h2 className="form-title">Create Issue</h2>

                <div className="issue-form-body">
                    <label
                        htmlFor="project-id"
                        className="form-element"
                    >
                        <div className="form-field-label">
                            Project <span className="required-field">*</span>
                        </div>
                        <select
                            name='project-id'
                            className="form-input"
                            onChange={projectIdChange}
                            onBlur={validateProjectId}
                            value={projectId}
                        >
                            {sessionUser?.projects?.map(id => (
                                <option
                                    key={id}
                                    value={id}
                                >
                                    {stateProjects[id]?.name}
                                </option>
                            ))}
                        </select>
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
                        <select
                            name='type-id'
                            className="form-input"
                            onChange={typeIdChange}
                            onBlur={validateTypeId}
                            value={typeId}
                        >
                            {allTypes?.map(issueType => (
                                <option
                                    key={issueType?.id}
                                    value={issueType?.id}
                                >
                                    {issueType?.type}
                                </option>
                            ))}
                        </select>
                        <CreateIssueTypeIdError
                            typeIdInvalid={typeIdInvalid}
                        />
                    </label>

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

                    <label className="form-element">
                        <div className="form-field-label">
                            Description
                        </div>
                        <textarea
                            name='body'
                            className="form-input"
                            onChange={bodyChange}
                            value={body}
                        />
                    </label>

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
                        <input
                            type='text'
                            className="form-input"
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
                                            <UserCard user={user} />
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </label>

                    <input
                        type='text'
                        onChange={e => setAssigneeId(e.target.value)}
                        value={assigneeId}
                    // hidden
                    />
                </div>

                <footer className="form-footer flex-row">
                    <button
                        type="submit"
                        className={`cursor-pointer button button-submit${submitDisabled ? ' disabled' : ''}`}
                        disabled={submitDisabled}
                    >
                        Create
                    </button>

                </footer>
            </form >
        </div >
    )
};

export default CreateIssueForm;
