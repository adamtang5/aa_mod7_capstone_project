export default function AvatarUrlError({ avatarUrlInvalid }) {
    if (!avatarUrlInvalid) return null;
    return <p className="error-text">Please enter a valid URL</p>
};
