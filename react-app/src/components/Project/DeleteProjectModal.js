import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { deleteProject } from '../../store/project';
import WarningSign from '../Icons/WarningSign';
import './DeleteProjectModal.css';

export default function DeleteProjectModal({ setShowDeleteModal, projectId }) {
    const dispatch = useDispatch();

    const handleDeleteProject = e => {
        setShowDeleteModal(false);
        dispatch(deleteProject(projectId));
    }

    return (
        <Modal onClose={() => setShowDeleteModal(false)}>
            <div className="delete-project-modal flex-column">
                <h1 className="modal-title flex-row">
                    <i className="fa-solid fa-triangle-exclamation" /> Delete Project?
                </h1>
                <p>The project along with its issues will be permanently deleted.</p>
                <p>Are you sure you want to delete this project?</p>
                <div className="actions flex-row">
                    <div
                        className="button cancel cursor-pointer"
                        onClick={() => setShowDeleteModal(false)}
                    >Cancel</div>
                    <div
                        className="button delete cursor-pointer"
                        onClick={handleDeleteProject}
                    >Delete</div>
                </div>
            </div>
        </Modal>
    )
}
