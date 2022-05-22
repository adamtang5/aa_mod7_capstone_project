export function EditCommentBodyError({ bodyTooShort }) {
    if (!bodyTooShort) return null;
    return <p className="error-text">Body must not be empty</p>
}
