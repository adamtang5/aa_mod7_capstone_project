import CreateCommentForm from './CreateCommentForm';
import DynamicComment from './DynamicComment';
import './Comment.css';

const CommentsList = ({ issue }) => {
    return (
        <div className="comments">
            <div className="comments-list">
                {issue?.comments?.map(comment => (
                    <DynamicComment comment={comment} />
                ))}
            </div>
            <div className="new-comment-form">
                <CreateCommentForm issue={issue} />
            </div>
        </div>
    )
};

export default CommentsList;
