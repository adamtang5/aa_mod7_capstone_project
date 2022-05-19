export function CreateIssueTypeIdError({ typeIdInvalid }) {
    if (!typeIdInvalid) return null;
    return <p className="error-text">Type is required</p>
}
