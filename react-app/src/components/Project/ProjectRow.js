import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Avatar from "../Icons/Avatar";
import Ellipses from "../Icons/Ellipses";

const ProjectRow = ({ project, idx }) => {
    const allUsers = useSelector(state => state.users);
    const [showDropdown, setShowDropdown] = useState(false);

    const openDropdown = e => {
        if (showDropdown) return;
        setShowDropdown(true);
    };

    useEffect(() => {
        if (!showDropdown) return;

        const closeDropdown = e => {
            setShowDropdown(false);
        };

        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown);
    }, [showDropdown]);

    return (
        <tr
            key={project?.id}
            className={`data-row-${idx % 2 === 0 ? 'even' : 'odd'}`}
        >
            <td className="data-cell">
                <NavLink to={`/projects/${project?.id}`}>{project?.name}</NavLink>
            </td>
            <td className="data-cell">
                <NavLink to={`/projects/${project?.id}`}>{project?.key}</NavLink>
            </td>
            <td className="data-cell">
                <div className="users-avatars flex-row">
                    {project?.users?.map(id => <Avatar user={allUsers[id]} />)}
                </div>
            </td>
            <td className="data-cell">
                <div
                    onClick={openDropdown}
                    className="click-to-dropdown icon-ellipses flex-row cursor-pointer"
                >
                    <Ellipses />
                    {showDropdown && (
                        <div className="dropdown">
                            <Link to={`/projects/${project?.id}/settings`}>Project Settings</Link>
                            <div className="delete-project-confirm">Move to trash</div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ProjectRow;
