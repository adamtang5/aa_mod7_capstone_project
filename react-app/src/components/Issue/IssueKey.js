import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const IssueKey = ({ issue }) => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <NavLink to={`/issues/${issue?.id}`}>
            <div className="issue-key-text">
                {(issue?.project_personal && Number(issue?.project_key.slice(1)) === sessionUser?.id)
                    ? 'SELF' : issue?.project_key}-{issue?.project_idx}
            </div>
        </NavLink>
    )
};

export default IssueKey;
