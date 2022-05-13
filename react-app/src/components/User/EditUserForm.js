import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editUser } from "../../store/user";
import { EditUserDisplayNameError } from "../auth/errors/DisplayNameError";
import AvatarUrlError from "../auth/errors/AvatarUrlError";


const EditUserForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const { userId } = useParams();
    const user = users[+userId];

    const [displayName, setDisplayName] = useState(user.display_name);
    const [avatarUrl, setAvatarUrl] = useState(user.avatar_url);
    const [errors, setErrors] = useState([]);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [displayNameTooShort, setDisplayNameTooShort] = useState(false);
    const [avatarUrlInvalid, setAvatarUrlInvalid] = useState(false);

    const displayNameChange = e => {
        setErrors([]);
        setDisplayName(e.target.value);
    };

    const avatarUrlChange = e => {
        setErrors([]);
        setAvatarUrl(e.target.value);
    };

    const validateDisplayName = e => {
        setDisplayNameTooShort(displayName.length < 4);
    };

    const validateAvatarUrl = e => {
        const urlRe = new RegExp("((http|https)://)(www.)?" +
            "[a-zA-Z0-9@:%._\\+~# ?&//=]{2,256}\\.[a-z]" +
            "{2,6}\\b([-a-zA-Z0-9@:%._\\+~# ?&//=]*)")
        const imageDataRe = /^data:image\//
        setAvatarUrlInvalid(
            avatarUrl !== "" &&
            !urlRe.test(avatarUrl) &&
            !imageDataRe.test(avatarUrl));
    };

    useEffect(() => {
        setSubmitDisabled(!(
            displayName.length >= 4 &&
            !avatarUrlInvalid));
    }, [displayName, avatarUrl, avatarUrlInvalid]);

    if (sessionUser?.id !== user?.id) {
        return <Redirect to='/' />;
    }

    const handleEditUser = async (e) => {
        e.preventDefault();
        setErrors([]);

        const updatedUser = {
            id: user.id,
            display_name: displayName,
            avatar_url: avatarUrl,
        }

        const data = await dispatch(editUser(updatedUser));
        if (data.errors) {
            setErrors(data.errors);
        }

    }

    return (
        <div
            className="page-container"
        >
            <form
                className="flex-column"
                onSubmit={handleEditUser}
            >
                <label className="auth-form-element">
                    <h3 className="auth-form-label">Display Name</h3>
                    <input
                        type='text'
                        name='display_name'
                        onChange={displayNameChange}
                        onBlur={validateDisplayName}
                        placeholder="Display Name"
                        value={displayName}
                        required
                    />
                    <EditUserDisplayNameError displayNameTooShort={displayNameTooShort} />
                </label>

                <label className="auth-form-element">
                    <h3 className="auth-form-label">Avatar URL</h3>
                    <input
                        type='text'
                        name='avatar_url'
                        onChange={avatarUrlChange}
                        onBlur={validateAvatarUrl}
                        placeholder="Avatar URL"
                        value={avatarUrl}
                    />
                    <AvatarUrlError avatarUrlInvalid={avatarUrlInvalid} />
                </label>

                <div className="errors">
                    {errors?.map((error, ind) => (
                        <div key={ind} className="error-text">{error}</div>
                    ))}
                </div>

                <button
                    type="submit"
                    className={`cursor-pointer button-submit${submitDisabled ? ' disabled' : ''}`}
                    disabled={submitDisabled}
                >
                    Submit
                </button>

            </form>
        </div>
    )

};

export default EditUserForm;
