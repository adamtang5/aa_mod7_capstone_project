export function CreateIssueProjectIdError({ projectIdInvalid }) {
    if (!projectIdInvalid) return null;
    return <p className="error-text">Project is required</p>
}
