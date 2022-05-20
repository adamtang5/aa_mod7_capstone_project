import { NavLink } from "react-router-dom";
import Moment from 'react-moment';
import IssueKey from './IssueKey';
import UserCard from "../UserCard";

const IssueRow = ({ issue, idx }) => {
    return (
        <tr
            key={issue?.id}
            className={`data-row-${idx % 2 === 0 ? 'even' : 'odd'}`}
        >
            <td className="data-cell">
                <IssueKey issue={issue} />
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
                {/* <StatusCard statusId={issue?.current_status} /> */}
                Issue's current status
            </td>
            <td className="data-cell">
                <Moment fromNow>{issue?.created_at}</Moment>
            </td>
        </tr>
    )
};

export default IssueRow;
