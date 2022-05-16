import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createProject } from '../../store/project';
import { CreateProjectNameError } from '../errors/NameError';
import Avatar from '../Icons/Avatar';
import './CreateProjectForm.css';

const CreateProjectForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const stateUsers = useSelector(state => state.users);
    const allUsers = useSelector(state => Object.values(state.users));

    // slices of state for controlled inputs
    const [name, setName] = useState('');
    const [key, setKey] = useState('');
    const [userIds, setUserIds] = useState([sessionUser.id]);

    // slices of state for search box
    const [showResults, setShowResults] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    // slices of state for final validation when clicking submit button
    const [errors, setErrors] = useState([]);

    // onBlur error pre-validation
    const [nameInvalid, setNameInvalid] = useState(false);
    const [keyInvalid, setKeyInvalid] = useState(false);
    const [userIdsInvalid, setUserIdsInvalid] = useState(false);

    // form flow control
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        setSubmitDisabled(!(
            name.length >= 3 &&
            name.length <= 50 &&
            key.length >= 1 &&
            key.length <= 5 &&
            userIds.length >= 1));
    }, [name, key, userIds]);

    useEffect(() => {
        if (searchInput.length) {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [searchInput]);

    useEffect(() => {
        if (!showResults) return;

        const closeResults = () => {
            setShowResults(false);
        }

        document.addEventListener('click', closeResults);

        return () => document.removeEventListener('click', closeResults);
    }, [showResults]);

    // controlled input events
    const nameChange = e => {
        setErrors([]);
        if (name.length <= 50) setName(e.target.value);

        // generate key based on name
        if (name.trim().split(' ').length === 1) {
            setKey(name
                .trim()
                .slice(0, 5)
                .toUpperCase()
            );
        } else if (name.trim().split(' ').length > 1) {
            setKey(name
                .trim()
                .split(' ')
                .map(word => word[0])
                .join('')
                .slice(0, 5)
                .toUpperCase()
            );
        }
    };

    const keyChange = e => {
        setErrors([]);
        if (key.length <= 5) setKey(e.target.value);
    };

    const userIdsChange = e => {
        setErrors([]);
        setUserIds(e.target.value);
    }

    // basic pre-validation onBlur events
    const validateName = e => {
        setNameInvalid(name.length < 3 || name.length > 50);
    };

    const validateKey = e => {
        setKeyInvalid(!key.length || key.length > 5);
    };

    const validateUserIds = e => {
        setUserIdsInvalid(!userIds.length);
    };

    const addUserToParticipants = e => {
        const id = parseInt(e.target.id.split('search-results-li-')[1], 10);

        if (!userIds.includes(id)) {
            setUserIds([...userIds, id]);
        }
    };

    const removeUserFromParticipants = e => {
        const id = parseInt(e.target.id.split('selected-users-')[1], 10);

        setUserIds(userIds.filter(userId => userId !== id));
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setErrors([]);

        const data = await dispatch(createProject({
            name,
            key,
            user_ids: JSON.stringify(userIds),
        }));

        if (data && Array.isArray(data)) {
            setErrors(data);
        } else {
            history.push(`/projects/${data.id}`);
        }
    }

    return (
        <div
            id="create-project-form"
            className="page_wrapper centered bordered rounded-corners"
        >
            <form
                className="project-form"
                onSubmit={handleCreateProject}
            >
                <h2 className="form-title">Create Project</h2>

                <label className="form-element">
                    <div className="form-field-label">
                        Name <span className="required-field">*</span>
                    </div>
                    <input
                        type='text'
                        name='name'
                        onChange={nameChange}
                        onBlur={validateName}
                        placeholder="Try a team name, project goal, milestone..."
                        value={name}
                        required
                    />
                    <CreateProjectNameError
                        nameInvalid={nameInvalid}
                    />
                </label>

                <label className="form-element">
                    <div className="form-field-label">
                        Key <span className="required-field">*</span>
                    </div>
                    <input
                        type='text'
                        name='key'
                        onChange={keyChange}
                        onBlur={validateKey}
                        value={key}
                        required
                    />
                </label>

                <label className="form-element">
                    <div className="form-field-label">
                        Add User to Project
                    </div>
                    <input
                        type='text'
                        onChange={e => setSearchInput(e.target.value)}
                        value={searchInput}
                        placeholder="Search by name"
                    />
                    {showResults && (
                        <div className="search-results">
                            <ul>
                                {allUsers
                                    ?.filter(user => !userIds.includes(user.id))
                                    .filter(user => user
                                        .display_name
                                        .toLowerCase()
                                        .includes(searchInput.toLowerCase())
                                    )
                                    .map(user => (
                                        <li
                                            key={user.id}
                                            id={`search-results-li-${user.id}`}
                                            className="flex-row cursor-pointer search-results-li"
                                            onClick={addUserToParticipants}
                                        >
                                            <Avatar user={user} />
                                            {user.display_name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )}
                </label>

                <input
                    type='text'
                    onChange={e => setUserIds(e.target.value)}
                    value={userIds}
                    hidden
                />

                <div className="form-element">
                    <div className="form-field-label">
                        Participants <span className="required-field">*</span>
                    </div>
                    <div className="participants-list flex-column">
                        {userIds?.map(id => (
                            <div
                                key={id}
                                className="user-ticker flex-row"
                            >
                                <Avatar user={stateUsers[id]} />
                                <div className="display-name">
                                    {stateUsers[id].display_name}
                                </div>
                                <div
                                    id={`selected-users-${id}`}
                                    className="remove-ticker cursor-pointer"
                                    onClick={removeUserFromParticipants}
                                >x</div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className={`cursor-pointer button-submit${submitDisabled ? ' disabled' : ''}`}
                    disabled={submitDisabled}
                >
                    Create Project
                </button>

            </form>
        </div>
    )
};

export default CreateProjectForm;
