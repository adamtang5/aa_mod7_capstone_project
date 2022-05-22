import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deleteComment } from "../../store/comment";
import './DeleteCommentModal.css';

export default function DeleteCommentModal({ commentId, setShowDeleteModal }) {
    const dispatch = useDispatch();

    const handleDeleteComment = e => {
        setShowDeleteModal(false);
        dispatch(deleteComment(commentId));
    }

    return (
        <Modal onClose={() => setShowDeleteModal(false)}>
            <div className="delete-comment-modal flex-column">
                <h1 className="modal-title flex-row">
                    <i className="fa-solid fa-triangle-exclamation" /> Delete this comment?
                </h1>
                <p>Once you delete, it's gone for good.</p>
                <div className="actions flex-row">
                    <div
                        className="button cancel cursor-pointer"
                        onClick={() => setShowDeleteModal(false)}
                    >Cancel</div>
                    <div
                        className="button delete cursor-pointer"
                        onClick={handleDeleteComment}
                    >Delete</div>
                </div>
            </div>
        </Modal>
    )
}
