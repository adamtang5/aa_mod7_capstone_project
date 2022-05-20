import { useDispatch, useSelector } from "react-redux";
import { createStatusChange } from "../../store/statusChange";
import Select from 'react-select';

const DynamicStatus = ({ issue }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const stateStatuses = useSelector(state => state.statuses);

    // Options for Select component
    const currentStatusId = issue?.current_status?.status_id;
    const currentStatusOptions = {
        value: currentStatusId,
        label: stateStatuses[currentStatusId]?.status,
    };

    let statusOptions = [];
    stateStatuses[currentStatusId]?.next?.forEach(status => {
        statusOptions.push({
            value: status.id,
            label: status.status,
        });
    });

    const handleStatusChange = async (value) => {
        // console.log(value.value);

        const newStatusChange = {
            user_id: sessionUser.id,
            issue_id: issue.id,
            status_id: value.value,
        };

        const data = await dispatch(createStatusChange(newStatusChange));

        if (!(data && Array.isArray(data))) {
            console.log(data);
        }
    };

    return (
        <Select
            options={statusOptions}
            name='status-id'
            id='status-id-input'
            onChange={handleStatusChange}
            defaultValue={currentStatusOptions}
        />
    )
};

export default DynamicStatus;
