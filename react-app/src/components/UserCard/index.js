import Avatar from "../Icons/Avatar";

const UserCard = ({ user }) => {
    return (
        <div className="user-card flex-row">
            <Avatar user={user} />
            <div className="display-name">
                {user?.display_name}
            </div>
        </div>
    )
};

export default UserCard;
