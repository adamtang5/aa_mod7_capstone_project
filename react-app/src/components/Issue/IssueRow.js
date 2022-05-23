import { NavLink } from "react-router-dom";
import Moment from 'react-moment';
import IssueKey from './IssueKey';
import UserCard from "../UserCard";
import StatusCard from "./StatusCard";
import { useSelector } from "react-redux";

const IssueRow = ({ issue, idx }) => {
    const stateStatuses = useSelector(state => state.statuses);

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
                {issue?.assignee_id ? (
                    <UserCard user={issue?.assignee} isLink={false} />
                ) : null}
            </td>
            <td className="data-cell status-card flex-row">
                <StatusCard status={stateStatuses[issue?.current_status?.status_id]} />
            </td>
            <td className="data-cell">
                <Moment fromNow>{issue?.created_at}</Moment>
            </td>
        </tr>
    )
};

export default IssueRow;
