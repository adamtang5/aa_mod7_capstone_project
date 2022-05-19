export function CreateIssueTitleError({ titleTooShort }) {
    if (!titleTooShort) return null;
    return <p className="error-text">Summary is required</p>
}
