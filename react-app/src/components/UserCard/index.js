import Avatar from "../Icons/Avatar";

const UserCard = ({ user, isLink }) => {
    if (!user) return null;
    return (
        <div className="user-card flex-row">
            <Avatar user={user} isLink={isLink} />
            <div className="display-name">
                {user?.display_name}
            </div>
        </div>
    )
};

export default UserCard;
