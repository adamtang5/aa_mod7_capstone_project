import CreateCommentForm from './CreateCommentForm';
import DynamicComment from './DynamicComment';
import './Comment.css';

const CommentsList = ({ issue, setCommentId, setShowDeleteModal }) => {
    return (
        <div className="comments">
            <div className="comments-list">
                {issue?.comments?.map(comment => (
                    <DynamicComment
                        key={comment?.id}
                        comment={comment}
                        setCommentId={setCommentId}
                        setShowDeleteModal={setShowDeleteModal}
                    />
                ))}
            </div>
            <div className="new-comment-form">
                <CreateCommentForm issue={issue} />
            </div>
        </div>
    )
};

export default CommentsList;
