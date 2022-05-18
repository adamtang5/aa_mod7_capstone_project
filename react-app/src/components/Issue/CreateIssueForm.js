import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createIssue } from '../../store/issue';
import { CreateIssueProjectIdError } from '../errors/ProjectIdError';
import Avatar from '../Icons/Avatar';
import './IssueForm.css';

const CreateIssueForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const stateUsers = useSelector(state => state.users);
    const allUsers = useSelector(state => Object.values(state.users));
    const stateProjects = useSelector(state => state.projects);

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
                            <option disabled>{" "}</option>
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


                </div>
            </form>
        </div>
    )
};

export default CreateIssueForm;
