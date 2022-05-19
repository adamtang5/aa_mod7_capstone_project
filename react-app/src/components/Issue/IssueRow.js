import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import UserCard from "../UserCard";

const IssueRow = ({ issue, idx }) => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <tr
            key={issue?.id}
            className={`data-row-${idx % 2 === 0 ? 'even' : 'odd'}`}
        >
            <td className="data-cell">
                <NavLink to={`/issues/${issue?.id}`}>
                    {(issue?.project_personal && Number(issue?.project_key.slice(1)) === sessionUser?.id)
                        ? 'SELF' : issue?.project_key}-{issue?.project_idx}
                </NavLink>
            </td>
            <td className="data-cell">
                <NavLink to={`/issues/${issue?.id}`}>{issue?.title}</NavLink>
            </td>
            <td className="data-cell">
                <UserCard user={issue?.submitter} isLink={false} />
            </td>
            <td className="data-cell">
                <UserCard user={issue?.assignee} isLink={false} />
            </td>
            <td className="data-cell">
                {/* <StatusCard status={issue?.current_status} /> */}
                Issue's current status
            </td>
            <td className="data-cell">
                {/* <DateCard date={issue?.created_at} /> */}
                Issue's created at date
            </td>
        </tr>
    )
};

export default IssueRow;
