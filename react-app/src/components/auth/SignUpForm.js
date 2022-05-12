import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
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
  // const [part2SubmitDisabled, setPart2SubmitDisabled] = useState(true);
  // const [showPart2Summary, setShowPart2Summary] = useState(false);
  // const [showPart3, setShowPart3] = useState(false);
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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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
    setAvatarUrlInvalid(avatarUrl !== "" && !urlRe.test(avatarUrl));
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
    if (data) {
      setErrors(data)
    }
  };

  return (
    <div
      id="signup-form"
      className="page-wrapper flex-column centered bordered rounded-corners"
    >
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            name='confirm_password'
            onChange={updateConfirmPassword}
            value={confirmPassword}
            required={true}
          ></input>
        </div>
        <div>
          <label>Display Name</label>
          <input
            type='text'
            name='displayName'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
