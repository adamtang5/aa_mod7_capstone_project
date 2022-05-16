import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createProject } from '../../store/project';
import './CreateProjectForm.css';

const CreateProjectForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    // slices of state for controlled inputs
    const [name, setName] = useState('');
    const [key, setKey] = useState('');
    const [userIds, setUserIds] = useState([]);

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
                .join(' ')
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
            return <Redirect to={`/projects/${data.id}`} />
        }
    }
};

export default CreateProjectForm;
