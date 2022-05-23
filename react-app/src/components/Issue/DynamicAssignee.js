import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../UserCard";
import { editIssue } from "../../store/issue";

const DynamicAssignee = ({ issue }) => {
    const dispatch = useDispatch();
    const stateUsers = useSelector(state => state.users);
    const allUsers = useSelector(state => Object.values(state.users));

    // slices of state for dropdowns
    const [assigneeId, setAssigneeId] = useState(issue?.assignee_id || 0);
    const [showAssignees, setShowAssignees] = useState(false);
    const [assigneeSearchInput, setAssigneeSearchInput] = useState('');
    const [showSelectAssignee, setShowSelectAssignee] = useState(false);

    useEffect(() => {
        if (assigneeSearchInput.length) {
            setShowAssignees(true);
        } else {
            setShowAssignees(false);
        }
    }, [assigneeSearchInput]);

    useEffect(() => {
        if (!showAssignees) return;

        const closeAssignees = () => {
            setShowAssignees(false);
        }

        document.addEventListener('click', closeAssignees);

        return () => document.removeEventListener('click', closeAssignees);
    }, [showAssignees]);

    const changeAssignee = async (e) => {
        const idFromEle = parseInt(e.currentTarget.id.split('search-results-li-')[1], 10);
        setAssigneeId(idFromEle);
        setAssigneeSearchInput('');

        const newIssue = {
            id: issue.id,
            title: issue.title,     // data required
            assignee_id: idFromEle,
        }

        const data = await dispatch(editIssue(newIssue));

        if (!(data && Array.isArray(data))) {
            setShowSelectAssignee(false);
        }
    };

    return (
        <>
            <div
                className="issue-details-label cursor-pointer no-select"
                title="Click to change assignee"
                onClick={e => setShowSelectAssignee(!showSelectAssignee)}
            >Assignee</div>
            <div
                className={`issue-details-field${showSelectAssignee ? ' hidden' : ''}`}
            >
                <UserCard user={issue?.assignee} isLink={false} />
            </div>
            <div
                className={`dynamic-details-field${showSelectAssignee ? '' : ' hidden'}`}
            >
                <div
                    id="dynamic-assignee-form"
                >
                    <div className="assignee-search flex-column">
                        <input
                            type='text'
                            className="search-box"
                            onChange={e => setAssigneeSearchInput(e.target.value)}
                            value={assigneeSearchInput}
                            placeholder="Search by name"
                        />
                        {showAssignees && (
                            <div className="search-results flex-column">
                                {allUsers
                                    ?.filter(user => user
                                        .display_name
                                        .toLowerCase()
                                        .includes(assigneeSearchInput.toLowerCase())
                                    )
                                    .map(user => (
                                        <div
                                            key={user.id}
                                            id={`search-results-li-${user.id}`}
                                            className="flex-row cursor-pointer search-results-row"
                                            onClick={changeAssignee}
                                        >
                                            <UserCard user={user} isLink={false} />
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                        <div className="issue-details-field hidden">
                            <UserCard user={stateUsers[assigneeId]} isLink={false} />
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
};

export default DynamicAssignee;
