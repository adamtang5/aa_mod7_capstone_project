export function EditUserDisplayNameError({ displayNameTooShort }) {
    if (!displayNameTooShort) return null;
    return <p className="error-text">Display Name must be at least 4 characters</p>
}

export function SignUpDisplayNameError({ displayNameTooShort }) {
    if (!displayNameTooShort) return null;
    return <p className="error-text">Display Name must be at least 4 characters</p>
};
