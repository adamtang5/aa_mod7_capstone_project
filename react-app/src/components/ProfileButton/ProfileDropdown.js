import { Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const ProfileDropdown = () => {
    return (
        <div className="profile-dropdown flex-column">
            <div className="profile-dropdown-card flex-column">
                <h3 className="profile-dropdown-header">ISSUES</h3>
                <Link to='/your/submitted/issues'>Submitted Issues</Link>
                <Link to='/your/assigned/issues'>Assigned Issues</Link>
            </div>
            <div className="profile-dropdown-card">
                <LogoutButton />
            </div>
        </div>
    )
};

export default ProfileDropdown;
