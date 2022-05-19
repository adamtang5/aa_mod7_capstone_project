import { bgColors, generateAvatarUrl, toInitials } from "../../../utils/generateAvatar";
import "./Avatar.css";

const Avatar = ({ user, isLink }) => {
    const dataUrl = generateAvatarUrl(toInitials(user?.display_name), 'white', bgColors[user?.id % bgColors.length]);

    return isLink ? (
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
    ) : (
        <>
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
        </>
    );
};

export default Avatar;
