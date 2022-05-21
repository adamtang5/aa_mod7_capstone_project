import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Avatar from "../Icons/Avatar";

const ProjectRow = ({ project, idx, setProjectId, setShowDeleteModal }) => {
    const allUsers = useSelector(state => state.users);

    const handleClick = e => {
        setProjectId(project.id);
        setShowDeleteModal(true);
    };

    return (
        <tr
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
            <td className="data-cell flex-row">
                <div className="row-project-actions flex-row">
                    <div className="edit-project">
                        <Link
                            className="edit-project-icon project-actions-icons"
                            to={`/projects/${project?.id}/settings`}
                            title="Edit project settings"
                        >
                            <i className="fa-solid fa-pen-to-square fa-lg" />
                        </Link>
                    </div>

                    <div className="delete-modal">
                        <div
                            className="delete-project-confirm project-actions-icons cursor-pointer"
                            onClick={handleClick}
                            title="Delete project"
                        >
                            <i className="fa-solid fa-trash-can fa-lg" />
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default ProjectRow;
