import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchIssuesAssignedTo, fetchIssuesByProject, fetchIssuesSubmittedBy } from "../../store/issue";
import IssuesList from "./IssuesList";

const FilteredIssuesList = ({ mode }) => {
    // console.log("In Filtered Issues List. Mode: ", mode);

    const dispatch = useDispatch();
    const { projectId } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    switch (mode) {
        case "project": {
            dispatch(fetchIssuesByProject(+projectId));
            return <IssuesList pageTitle={"All open"} mode={mode} />
        }
        case "submitter": {
            dispatch(fetchIssuesSubmittedBy(sessionUser?.id));
            return <IssuesList pageTitle={"All submitted by me"} mode={mode} />
        }
        case "assignee": {
            dispatch(fetchIssuesAssignedTo(sessionUser?.id));
            return <IssuesList pageTitle={"All assigned to me"} mode={mode} />
        }
        default:
            return null;
    }
};

export default FilteredIssuesList;
