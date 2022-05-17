import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { deleteProject } from '../../store/project';
import Avatar from "../Icons/Avatar";
import Ellipses from "../Icons/Ellipses";
import WarningSign from '../Icons/WarningSign';

const ProjectRow = ({ project, idx }) => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.users);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const handleDeleteProject = e => {
        const projectId = parseInt(e.target.value.split('delete-project-')[1], 10);
        setShowDeleteModal(false);
        dispatch(deleteProject(projectId));
    }

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
                    {project?.users?.map(id => <Avatar key={id} user={allUsers[id]} />)}
                </div>
            </td>
            <td className="data-cell">
                <div
                    onClick={openDropdown}
                    className="click-to-dropdown icon-ellipses flex-row cursor-pointer"
                >
                    <Ellipses />
                    {showDropdown && (
                        <div className="dropdown flex-column">
                            <div className="edit-project">
                                <Link to={`/projects/${project?.id}/settings`}>Project Settings</Link>
                            </div>
                            <div className="delete-modal">
                                <div
                                    className="delete-project-confirm cursor-pointer"
                                    onClick={() => setShowDeleteModal(true)}
                                >Delete Project</div>
                                {showDeleteModal && (
                                    <Modal onClose={() => setShowDeleteModal(false)}>
                                        <div className="delete-project-modal flex-column">
                                            <h1>
                                                <WarningSign /> Delete Project?
                                            </h1>
                                            <p>The project along with its issues will be permanently deleted.</p>
                                            <p>Are you sure you want to delete this project?</p>
                                            <div className="actions flex-row">
                                                <button
                                                    className="cancel"
                                                    onClick={() => setShowDeleteModal(false)}
                                                >Cancel</button>
                                                <button
                                                    id={`delete-project-${project?.id}`}
                                                    className="delete"
                                                    onClick={handleDeleteProject}
                                                >Delete</button>
                                            </div>
                                        </div>
                                    </Modal>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ProjectRow;
