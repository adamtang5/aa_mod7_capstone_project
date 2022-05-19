import Dropdown from 'react-dropdown';
import { useSelector } from 'react-redux';
import './StatusCard.css';


const StatusCard = ({ statusId }) => {
    const stateStatuses = useSelector(state => state.statuses);

    let statusOptions = [];
    statusOptions.push({
        value: statusId,
        label: stateStatuses[statusId]?.status,
    });

    stateStatuses[statusId]?.next?.forEach(status => {
        statusOptions.push({
            value: status.id,
            label: status.status,
        });
    });

    return (
        <Dropdown options={statusOptions} value={statusOptions[0]} />
    )
};

export default StatusCard;
