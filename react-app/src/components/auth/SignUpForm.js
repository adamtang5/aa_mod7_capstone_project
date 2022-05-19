import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate, signUp } from '../../store/session';
import { createProject } from '../../store/project';
import { SignUpEmailError } from '../errors/EmailError';
import { SignUpPasswordError } from '../errors/PasswordError';
import ConfirmPasswordError from '../errors/ConfirmPasswordError';
import { SignUpDisplayNameError } from '../errors/DisplayNameError';
import AvatarUrlError from '../errors/AvatarUrlError';
import './auth.css';


const SignUpForm = ({ formTitle, setShowLoginForm, setShowSignupForm }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  // slices of state for controlled inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // slices of state for final validation when clicking submit button
  const [errors, setErrors] = useState([]);

  // onBlur error pre-validation
  const [emailTooShort, setEmailTooShort] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [confirmPasswordTooShort, setConfirmPasswordTooShort] = useState(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const [displayNameTooShort, setDisplayNameTooShort] = useState(false);
  const [avatarUrlInvalid, setAvatarUrlInvalid] = useState(false);

  // signup form flow control
  const [showPart1, setShowPart1] = useState(true);
  const [part1SubmitDisabled, setPart1SumbitDisabled] = useState(true);
  const [showPart1Summary, setShowPart1Summary] = useState(false);
  const [showPart2, setShowPart2] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // submit button is disabled until basic validation is done
  useEffect(() => {
    if (!emailInvalid) {
      setPart1SumbitDisabled(!(
        email.length >= 5 &&
        password.length >= 6 &&
        confirmPassword.length >= 6 &&
        password === confirmPassword
      ));
    } else {
      setPart1SumbitDisabled(true);
    }
  }, [email, password, confirmPassword, emailInvalid]);

  useEffect(() => {
    setSubmitDisabled(!(
      email.length >= 5 &&
      password.length >= 6 &&
      confirmPassword.length >= 6 &&
      displayName.length >= 4 &&
      !avatarUrlInvalid));
  }, [email, password, confirmPassword, displayName, avatarUrl, avatarUrlInvalid]);

  // logged in users are redirected to /
  if (user) {
    return <Redirect to='/' />;
  }

  const emailChange = e => {
    setErrors([]);
    setEmail(e.target.value);
  };

  const passwordChange = e => {
    setErrors([]);
    setPassword(e.target.value);
  };

  const confirmPasswordChange = e => {
    setErrors([]);
    setConfirmPassword(e.target.value);
  };

  const displayNameChange = e => {
    setErrors([]);
    setDisplayName(e.target.value);
  };

  const avatarUrlChange = e => {
    setErrors([]);
    setAvatarUrl(e.target.value);
  };

  // basic pre-validation onBlur events
  const validateEmail = e => {
    setEmailTooShort(email.length < 5);

    const emailRe = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    setEmailInvalid(!emailRe.test(email));
  };

  const validatePassword = e => {
    setPasswordTooShort(password.length < 6);
  }

  const validateConfirmPassword = e => {
    setConfirmPasswordTooShort(confirmPassword.length < 6);
    setPasswordsDoNotMatch(password !== confirmPassword);
  }

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

  // button onClick handlers
  const handlePart1Submit = e => {
    e.preventDefault();
    setErrors([]);
    setShowPart1(false);
    setShowPart1Summary(true);
    setShowPart2(true);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);

    const data = await dispatch(signUp(email, password, displayName, avatarUrl));

    if (data && Array.isArray(data)) {
      setErrors(data)
    } else if (data && typeof data === "number") {
      // create personal project for new user
      const personalProject = {
        name: 'Personal Project',
        key: 'U' + await data,
        user_ids: JSON.stringify([await data]),
      };
      const projectData = await dispatch(createProject(personalProject));
      if (projectData && Array.isArray(projectData)) {
        setErrors(projectData)
      } else {
        dispatch(authenticate());
      }

    }
  };

  const handleSwitchForm = e => {
    setShowSignupForm(false);
    setShowLoginForm(true);
  };

  return (
    <div
      id="signup-form"
      className="page-wrapper flex-column centered bordered rounded-corners"
    >
      <form
        className="auth-form stacked-form"
        onSubmit={onSignUp}
      >
        <h2 className="centered">{formTitle}</h2>
        <div
          id="signup-pt-1"
          className={`auth-form-group${showPart1 ? '' : ' hidden'}`}
        >
          <label className="auth-form-element">
            <input
              type='email'
              name='email'
              onChange={emailChange}
              onBlur={validateEmail}
              placeholder="Email"
              value={email}
              required
            />
            <SignUpEmailError
              emailTooShort={emailTooShort}
              emailInvalid={emailInvalid}
            />
          </label>

          <label className="auth-form-element">
            <input
              type='password'
              name='password'
              onChange={passwordChange}
              onBlur={validatePassword}
              placeholder="Password"
              value={password}
              required
            />
            <SignUpPasswordError visible={passwordTooShort} />
          </label>

          <label className="auth-form-element">
            <input
              type='password'
              name='confirm-password'
              onChange={confirmPasswordChange}
              onBlur={validateConfirmPassword}
              placeholder="Confirm Password"
              value={confirmPassword}
              required
            />
            <ConfirmPasswordError
              passwordTooShort={passwordTooShort}
              confirmPasswordTooShort={confirmPasswordTooShort}
              passwordsDoNotMatch={passwordsDoNotMatch}
            />
          </label>

          <button
            className={`cursor-pointer button-submit${part1SubmitDisabled ? ' disabled' : ''}`}
            disabled={part1SubmitDisabled}
            onClick={handlePart1Submit}
          >
            Next
          </button>
        </div>

        <div
          id="signup-pt-1-summary"
          className={`auth-form-grouop${showPart1Summary ? '' : ' hidden'}`}
        >
          <p className="summary-text">Email: {email}</p>
        </div>

        <div
          id="signup-pt-2"
          className={`auth-form-group${showPart2 ? '' : ' hidden'}`}
        >
          <label className="auth-form-element">
            <input
              type='text'
              name='display_name'
              onChange={displayNameChange}
              onBlur={validateDisplayName}
              placeholder="Display Name"
              value={displayName}
              required
            />
            <SignUpDisplayNameError displayNameTooShort={displayNameTooShort} />
          </label>

          <label className="auth-form-element">
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
            {errors.map((error, ind) => (
              <div key={ind} className="error-text">{error}</div>
            ))}
          </div>

          <button
            type="submit"
            className={`cursor-pointer button-submit${submitDisabled ? ' disabled' : ''}`}
            disabled={submitDisabled}
          >
            Sign Up
          </button>

        </div>
      </form>

      <p className="switch-form">
        Already have an account? <span
          className="green-text bolded cursor-pointer"
          onClick={handleSwitchForm}
        >Sign in</span>
      </p>
    </div>
  );
};

export default SignUpForm;
