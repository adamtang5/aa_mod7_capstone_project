import { generateAvatarUrl } from "../../../utils/generateAvatar";
import "./Avatar.css";

const Avatar = ({ user }) => {
    const dataUrl = generateAvatarUrl('', 'white', 'white');

    return (
        <a href={`/users/${user?.id}`}>
            {user && (
                <div className="avatar">
                    {user?.avatar_url ? (
                        <img src={user?.avatar_url} alt={user?.display_name} />
                    ) : (
                        <div>
                            <img src={dataUrl} alt={user?.display_name} />
                        </div>
                    )}
                </div>
            )}
        </a>
    );
};

export default Avatar;
