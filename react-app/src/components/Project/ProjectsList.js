import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectRow from "./ProjectRow";
import DeleteProjectModal from './DeleteProjectModal';
import { authenticate } from '../../store/session';
import '../ListPage.css';
import './ProjectsList.css';
import { fetchUsers } from '../../store/user';
import { fetchProjects } from '../../store/project';

export default function ProjectsList() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const stateProjects = useSelector(state => state.projects);
    const projects = sessionUser?.projects?.map(id => stateProjects[id]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectId, setProjectId] = useState(0);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchProjects());
    }, [dispatch])

    return (
        <div className="page-container">
            <header className="page-header flex-row">
                <h1 className="page-title">Projects</h1>
                <div className="project-actions flex-row">
                    <Link to="/new-project">
                        <div className="create-project button">
                            Create Project
                        </div>
                    </Link>
                </div>
            </header>
            <div className="search-bar filter-controls flex-row">
                <div className="search-box">Search box goes here</div>
                <div className="filter-options">Filter dropdown goes here</div>
            </div>
            <table className="projects-list filter-table striped-table">
                <thead id="table-head">
                    <tr className="head-row">
                        <th className="header-cell">Name</th>
                        <th className="header-cell">Key</th>
                        <th className="header-cell">Participants</th>
                        <th className="header-cell">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.map((project, idx) => (
                        <ProjectRow
                            key={project?.id}
                            project={project}
                            idx={idx}
                            setProjectId={setProjectId}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    ))}
                </tbody>
            </table>
            {showDeleteModal && (
                <DeleteProjectModal
                    projectId={projectId}
                    setShowDeleteModal={setShowDeleteModal}
                />
            )}
        </div>
    )
}
