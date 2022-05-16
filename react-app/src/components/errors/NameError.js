export function CreateProjectNameError({ nameInvalid }) {
    if (!nameInvalid) return null;
    return <p className="error-text">Name must be between 3 and 50 characters</p>
}
