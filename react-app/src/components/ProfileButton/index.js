import React, { useState, useEffect } from 'react';
import Avatar from '../Icons/Avatar';
import ProfileDropdown from './ProfileDropdown';
import './ProfileButton.css';

const ProfileButton = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    return (
        <>
            <div className="profile-button cursor-pointer" onClick={openMenu}>
                <Avatar user={user} isLink={false} />
                {showMenu && (
                    <ProfileDropdown />
                )}
            </div>
        </>
    )
};

export default ProfileButton;
