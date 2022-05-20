import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';

const DynamicStatus = ({ issue }) => {
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

    const handleStatusChange = (value) => {
        console.log(value.value);
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
