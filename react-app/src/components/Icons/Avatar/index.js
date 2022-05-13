import { generateAvatarUrl } from "../../../../utils/generateAvatar";
import "./Avatar.css";

const Avatar = ({ user }) => {
    return (
        <a href={`/users/${user?.id}`}>
            {user && (
                <div className="avatar">
                    {user?.avatar_url ? (
                        <img src={user?.avatar_url} alt={user?.display_name} />
                    ) : (
                        <div>
                            <img
                                src={generateAvatarUrl(
                                    '',
                                    200,
                                    'white',
                                    'white'
                                )} alt={user?.display_name} />
                        </div>
                    )}
                </div>
            )}
        </a>
    );
};

export default Avatar;
