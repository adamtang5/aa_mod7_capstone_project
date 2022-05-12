import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const ToggleAuthForm = ({ loginFormTitle, signupFormTitle }) => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showSignupForm, setShowSignupForm] = useState(false);

    return (
        <div className="auth-window">
            {showLoginForm && (
                <LoginForm
                    formTitle={loginFormTitle}
                    setShowLoginForm={setShowLoginForm}
                    setShowSignupForm={setShowSignupForm}
                />
            )}

            {showSignupForm && (
                <SignUpForm
                    formTitle={signupFormTitle}
                    setShowLoginForm={setShowLoginForm}
                    setShowSignupForm={setShowSignupForm}
                />
            )}
        </div>
    )
};

export default ToggleAuthForm;
